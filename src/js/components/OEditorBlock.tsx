import { Button, Dashicon } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { getBlockType } from '@wordpress/blocks';
import __OEditorApp from './OEditorApp';
import { OEditorAppHeader } from './OEditorAppHeader';

export function OEditorBlock({ clientId, isOpen, breadcrumb }) {
    const { block, parentsBlock } = useSelect(
        (select) => {
            const block = select('core/block-editor').getBlock(clientId);
            const getBlockParents =
                select('core/block-editor').getBlockParents(clientId);
            const parentsBlock = [];
            for (let i in getBlockParents) {
                parentsBlock.push(
                    select('core/block-editor').getBlock(getBlockParents[i]),
                );
            }
            return { block: block, parentsBlock: parentsBlock };
        },
        [clientId],
    );

    const title =
        typeof block.name != 'undefined'
            ? getBlockType(block.name).title
            : 'Undefined...';

    function getNavParent() {
        const navParent = [];
        if (
            parentsBlock != null &&
            typeof parentsBlock == 'object' &&
            parentsBlock.length > 0
        ) {
            parentsBlock.forEach((element) => {
                navParent.push(element);
            });
        }

        return navParent;
    }

    function renderTitle() {
        const path = [];
        getNavParent().forEach((element) => {
            path.push(
                <li
                    key={'breadcrumb-parent-block-' + element.clientId}
                    className="breadcrumb-parent-block"
                >
                    <Button
                        key={'path-button-' + element.clientId}
                        className="path-element"
                        onMouseDown={() => selectBlock(element.clientId)}
                    >
                        <Dashicon icon="arrow-right-alt2" />
                        {getBlockType(element.name).title}
                    </Button>
                </li>,
            );
        });

        return (
            <>
                {path}
                <li className="breadcrumb-current">
                    <h2>{title ?? title ?? 'Editor'}</h2>
                </li>
            </>
        );
    }

    function renderTools() {
        // return this._blockInstance.renderTools?.();
    }

    function getOpenMarker() {
        return (
            <Button variant="primary">
                <Dashicon icon="edit" />
            </Button>
        );
    }

    function renderFooter() {
        return (
            <nav>
                <ol>
                    {/*{__OEditorApp.getInstance().renderFooterBreadcrumb()}*/}
                    {/*{this._blockInstance.renderFooter?.()}*/}
                </ol>
            </nav>
        );
    }

    function getExtraClassName() {
        var className = 'block';

        // if (this._blockInstance.isReusable()) {
        //     className += ' is-reusable';
        // }

        return className;
    }

    return (
        <>
            <OEditorAppHeader isOpen={isOpen} openMarker={getOpenMarker()}>
                <nav>
                    <ol>
                        {breadcrumb}
                        {renderTitle()}
                        {renderTools()}
                    </ol>
                </nav>
            </OEditorAppHeader>
            <div className="o-editor-app_body"></div>
            <div className="o-editor-app_footer">{renderFooter()}</div>
        </>
    );
}
