import { Component } from "@wordpress/element";
import { 
    Button,
    Dashicon
} from "@wordpress/components";
import { Attributes } from "../Static/Attributes";

export class StatedControl extends Component {

    constructor() {
        super(...arguments);

        this.state = {
            value: this.props.value,
            editMode: ( this.props.value != null || typeof this.props.defaultValue?.value == 'undefined' )
        };
    }

    submitChanges( newValue ){

        Attributes.updateAttributes(
            this.props.keys,
            this.props.valueProp,
            newValue,
            false,
            this.props.componentInstance
        );
        this.props.componentInstance.updatePreview();
    };

    render() {

        
        const needUpdate = ( this.state.value != this.props.value );

        return <>
            {this.props.children}
            { this.state.editMode && needUpdate &&
                <div key={this.props.id + "submitChangesContainer"} className="submit-changes-container">
                    <Button
                        key={this.props.id + "submitChangesContainer-button"}
                        onMouseDown={ () => this.submitChanges(this.state.value) }
                        variant="primary"
                    >
                        <Dashicon icon="saved" /> Save changes
                    </Button>
                </div>
            }
            { ! this.state.editMode &&
                <div key={this.props.id + "defaultOverlayContainer"} className="default-overlay-container">
                    <Button
                        key={this.props.id + "defaultOverlayContainer-button"}
                        onMouseDown={ () => { setEditMode(true) } }
                        variant="primary"
                    >
                        <Dashicon icon="edit" /> Override default value
                    </Button>
                </div>
            }
        </>
    }
}