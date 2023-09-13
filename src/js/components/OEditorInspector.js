import { getBlockType } from '@wordpress/blocks';
import { Button, ButtonGroup, Dashicon } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

import __OEditorApp from './OEditorApp';

import globalData from '../global';

import { OButtonBlockAppender } from './OButtonBlockAppender';
import { OButtonPatternAppender } from './OButtonPatternAppender';

import { SlideDown } from 'react-slidedown';
import '../../../node_modules/react-slidedown/lib/slidedown.css';

export default class OEditorInspector {
    constructor(blocksList, selectBlock) {
        this.blocksList = blocksList;
        this.selectBlock = selectBlock;
    }

    renderTitle() {
        return <h2>Inspector</h2>;
    }

    renderTools() {
        return (
            <Button
                key={'o-editor-zone-button-help'}
                variant="primary"
                onMouseDown={() => __OEditorApp.getInstance().routeTo('help')}
            >
                <Dashicon icon="editor-help" />
            </Button>
        );
    }

    render() {
        const inner =
            this.blocksList &&
            typeof this.blocksList == 'object' &&
            this.blocksList.length > 0 ? (
                <BlockList
                    blocksList={this.blocksList}
                    selectBlock={this.selectBlock}
                />
            ) : (
                <p>Empty page...</p>
            );
        return (
            <>
                {inner}
                <ButtonGroup className="inspectorButtonInsertNew">
                    <OButtonBlockAppender />
                    <OButtonPatternAppender />
                </ButtonGroup>
            </>
        );
    }

    getExtraClassName() {
        return 'inspector';
    }
}

const BlockList = (props) => {
    const children = (
        <ul>
            {typeof props.isChildren != 'undefined' && props.isChildren && (
                <div className="separator"></div>
            )}
            {props.blocksList.map(
                (block) =>
                    typeof block.attributes._node == 'undefined' && (
                        <Fragment
                            key={'o-inspector-blockContainer-' + block.clientId}
                        >
                            <BlockListItem
                                block={block}
                                selectBlock={props.selectBlock}
                            />
                            <li className="separator"></li>
                        </Fragment>
                    ),
            )}
        </ul>
    );

    return typeof props.isChildren != 'undefined' && props.isChildren ? (
        <SlideDown className={'ul-slidedown'}>
            {props.isOpen ? children : null}
        </SlideDown>
    ) : (
        children
    );
};

const BlockListItem = ({ block, selectBlock }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const anchor = block.attributes?.anchor;
    const displayAnchor =
        typeof anchor != 'undefined' &&
        anchor.match(/^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/) ==
            null;
    const domBlock = document.querySelector('#block-' + block.clientId);
    if (domBlock) {
        domBlock.addEventListener('mouseover', () => {
            setIsHover(true);
        });
        domBlock.addEventListener('mouseleave', () => {
            setIsHover(false);
        });
    }

    const parentDomBlocks = [];
    var closestParent = domBlock;
    if (closestParent != null) {
        while (true) {
            closestParent = closestParent.parentNode;
            if (closestParent.classList.contains('is-root-container')) {
                break;
            }
            if (
                closestParent.classList.contains(
                    'block-editor-block-list__block',
                )
            ) {
                parentDomBlocks.push(closestParent);
            }
        }
    }

    let blockName =
        block.name == 'core/block' && typeof block.postName != 'undefined'
            ? block.postName + ' (' + getBlockType(block.name).title + ')'
            : getBlockType(block.name).title;

    if (
        typeof globalData.componentInstances == 'object' &&
        typeof globalData.componentInstances[block.clientId] != 'undefined' &&
        typeof globalData.componentInstances[block.clientId].state.error ==
            'object' &&
        globalData.componentInstances[block.clientId].state.error != null &&
        Object.keys(globalData.componentInstances[block.clientId].state.error)
            .length > 0
    ) {
        let errorsBlock = 0;
        let warningsBlock = 0;
        for (var i in globalData.componentInstances[block.clientId].state
            .error) {
            if (
                typeof globalData.componentInstances[block.clientId].state
                    .error[i].error != 'undefined'
            ) {
                errorsBlock++;
            }
            if (
                typeof globalData.componentInstances[block.clientId].state
                    .error[i].warning != 'undefined'
            ) {
                warningsBlock++;
            }
        }
        if (errorsBlock > 0) {
            blockName = (
                <>
                    {blockName}
                    <span className="error-attributes">{errorsBlock}</span>
                </>
            );
        }
        // else if (warningsBlock > 0) {
        //     blockName = (
        //         <>
        //             {blockName}
        //             <span className="warning-attributes">{warningsBlock}</span>
        //         </>
        //     );
        // }
    }

    return (
        <li
            key={'o-inspector-block-' + block.clientId}
            className={isHover ? 'is-hover' : ''}
            onMouseOver={() => {
                setIsOpen(true);
            }}
            onMouseOut={() => {
                setIsOpen(false);
            }}
        >
            <ButtonGroup className="inspectorBlockListButtonGroup">
                {(block.innerBlocks.length > 0 ||
                    typeof block.children != 'undefined') && (
                    <>
                        {isOpen && <Dashicon icon="arrow-down-alt2" />}
                        {!isOpen && <Dashicon icon="arrow-right-alt2" />}
                    </>
                )}
                <Button
                    variant="tertiary"
                    onMouseOver={() => {
                        setTimeoutId(
                            window.setTimeout(() => {
                                domBlock?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center',
                                });
                                domBlock?.classList.add('is-pre-selected');
                                for (var i in parentDomBlocks) {
                                    parentDomBlocks[i].classList.add(
                                        'has-child-pre-selected',
                                    );
                                }
                            }, 400),
                        );
                    }}
                    onMouseOut={() => {
                        clearTimeout(timeoutId);
                        domBlock?.classList.remove('is-pre-selected');
                        for (var i in parentDomBlocks) {
                            parentDomBlocks[i].classList.remove(
                                'has-child-pre-selected',
                            );
                        }
                    }}
                    onMouseDown={() => {
                        selectBlock(block.clientId);
                    }}
                >
                    {blockName}
                    {displayAnchor && <span className="anchor">#{anchor}</span>}
                </Button>
            </ButtonGroup>
            {block.innerBlocks.length > 0 && (
                <BlockList
                    blocksList={block.innerBlocks}
                    selectBlock={selectBlock}
                    isChildren={true}
                    isOpen={isOpen}
                />
            )}
            {typeof block.children != 'undefined' && (
                <BlockList
                    blocksList={block.children}
                    selectBlock={selectBlock}
                    isChildren={true}
                    isOpen={isOpen}
                />
            )}
        </li>
    );
};
