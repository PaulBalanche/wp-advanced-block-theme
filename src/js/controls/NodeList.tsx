import { ButtonGroup } from '@wordpress/components';
import { BlockList } from '../Components/BlockList';
import { OButtonBlockAppender } from '../Components/OButtonBlockAppender';
import { Render } from '../Static/Render';
import { useContext } from '@wordpress/element';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';

export function NodeList({ id, label, keys }) {
    const { clientId, selectBlock, blocksList } =
        useContext(OBlockEditorContext);

    return (
        <div
            key={id + '-NodeListComponentsBaseControl'}
            className="components-base-control"
        >
            <div
                key={id + '-NodeListComponentsBaseControlField'}
                className="components-base-control__field"
            >
                {Render.label(id, label)}
                <div className="nodeListComponentsContainer">
                    <BlockList
                        blocksList={blocksList}
                        selectBlock={selectBlock}
                    />
                    <ButtonGroup className="inspectorButtonInsertNew">
                        <OButtonBlockAppender
                            rootClientId={clientId}
                            extraAttributes={{
                                _node: keys.join('|'),
                            }}
                            buttonDashicon="insert"
                            label="Add block"
                        />
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
}
