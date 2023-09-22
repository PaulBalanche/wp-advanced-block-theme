import { Component, Fragment } from '@wordpress/element';

import {
    CompositeDecorator,
    ContentState,
    DefaultDraftBlockRenderMap,
    Editor,
    EditorState,
    Modifier,
    RichUtils,
    SelectionState,
    convertFromHTML,
    convertFromRaw,
    convertToRaw,
    getDefaultKeyBinding,
} from 'draft-js';

import { Map } from 'Immutable';

import { DropDown } from './DropDown';
import { LinkControl } from './LinkControl';

export class DraftEditor extends Component {
    constructor(props) {
        super(props);

        this.rawDraftContentState = props?.initialContent
            ? props.initialContent
            : null;

        if (this.rawDraftContentState != null) {
            if (typeof this.rawDraftContentState == 'string') {
                const blocksFromHTML = convertFromHTML(
                    this.rawDraftContentState,
                );
                const state = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap,
                );

                this.state = {
                    editorState: EditorState.createWithContent(state),
                };
            } else {
                this.state = {
                    editorState: EditorState.createWithContent(
                        convertFromRaw(this.rawDraftContentState),
                        new CompositeDecorator([
                            {
                                strategy: this.findLinkEntities,
                                component: this.Link,
                            },
                        ]),
                    ),
                };
            }
        } else {
            this.state = {
                editorState: EditorState.createEmpty(
                    new CompositeDecorator([
                        {
                            strategy: this.findLinkEntities,
                            component: this.Link,
                        },
                    ]),
                ),
            };
        }

