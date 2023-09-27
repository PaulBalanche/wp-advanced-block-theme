import { Component } from '@wordpress/element';

import { Attributes } from '../../Static/Attributes';
import { Render } from '../../Static/Render';
import { DraftEditor } from './DraftEditor';

class WysiwygControl extends Component {
    constructor(props) {
        super(props);

        this.onChange = (newContent) => this.handleChange(newContent);
    }

    handleChange(newContent) {
        Attributes.updateAttributes(
            this.props.keys,
            this.props.valueProp,
            newContent,
            false,
            this.props.componentInstance,
        );
    }

    getTypo() {
        let typo = {};
        if (
            this.props?.componentInstance?.props?.theme_spec?.editor?.typo &&
            typeof this.props.componentInstance.props.theme_spec.editor.typo ==
                'object'
        ) {
            for (const [key, val] of Object.entries(
                this.props.componentInstance.props.theme_spec.editor.typo,
            )) {
                if (key == 'a') {
                    continue;
                }

                let isBlock = false;

                let editorCss = null;
                if (val?.style && typeof val.style == 'object') {
                    editorCss = {};
                    for (const [keyCss, valCss] of Object.entries(val.style)) {
                        if (keyCss != 'display') {
                            editorCss[keyCss] = valCss;
                        } else if (valCss == 'block') {
                            isBlock = true;
                        }
                    }
                }

                if (val?.editorStyle && typeof val.editorStyle == 'object') {
                    for (const [keyCss, valCss] of Object.entries(
                        val.editorStyle,
                    )) {
                        if (keyCss != 'display') {
                            editorCss[keyCss] = valCss;
                        } else if (valCss == 'block') {
                            isBlock = true;
                        }
                    }
                }

                typo[key] = {
                    label: val.label,
                    isBlock: isBlock,
                    editor: editorCss,
                    group: val?.group ? val.group : null,
                    type: val?.type ? val.type : null,
                    isDefault: val?.default && !!val.default ? true : false,
                };
            }
        }

        return typo;
    }

    getTools() {
        let tools = {
            a: {
                style: {
                    textDecoration: 'underline',
                },
            },
        };

        if (
            this.props?.componentInstance?.props?.theme_spec?.editor?.typo &&
            typeof this.props.componentInstance.props.theme_spec.editor.typo ==
                'object'
        ) {
            for (const [key, val] of Object.entries(
                this.props.componentInstance.props.theme_spec.editor.typo,
            )) {
                let editorCss = null;

                if (key == 'a') {
                    if (val?.style && typeof val.style == 'object') {
                        editorCss = {};
                        for (const [keyCss, valCss] of Object.entries(
                            val.style,
                        )) {
                            if (keyCss != 'display') {
                                editorCss[keyCss] = valCss;
                            }
                        }
                    }

                    if (
                        val?.editorStyle &&
                        typeof val.editorStyle == 'object'
                    ) {
                        for (const [keyCss, valCss] of Object.entries(
                            val.editorStyle,
                        )) {
                            if (keyCss != 'display') {
                                editorCss[keyCss] = valCss;
                            }
                        }
                    }

                    tools.a = {
                        style: editorCss,
                    };
                }
            }
        }

        return tools;
    }

    render() {
        var {
            id,
            label,
            keys,
            valueProp,
            objectValue,
            repeatable = false,
        } = this.props;

        if (repeatable) {
            label = (
                <>
                    {label}
                    {Render.buttonRemoveRepeatableElt(id, () => {
                        Attributes.removeEltRepeatable(
                            keys,
                            valueProp,
                            this.props.componentInstance,
                        );
                    })}
                </>
            );
        }

        return (
            <div
                key={id + '-WysiwygComponentsBaseControl'}
                className="components-base-control"
            >
                <div
                    key={id + '-WysiwygComponentsBaseControlField'}
                    className="components-base-control__field"
                >
                    <div
                        key={id + '-WysiwygContainer'}
                        className="wysiwyg-container"
                    >
                        {Render.label(id, label)}
                        <DraftEditor
                            id={id}
                            initialContent={objectValue}
                            onChange={this.onChange}
                            typo={this.getTypo()}
                            tools={this.getTools()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default WysiwygControl;
