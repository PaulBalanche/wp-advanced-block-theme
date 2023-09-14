import { getBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';

export function Node({ id, label, keys, value, componentInstance }) {
    return (
        <Button
            variant="primary"
            onMouseDown={() => {
                componentInstance.props.selectBlock(value.clientId);
            }}
        >
            {getBlockType(value.name).title}
        </Button>
    );
}
