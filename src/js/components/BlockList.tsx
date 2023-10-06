import { getBlockType } from '@wordpress/blocks';
import { Button, ButtonGroup, Dashicon } from '@wordpress/components';
import { Fragment, useContext, useState } from '@wordpress/element';
import { SlideDown } from 'react-slidedown';
import '../../../node_modules/react-slidedown/lib/slidedown.css';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';

export function BlockList(props) {
    const children = [];
    props.blocksList.forEach((block) => {
        if (
            typeof block.attributes._node == 'undefined' ||
            typeof props.isChildren == 'undefined'
        ) {
            children.push(
                <Fragment key={'o-inspector-blockContainer-' + block.clientId}>
                    <BlockListItem
                        block={block}
                        selectBlock={props.selectBlock}
                    />
                    <li className="separator"></li>
                </Fragment>,
            );
        }
    });

    return children.length > 0 ? (
        typeof props.isChildren != 'undefined' && props.isChildren ? (
            <SlideDown className={'ul-slidedown'}>
                {props.isOpen ? (
                    <ul className="block-list">
                        <div className="separator"></div>
                        {children}
                    </ul>
                ) : null}
            </SlideDown>
        ) : (
            <ul className="block-list">{children}</ul>
        )
    ) : null;
}

function BlockListItem({ block, selectBlock }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const { blocksErrorNotices } = useContext(OBlockEditorContext);

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
    let closestParent: ParentNode = domBlock;
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
        typeof blocksErrorNotices[block.clientId] == 'object' &&
        typeof blocksErrorNotices[block.clientId].message == 'object'
    ) {
        let errorsBlock = 0;
        for (const i in blocksErrorNotices[block.clientId].message) {
            if (
                typeof blocksErrorNotices[block.clientId].message[i].error !=
                'undefined'
            ) {
                errorsBlock++;
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
    }

    let displayInnerBlocks = false;
    if (block.innerBlocks.length > 0) {
        block.innerBlocks.forEach((block) => {
            if (typeof block.attributes._node == 'undefined') {
                displayInnerBlocks = true;
                return;
            }
        });
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
                {((block.innerBlocks.length > 0 && displayInnerBlocks) ||
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
}