        this.onChange = (editorState) => this.handleChange(editorState);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
        this.toggleColorStyle = this._toggleColorStyle.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);

        this.defaultBlockLabel = 'Default';
        this.defineBlocks();
        this.defineInlineStyles();

        this.confirmLink = this._confirmLink.bind(this);
        this.removeLink = this._removeLink.bind(this);
    }

    Link = (props) => {
        const { url } = props.contentState.getEntity(props.entityKey).getData();

        return (
            <a href={url} style={this.props.tools.a.style}>
                {props.children}
            </a>
        );
    };

    _confirmLink(value) {
        if (value && typeof value == 'object') {
            if (value.url != '') {
                const { editorState } = this.state;

                const selection = editorState.getSelection();
                const anchorKey = selection.getAnchorKey();

                const contentState = editorState.getCurrentContent();
                const blockWithLink = contentState.getBlockForKey(anchorKey);
                const linkKey = blockWithLink.getEntityAt(
                    selection.getStartOffset(),
                );

                const contentStateWithEntity = linkKey
                    ? contentState.replaceEntityData(linkKey, value)
                    : contentState.createEntity('LINK', 'MUTABLE', value);

                const entityKey =
                    contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editorState, {
                    currentContent: contentStateWithEntity,
                });

                this.onChange(
                    RichUtils.toggleLink(newEditorState, selection, entityKey),
                );
            } else {
                this._removeLink();
            }
        }
    }

    _removeLink() {
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        const anchorKey = selection.getAnchorKey();

        var contentState = editorState.getCurrentContent();
        const blockWithLink = contentState.getBlockForKey(anchorKey);

        const linkKey = blockWithLink.getEntityAt(selection.getStartOffset());

        blockWithLink.findEntityRanges(
            (element) => {
                const charEntity = element.getEntity();
                if (!charEntity) return false;
                return charEntity === linkKey;
            },
            (start, end) => {
                const entitySelection = new SelectionState({
                    anchorKey: blockWithLink.getKey(),
                    focusKey: blockWithLink.getKey(),
                    anchorOffset: start,
                    focusOffset: end,
                });

                contentState = Modifier.applyEntity(
                    contentState,
                    entitySelection,
                    null,
                );
                return;
            },
        );

        const newEditorState = EditorState.set(editorState, {
            currentContent: contentState,
        });

        this.onChange(RichUtils.toggleLink(newEditorState, selection, null));
    }

    findLinkEntities(contentBlock, callback, contentState) {
        contentBlock.findEntityRanges((character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        }, callback);
    }

    defineBlocks() {
        this.blockTypes = { default: [] };
        this.blockRenderMap = {};
        for (const [key, val] of Object.entries(this.props.typo)) {
            if (!val.isBlock) {
                continue;
            }

            let style = [];
            if (val?.editor && typeof val.editor == 'object') {
                for (const [keyCss, valCss] of Object.entries(val.editor)) {
                    style[keyCss] = valCss;
                }
            }

            if (val.isDefault) {
                this.blockTypes['default'].push({
                    label: val.label,
                    style: key,
                });
                this.defaultBlockLabel = val.label;

                this.blockRenderMap.unstyled = {
                    element: 'div',
                    wrapper: (
                        <WrapperBlockRendering
                            id={this.props.id + '-WrapperBlockRendering-' + key}
                            key={
                                this.props.id + '-WrapperBlockRendering-' + key
                            }
                            style={style}
                        />
                    ),
                };
            } else {
                let groupToAdd = val.group == 'null' ? 'default' : val.group;
                if (typeof this.blockTypes[groupToAdd] != 'object') {
                    this.blockTypes[groupToAdd] = [];
                }

                this.blockTypes[groupToAdd].push({
                    label: val.label,
                    style: key,
                });

                this.blockRenderMap[key] = {
                    wrapper: (
                        <WrapperBlockRendering
                            id={this.props.id + '-WrapperBlockRendering-' + key}
                            key={
                                this.props.id + '-WrapperBlockRendering-' + key
                            }
                            style={style}
                        />
                    ),
                };
            }
        }

        this.blockRenderMap = Map(this.blockRenderMap);
        this.blockRenderMap = DefaultDraftBlockRenderMap.merge(
            this.blockRenderMap,
        );
    }

    defineInlineStyles() {
        this.inlineStyles = {};
        this.colorOptions = [];
        this.styleMap = {};
        for (const [key, val] of Object.entries(this.props.typo)) {
            if (val.isBlock) {
                continue;
            }

            let inlineCss = [];
            if (val?.editor && typeof val.editor == 'object') {
                for (const [keyCss, valCss] of Object.entries(val.editor)) {
                    inlineCss[keyCss] = valCss;
                }
                this.styleMap[key] = inlineCss;
            }

            if (val.type != 'color') {
                let groupToAdd = val.group == 'null' ? 'default' : val.group;
                if (typeof this.inlineStyles[groupToAdd] != 'object') {
                    this.inlineStyles[groupToAdd] = [];
                }

                this.inlineStyles[groupToAdd].push({
                    label: val.label,
                    style: key,
                    buttonStyle: inlineCss,
                });
            } else {
                this.colorOptions.push({
                    label: val.label,
                    style: key,
                    buttonStyle: inlineCss,
                });
            }
        }
    }

    handleSoftNewLine(e) {
        return e.keyCode === 13 && e.shiftKey
            ? 'soft-new-line'
            : getDefaultKeyBinding(e);
    }

    handleChange(editorState) {
        this.setState({ editorState });

        let currentContentState = editorState.getCurrentContent();
        this.rawDraftContentState = convertToRaw(currentContentState);

        this.props.onChange(this.rawDraftContentState);
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(this.state.editorState, blockType),
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle),
        );
    }

    _toggleColorStyle(inlineStyle) {
        let curentEditorState = this.state.editorState;
        const currentInlineStyle = curentEditorState.getCurrentInlineStyle();

        for (const [key, val] of Object.entries(this.props.typo)) {
            if (val.isBlock || val.type != 'color' || key == inlineStyle) {
                continue;
            }

            if (currentInlineStyle.has(key)) {
                curentEditorState = RichUtils.toggleInlineStyle(
                    curentEditorState,
                    key,
                );
            }
        }

        const newEditorState = RichUtils.toggleInlineStyle(
            curentEditorState,
            inlineStyle,
        );

        this.onChange(newEditorState);
    }

    handleKeyCommand(command, editorState) {
        if (command === 'soft-new-line') {
            this.handleChange(RichUtils.insertSoftNewline(editorState));
            return 'handled';
        }

        return 'not-handled';
    }

    render() {
        const BlockStyleControls = (props) => {
            const selection = props.editorState.getSelection();
            const blockType = props.editorState
                .getCurrentContent()
                .getBlockForKey(selection.getStartKey())
                .getType();

            let currentBlockStyle = this.defaultBlockLabel;
            let dropDownItems = [];
            for (const [key, val] of Object.entries(this.blockTypes)) {
                let children = [];
                val.forEach((type) => {
                    currentBlockStyle =
                        blockType == type.style
                            ? type.label
                            : currentBlockStyle;
                    children.push({
                        label: type.label,
                        style: type.style,
                        buttonStyle: null,
                    });
                });

                dropDownItems.push({
                    label: key,
                    style: key,
                    children: children,
                });
            }

            return (
                <DropDown
                    key={this.props.id + '-DropDown-BlockStyle'}
                    id={this.props.id + '-DropDown-BlockStyle'}
                    label="Block style"
                    headerTitle={currentBlockStyle}
                    items={dropDownItems}
                    onToggle={this.toggleBlockType}
                />
            );
        };

        const InlineStyleControls = (props) => {
            const currentStyle = props.editorState.getCurrentInlineStyle();

            let groupControls = [];
            for (const [key, val] of Object.entries(this.inlineStyles)) {
                groupControls.push(
                    <div
                        key={this.props.id + '-inlineStylesContainer'}
                        className="border-style"
                    >
                        {val.map((type) => (
                            <StyleButton
                                key={
                                    this.props.id +
                                    '-StyleButton-inlineStyles-' +
                                    type.style
                                }
                                id={
                                    this.props.id +
                                    '-StyleButton-inlineStyles-' +
                                    type.style
                                }
                                active={currentStyle.has(type.style)}
                                label={type.label}
                                onToggle={props.onToggle}
                                style={type.style}
                                buttonStyle={type.buttonStyle}
                            />
                        ))}
                    </div>,
                );
            }

            return groupControls;
        };

        const ColorStyleControls = (props) => {
            const currentStyle = props.editorState.getCurrentInlineStyle();

            let currentColor = 'Choose color...';
            let dropDownItems = [];
            this.colorOptions.forEach(function (type) {
                currentColor = currentStyle.has(type.style)
                    ? type.label
                    : currentColor;
                dropDownItems.push({
                    label: type.label,
                    style: type.style,
                    buttonStyle: type.buttonStyle,
                });
            });

            return (
                <DropDown
                    key={this.props.id + '-DropDown-Color'}
                    id={this.props.id + '-DropDown-Color'}
                    label="Color"
                    headerTitle={currentColor}
                    items={dropDownItems}
                    onToggle={props.onToggle}
                />
            );
        };

        return (
            <Fragment key={this.props.id + '-draftEditor'}>
                <div className="DraftEditor-Container">
                    <div
                        key="DraftEditor-controls-row-line1"
                        className="DraftEditor-controls-row"
                    >
                        <div className="DraftEditor-controls-row-inner">
                            <BlockStyleControls
                                editorState={this.state.editorState}
                                onToggle={this.toggleBlockType}
                            />
                            <ColorStyleControls
                                editorState={this.state.editorState}
                                onToggle={this.toggleColorStyle}
                            />
                            <div className="toolbox">
                                <div className="title">Tools :</div>
                                <LinkControl
                                    editorState={this.state.editorState}
                                    onSubmit={this.confirmLink}
                                    onRemove={this.removeLink}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        key={'DraftEditor-controls-row-line2'}
                        className="DraftEditor-controls-row"
                    >
                        <div className="DraftEditor-controls-row-inner">
                            <InlineStyleControls
                                editorState={this.state.editorState}
                                onToggle={this.toggleInlineStyle}
                            />
                        </div>
                    </div>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        blockRenderMap={this.blockRenderMap}
                        customStyleMap={this.styleMap}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.handleSoftNewLine}
                        onBlur={this.props.onBlur}
                    />
                </div>
            </Fragment>
        );
    }
}

class StyleButton extends Component {
    constructor() {
        super(...arguments);

        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'DraftEditor-styleButton';
        if (this.props.active) {
            className += ' DraftEditor-activeButton';
        }

        return (
            <span
                key={this.props.id}
                className={className}
                onMouseDown={this.onToggle}
                style={this.props.buttonStyle}
            >
                {this.props.label}
            </span>
        );
    }
}

class WrapperBlockRendering extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        return (
            <div key={this.props.id} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}
