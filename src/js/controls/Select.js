import { 
    SelectControl
} from "@wordpress/components";
import { BaseControl } from "../components/BaseControl";

export class Select extends BaseControl {

    constructor() {
        super(...arguments);
    }

    render() {

        if (typeof this.props.options == "undefined" || this.props.options == null) return null;

        const defaultLabel = ( this.props.defaultValue?.value?.length ) ? "Default" : '--';
        const valueToDisplay = ( this.state.editMode ) ? ( this.state.value != null ) ? this.state.value : null : this.props.defaultValue.value;

        return <>
            <SelectControl
                label={this.props.label}
                value={valueToDisplay}
                options={[{ label: defaultLabel, value: "" }].concat(
                    this.props.options.map(function (value) {
                        return { label: value.name, value: value.value };
                    })
                )}
                onChange={(newValue) => {
                    this.setState({ value: newValue, needUpdate: true });
                }}
            />
            { this.renderSavedButton() }
            { this.renderDefaultValueOverlay() }
        </>
    }
}
