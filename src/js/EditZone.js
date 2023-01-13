import { createPortal } from '@wordpress/element';

export class EditZone {
    
    constructor() {
        this.componentInstance = {};
    }

    static getInstance() {
        
        if( ! this.instance ) {
          this.instance = new EditZone();
        }

        return this.instance;
    }

    addComponent( componentInstance ) {

        this.componentInstance[componentInstance.props.clientId] = componentInstance;
        this.clean();
        document.getElementById("abt-component-edit-zone").classList.remove("hide");
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