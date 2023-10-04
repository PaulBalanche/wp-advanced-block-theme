import { Button, Dashicon } from '@wordpress/components';
import { getBlockType, isReusableBlock } from '@wordpress/blocks';
import { OEditorAppHeader } from './OEditorAppHeader';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';
import { useContext } from '@wordpress/element';
import { Fragment } from 'react';
import { BlockPropsEdition } from './BlockPropsEdition';
import { BlockTools } from './BlockTools';

export function OEditorBlock({ isOpen, breadcrumb, footerBreadcrumb }) {
    const { parentsBlock, selectBlock, blockTitle } =
        useContext(OBlockEditorContext);

    function renderTitle() {
        return (
            <>
                {parentsBlock.map((element) => {
                    return (
                        <li
                            key={'breadcrumb-parent-block-' + element.clientId}
                            className="breadcrumb-parent-block"
                        >
                            <Button
                                key={'path-button-' + element.clientId}
                                className="path-element"
                                onMouseDown={() =>
                                    selectBlock(element.clientId)
                                }
                            >
                                <Dashicon icon="arrow-right-alt2" />
                                {getBlockType(element.name).title}
                            </Button>
                        </li>
                    );
                })}
                {blockTitle && (
                    <li className="breadcrumb-current">
                        <h2>{blockTitle}</h2>
                    </li>
                )}
            </>
        );
    }

    function renderFooter() {
        return (
            <>
                {parentsBlock.map((element) => {
                    return (
                        <Fragment key={'footer-breadcrumb-' + element.clientId}>
                            <li className="separator">/</li>
                            <li className="breadcrumb-parent-block">
                                <Button
                                    key={
                                        'path-button-footer-' + element.clientId
                                    }
                                    variant="link"
                                    onMouseDown={() =>
                                        selectBlock(element.clientId)
                                    }
                                >
                                    {getBlockType(element.name).title}
                                </Button>
                            </li>
                        </Fragment>
                    );
                })}
                {blockTitle && (
                    <>
                        <li
                            key={
                                'footer-breadcrumb-parent-block-separator-current'
                            }
                            className="separator"
                        >
                            /
                        </li>
                        <li key={'footer-breadcrumb-parent-block-current'}>
                            {blockTitle}
                        </li>
                    </>
                )}
            </>
        );
    }

    return (
        <>
            <OEditorAppHeader isOpen={isOpen}>
                <nav>
                    <ol>
                        {breadcrumb}
                        {renderTitle()}
                        <BlockTools />
                    </ol>
                </nav>
            </OEditorAppHeader>
            <div className="o-editor-app_body">
                <BlockPropsEdition />
            </div>
            <div className="o-editor-app_footer">
                <nav>
                    <ol>
                        {footerBreadcrumb}
                        {renderFooter()}
                    </ol>
                </nav>
            </div>
        </>
    );
}
