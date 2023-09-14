import { OButtonBlockAppender } from '../Components/OButtonBlockAppender';
import { Sortable } from '../Static/Sortable';

export function NodeList({ id, label, keys, componentInstance }) {
    const buttonAdd = (
        <OButtonBlockAppender
            rootClientId={componentInstance.props.clientId}
            extraAttributes={{
                _node: keys.join('|'),
            }}
            buttonExtraClass="repeatableAddElt"
            buttonDashicon="insert"
            buttonVariant="secondary"
        />
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
