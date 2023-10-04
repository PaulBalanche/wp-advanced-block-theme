import { Button, Dashicon } from '@wordpress/components';
import { BlockList } from './BlockList';
import { OButtonBlockAppender } from './OButtonBlockAppender';
import __OEditorApp from './OEditorApp';
import { OEditorAppHeader } from './OEditorAppHeader';

export function OEditorInspector({
    isOpen,
    breadcrumb,
    blocksList,
    selectBlock,
}) {
    function renderTitle() {
        return (
            <li className="breadcrumb-current">
                <h2>
                    <Dashicon icon="screenoptions" /> All blocks
                </h2>
            </li>
        );
    }

    function renderFooter() {
        return <OButtonBlockAppender buttonDashicon="insert" />;
    }

    function renderTools() {
        return null;
        // return (
        //     <li className="breadcrumb-tools">
        //         <Button
        //             key={'o-editor-zone-button-help'}
        //             variant="primary"
        //             onMouseDown={() =>
        //                 __OEditorApp.getInstance().routeTo('help')
        //             }
        //         >
        //             <Dashicon icon="editor-help" />
        //         </Button>
        //     </li>
        // );
    }

    function render() {
        const inner =
            blocksList &&
            typeof blocksList == 'object' &&
            blocksList.length > 0 ? (
                <BlockList blocksList={blocksList} selectBlock={selectBlock} />
            ) : (
                <p>Empty page...</p>
            );
        return (
            <>
                {inner}
                {/* <ButtonGroup className="inspectorButtonInsertNew">
                    <OButtonBlockAppender buttonDashicon="insert" />
                    <OButtonPatternAppender />
                </ButtonGroup> */}
            </>
        );
    }

    function getExtraClassName() {
        return 'inspector';
    }

    return (
        <section
            key="o-editor-app"
            className={`o-editor-app ${getExtraClassName?.()}`}
        >
            <OEditorAppHeader isOpen={isOpen}>
                <nav>
                    <ol>
                        {breadcrumb}
                        {renderTitle()}
                    </ol>
                </nav>
            </OEditorAppHeader>
            <div className="o-editor-app_body">{render()}</div>
            <div className="o-editor-app_footer">{renderFooter()}</div>
        </section>
    );
}
