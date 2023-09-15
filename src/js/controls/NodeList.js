import { ButtonGroup } from '@wordpress/components';
import { BlockList } from '../Components/BlockList';
import { OButtonBlockAppender } from '../Components/OButtonBlockAppender';
import { Render } from '../Static/Render';
import { Sortable } from '../Static/Sortable';

export function NodeList({ id, label, keys, componentInstance }) {
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
                        blocksList={componentInstance.props.blocksList}
                        selectBlock={componentInstance.props.selectBlock}
                    />
                    <ButtonGroup className="inspectorButtonInsertNew">
                        <OButtonBlockAppender
                            rootClientId={componentInstance.props.clientId}
                            extraAttributes={{
                                _node: keys.join('|'),
                            }}
                            buttonDashicon="insert"
                        />
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );

    return (
        <Sortable
            key={id + '-Sortable'}
            id={id + '-Sortable'}
            type={'node'}
            componentInstance={componentInstance}
            blockKey={id}
            keys={keys}
            value={componentInstance.props.blocksList}
            error={null}
            onChange={(newValue, directSubmit) => console.log(newValue)}
            label={label}
            buttonAdd={buttonAdd}
        />
    );
}
