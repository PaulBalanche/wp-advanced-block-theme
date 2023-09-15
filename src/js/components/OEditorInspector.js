import { Button, ButtonGroup, Dashicon } from '@wordpress/components';

import __OEditorApp from './OEditorApp';

import { OButtonBlockAppender } from './OButtonBlockAppender';
import { OButtonPatternAppender } from './OButtonPatternAppender';

import { BlockList } from './BlockList';

export default class OEditorInspector {
    constructor(blocksList, selectBlock) {
        this.blocksList = blocksList;
        this.selectBlock = selectBlock;
    }

    renderTitle() {
        return (
            <li className="breadcrumb-current">
                <h2>
                    <Dashicon icon="screenoptions" /> All blocks
                </h2>
            </li>
        );
    }

    renderTools() {
        return null;
        return (
            <li className="breadcrumb-tools">
                <Button
                    key={'o-editor-zone-button-help'}
                    variant="primary"
                    onMouseDown={() =>
                        __OEditorApp.getInstance().routeTo('help')
                    }
                >
                    <Dashicon icon="editor-help" />
                </Button>
            </li>
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
