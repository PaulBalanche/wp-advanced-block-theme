import { createPortal } from '@wordpress/element';

export class EditZone {
    
    constructor() {
        this.componentInstance = {};

        this.init();
    }

    static getInstance() {
        
        if( ! this.instance ) {
          this.instance = new EditZone();
        }

        return this.instance;
    }

    init() {
        
        const componentEditZone = document.createElement("div");
        componentEditZone.setAttribute("id", "abt-component-edit-zone");
        componentEditZone.setAttribute("class", "hide");
        document.querySelector('.interface-interface-skeleton__body').appendChild(componentEditZone);
    }

    addComponent( componentInstance ) {

        this.componentInstance[componentInstance.props.clientId] = componentInstance;
        this.clean();
        document.getElementById("abt-component-edit-zone").classList.remove("hide");
        // document.getElementsByClassName("is-root-container")[0].classList.add("editZoneEnabled");
    } 
    
    removeComponent( componentInstance ) {

        delete this.componentInstance[componentInstance.props.clientId];
        this.hide();
    } 

    hasComponent( componentInstance ) {

        if( typeof this.componentInstance[componentInstance.props.clientId] != 'undefined' ) {
            return true;
        }
     
        return false;
    }

    clean() {

        let index = 0;
        const length = Object.keys(this.componentInstance).length;
        if( length > 1 ) {

            for( const [key, value] of Object.entries(this.componentInstance) ) {
                index++;
                if( index < length ) {
                    delete this.componentInstance[key];
                }
            }
        }
    }

    hide() {
        document.getElementById("abt-component-edit-zone").classList.add("hide");
        // document.getElementsByClassName("is-root-container")[0].classList.remove("editZoneEnabled");
    }
  
    render() {

        let children = [];
        for( const [key, value] of Object.entries(this.componentInstance) ) {
            children.push( value.renderEditMode() );
        }

        return createPortal(
            children,
            document.getElementById("abt-component-edit-zone")
        );
    }
}