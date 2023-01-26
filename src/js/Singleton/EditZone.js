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

        const componentEditZoneLoader = document.createElement("div");
        componentEditZoneLoader.setAttribute("class", "loader");

        componentEditZone.appendChild(componentEditZoneLoader);
        document.querySelector('.interface-interface-skeleton__body').appendChild(componentEditZone);
    }

    addComponent( componentInstance ) {

        if( ! document.querySelector("#abt-component-edit-zone").classList.contains("hide") ) {

            document.querySelector("#abt-component-edit-zone").classList.add("updating");
            document.querySelector("#abt-component-edit-zone .loader").style.display = 'block';
        }

        this.clean();
        this.componentInstance[componentInstance.props.clientId] = componentInstance;
        
        document.querySelector("#abt-component-edit-zone").classList.remove("hide");
        document.querySelector(".interface-interface-skeleton").classList.add("editZoneEnabled");

        setTimeout( () => {
            document.querySelector("#abt-component-edit-zone").classList.remove("updating");
        });  
        setTimeout( () => {
            document.querySelector("#abt-component-edit-zone .loader").style.display = 'none';
        }, 1000);        
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

        // let index = 0;
        // const length = Object.keys(this.componentInstance).length;
        // if( length > 1 ) {

        //     for( const [key, value] of Object.entries(this.componentInstance) ) {
        //         index++;
        //         if( index < length ) {
        //             delete this.componentInstance[key];
        //         }
        //     }
        // }
        this.componentInstance = {};
    }

    hide() {
        document.querySelector("#abt-component-edit-zone").classList.add("hide");
        document.querySelector(".interface-interface-skeleton").classList.remove("editZoneEnabled");
    }
  
    render() {

        let children = [];
        for( const [key, value] of Object.entries(this.componentInstance) ) {
            children.push( value.renderEditMode() );
        }

        return createPortal(
            children,
            document.querySelector("#abt-component-edit-zone")
        );
    }
}