/**
 * WordPress dependencies
 */
import { WpeComponentBase } from '../../../Components/WpeComponentBase';

/**
 * registerBlockType edit function
 *
 */
export class WpeSlide extends WpeComponentBase {
    constructor() {
        super(...arguments);
    }

    liveRendering() {
        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;
        innerBlocksProps.key = 'innerBlocksProps_' + this.props.clientId;

        return (
            <div {...innerBlocksProps}>
                {this.renderEditFormZone()}
                <div
                    key={this.props.clientId + '_slideContainer'}
                    className="o-slide-container"
                >
                    {children}
                </div>
            </div>
        );
    }
}
