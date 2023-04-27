import { Component } from "@wordpress/element";
import { 
    Button,
    Dashicon
} from "@wordpress/components";
import { Attributes } from "../Static/Attributes";

export class BaseControl extends Component {

    constructor() {
        super(...arguments);

        this.state = {
            value: this.props.objectValue,
            editMode: ( this.props.objectValue != null || typeof this.props.defaultValue?.value == 'undefined' ),
            needUpdate: false
        };
    }

    submitChanges(){

        this.setState({ needUpdate: false });

        Attributes.updateAttributes(
            this.props.keys,
            this.props.valueProp,
            this.state.value,
            false,
            this.props.componentInstance
        );
        this.props.componentInstance.updatePreview();
    }

    renderSavedButton() {

        return ( this.state.editMode && this.state.needUpdate ) ?
            <div key={this.props.id + "submitChangesContainer"} className="submit-changes-container">
                <Button
                    key={this.props.id + "submitChangesContainer-button"}
                    onMouseDown={ () => this.submitChanges() }
                    variant="primary"
                >
                    <Dashicon icon="saved" /> Save changes
                </Button>
            </div>
        : null;
    }
    
    renderDefaultValueOverlay() {

        return ( ! this.state.editMode ) ?
            <div key={this.props.id + "defaultOverlayContainer"} className="default-overlay-container">
                <Button
                    key={this.props.id + "defaultOverlayContainer-button"}
                    onMouseDown={ () => { this.setState({ editMode: true }) } }
                    variant="primary"
                >
                    <Dashicon icon="edit" /> Override default value
                </Button>
            </div>
        : null;
    }

}