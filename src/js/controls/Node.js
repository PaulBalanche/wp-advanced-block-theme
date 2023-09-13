import { getBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { OButtonBlockAppender } from '../Components/OButtonBlockAppender';
import { Render } from '../Static/Render';

export function Node({ id, label, keys, componentInstance }) {
    const listNodes = [];
    componentInstance.props.blocksList.forEach((element) => {
        listNodes.push(
            <li key={'nodeList-' + element.clientId}>
                <Button
                    variant="secondary"
                    onMouseDown={() => {
                        componentInstance.props.selectBlock(element.clientId);
                    }}
                >
                    {getBlockType(element.name).title}
                </Button>
            </li>,
        );
    });

    return (
        <div
            key={id + '-NodeComponentsBaseControl'}
            className="components-base-control"
        >
            <div
                key={id + '-NodeComponentsBaseControlField'}
                className="components-base-control__field"
            >
                {Render.label(id, label)}
                <ul>{listNodes}</ul>
                <OButtonBlockAppender
                    rootClientId={componentInstance.props.clientId}
                    extraAttributes={{
                        _node: keys.join('|'),
                    }}
                />
            </div>
        </div>
    );
}
