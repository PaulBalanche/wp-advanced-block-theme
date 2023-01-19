import { createPortal } from '@wordpress/element';

import {
    Button,
    ButtonGroup
} from '@wordpress/components';

export class Devices {
    
    constructor() {
        this.componentInstance = {};
        this.layouts = [];
        this.currentDevice = null;
        this.alreadyRendered = false;

        this.init();
    }

    static getInstance() {
        
        if( ! this.instance ) {
          this.instance = new Devices();
        }

        return this.instance;
    }

    init() {

        if( theme_spec?.media?.queries && typeof theme_spec.media.queries == 'object' ) {

            Object.keys(theme_spec.media.queries).forEach( ( key, index ) => {
                this.layouts.push( {
                    value: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    attributeName: key.charAt(0).toUpperCase() + key.slice(1)
                });

                if( this.currentDevice == null || ( theme_spec?.media?.defaultMedia && theme_spec.media.defaultMedia == key ) ) {
                    this.currentDevice = key;
                }
            });

            const devicesButtonGroupContainer = document.createElement("div");
            devicesButtonGroupContainer.setAttribute("id", "devicesButtonGroupContainer");
            document.querySelector('.edit-post-header__toolbar').appendChild(devicesButtonGroupContainer);
        }
    }

    addComponent( componentInstance ) {

        this.componentInstance[componentInstance.props.clientId] = componentInstance;

        componentInstance.setState({
            currentBodyDevice: this.getCurrentDevice()
        });
    }

    getCurrentDevice() {
        return this.currentDevice;
    }
    
    setCurrentDevice( newDevice ) {

        this.currentDevice = newDevice;
        this.applyToCompoments();

        var editor_area = document.querySelector('.edit-post-visual-editor__content-area');
        if( editor_area ) {
            
            editor_area.style.margin = 'auto';
            Object.keys(theme_spec.media.queries).forEach((item) => {
    
                if( newDevice == item ) {
    
                    if( theme_spec.media.queries[item]['maxWidth'] != null && theme_spec.media.queries[item]['maxWidth'] <= editor_area.offsetWidth ) {
    
                        editor_area.style.width = theme_spec.media.queries[item]['maxWidth'] + 'px';
                    }
                    else {
                        editor_area.style.removeProperty('width');
                    }
                }
            });
        }
    }

    applyToCompoments() {
        for( const [key, value] of Object.entries(this.getComponents()) ) {
            value.setState({
                currentBodyDevice: this.getCurrentDevice()
            });
        }
    }

    getLayouts() {
        return this.layouts;
    }

    getComponents() {
        return this.componentInstance;
    }

    getButtonGroup() {

        return <ButtonGroup
            key="devicesButtonGroup"
            className="devicesButtonGroup"
        >
            { this.getLayouts().map( ( layout ) => {
                return (
                    <Button
                        key={ "layoutButton_" + layout.value }
                        isPressed={ this.getCurrentDevice() == layout.value }
                        onMouseDown={ () => {
                            this.setCurrentDevice( layout.value );
                        } }
                    >
                        { layout.value }
                    </Button>
                );
            } ) }
        </ButtonGroup>
    }

    isFirstComponent( componentInstance ) {

        for( const [key, value] of Object.entries(this.getComponents()) ) {   
            return ( key == componentInstance );
        }
    }

    render() {

        return createPortal(
            this.getButtonGroup(),
            document.getElementById("devicesButtonGroupContainer")
        );
    }
}