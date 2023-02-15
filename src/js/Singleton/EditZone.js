import { createPortal } from '@wordpress/element';
import { Component } from '@wordpress/element';

export class EditZone {
    
    constructor() {
        this.componentInstance = null;
    }

    static getInstance() {
        
        if( ! this.instance ) {
          this.instance = new EditZone();
        }

        this.instance.init();

        return this.instance;
    }

    init() {
        
        if( document.querySelector('#abt-component-edit-zone') == null ) {
            const componentEditZone = document.createElement("div");
            componentEditZone.setAttribute("id", "abt-component-edit-zone");
            componentEditZone.setAttribute("class", "hide");

            const componentEditZoneLoader = document.createElement("div");
            componentEditZoneLoader.setAttribute("class", "loader");

            componentEditZone.appendChild(componentEditZoneLoader);
            document.querySelector('.edit-post-visual-editor').appendChild(componentEditZone);

            document.querySelector("#editor").classList.add("resizable");
        }
    }

    update() {
        document.querySelector("#abt-component-edit-zone").classList.add("updating");
        document.querySelector("#abt-component-edit-zone .loader").style.display = 'block';

        setTimeout( () => {
            document.querySelector("#abt-component-edit-zone .loader").style.display = 'none';
        }, 1000);
    }

    show( componentInstance ) {

        if( this.componentInstance != null ) {

            if( this.componentInstance == componentInstance ) {
                this.hide();
                return;
            }
            else {
                this.update();
                this.componentInstance.setState( { editZone: false } );
            }
        }

        this.componentInstance = componentInstance;
        componentInstance.setState( { editZone: true } );
        
        setTimeout( () => {
            document.querySelector("#abt-component-edit-zone").classList.remove("hide");
            document.querySelector("#abt-component-edit-zone").classList.remove("updating");
        });  
    }

    hide() {

        document.querySelector("#abt-component-edit-zone").classList.add("hide");

        if( this.componentInstance != null ) {
            this.componentInstance.setState( { editZone: false } );
            this.componentInstance = null;
        }
    }
  
    render() {

        if( this.componentInstance != null ) {

            return createPortal(
                this.componentInstance.renderEditMode(),
                document.querySelector("#abt-component-edit-zone")
            );
        }

        return;
    }
}