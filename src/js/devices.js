import { createPortal } from '@wordpress/element';

import {
    Button,
    ButtonGroup
} from '@wordpress/components';

export class Devices {
    
    constructor() {
        this.componentInstance = {};
        this.mediaQueries = {};
        this.defaultMediaQuery = null;
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

            this.mediaQueries = this.sortMediaQueries( theme_spec.media.queries );

            if( this.currentDevice == null || ( theme_spec?.media?.defaultMedia && typeof this.mediaQueries[ theme_spec.media.defaultMedia ] != 'undefined' ) ) {
                
                this.currentDevice = theme_spec.media.defaultMedia;
                this.defaultMediaQuery = theme_spec.media.defaultMedia;
                
                setTimeout( () => { this.setCurrentDevice(theme_spec.media.defaultMedia) }, 0 );
            }

            const devicesButtonGroupContainer = document.createElement("div");
            devicesButtonGroupContainer.setAttribute("id", "devicesButtonGroupContainer");
            document.querySelector('.edit-post-header__toolbar').appendChild(devicesButtonGroupContainer);
        }
    }

    sortMediaQueries ( mediaQueries ) {

        var mediaQueriesSorted = {};

        while ( Object.keys( mediaQueries ).length > 0 ) {

            var min = 0;
            var keyMin = null;
            Object.keys( mediaQueries ).forEach( ( layout ) => {

                if( keyMin == null || mediaQueries[layout].minWidth < min ) {
                    keyMin = layout;
                    min = mediaQueries[layout].minWidth;
                }
            });

            mediaQueriesSorted[ keyMin] = mediaQueries[keyMin];
            delete mediaQueries[keyMin];
        }

        return mediaQueriesSorted;
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

        var editor_area = document.querySelector('#editor');
        var layout_flow_area = document.querySelector('.is-root-container.is-layout-flow');
        if( editor_area && layout_flow_area ) {
            
            layout_flow_area.style.margin = 'auto';

            if( typeof this.getMediaQueries()[ newDevice ] != 'undefined' ) {

                if( this.getMediaQueries()[ newDevice ]['maxWidth'] != null && this.getMediaQueries()[ newDevice ]['maxWidth'] <= editor_area.offsetWidth ) {

                    layout_flow_area.style.width = this.getMediaQueries()[ newDevice ]['maxWidth'] + 'px';
                }
                else {
                    layout_flow_area.style.removeProperty('width');
                }

                const minText = ( this.getMediaQueries()[ newDevice ]['minWidth'] != null && this.getMediaQueries()[ newDevice ]['minWidth'] > 0 ) ? this.getMediaQueries()[ newDevice ]['minWidth'] + 'px < ' : '';
                const maxText = ( this.getMediaQueries()[ newDevice ]['maxWidth'] != null ) ?  ' < ' + this.getMediaQueries()[ newDevice ]['maxWidth'] + 'px' : '';
                layout_flow_area.setAttribute('data-size', minText + newDevice.charAt(0).toUpperCase() + newDevice.slice(1) + maxText);
            }
        }
    }

    applyToCompoments() {
        for( const [key, value] of Object.entries(this.getComponents()) ) {
            value.setState({
                currentBodyDevice: this.getCurrentDevice()
            });
        }
    }

    getMediaQueries() {
        return this.mediaQueries;
    }

    getComponents() {
        return this.componentInstance;
    }

    getButtonGroup() {

        return <ButtonGroup
            key="devicesButtonGroup"
            className="devicesButtonGroup"
        >
            { Object.keys( this.getMediaQueries() ).map( ( layout ) => {
                return (
                    <Button
                        key={ "layoutButton_" + layout }
                        isPressed={ this.getCurrentDevice() == layout }
                        onMouseDown={ () => {
                            this.setCurrentDevice( layout )
                        } }
                    >
                        { layout.charAt(0).toUpperCase() + layout.slice(1) }
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