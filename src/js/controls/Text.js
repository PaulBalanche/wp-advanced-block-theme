import { 
    TextControl
} from "@wordpress/components";
import { BaseControl } from "../components/BaseControl";

export class Text extends BaseControl {

    constructor() {
        super(...arguments);
    }

    render() {

        const valueToDisplay = ( this.state.editMode ) ? ( this.state.value != null ) ? this.state.value : '' : this.props.defaultValue.value;

        return <>
            <TextControl
                label={this.props.label}
                type={ !! this.props.isNumber ? "number" : "text" }
                value={valueToDisplay}
                onChange={(newValue) => {
                    this.setState({ value: newValue, needUpdate: true });
                }}
            />
            { this.renderSavedButton() }
            { this.renderDefaultValueOverlay() }
        </>
    }
}
