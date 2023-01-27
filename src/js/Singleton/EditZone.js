import { createPortal } from '@wordpress/element';

export class EditZone {
    
    constructor() {

        this.componentInstance = null;

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
            }
        }

        this.componentInstance = componentInstance;
        componentInstance.setState( { editZone: true } );
        
        setTimeout( () => {
            document.querySelector("#abt-component-edit-zone").classList.remove("hide");
            document.querySelector(".interface-interface-skeleton").classList.add("editZoneEnabled");
            document.querySelector("#abt-component-edit-zone").classList.remove("updating");
        });  
    }

    hide() {
        
        document.querySelector("#abt-component-edit-zone").classList.add("hide");
        document.querySelector(".interface-interface-skeleton").classList.remove("editZoneEnabled");

        this.componentInstance.setState( { editZone: false } );
        this.componentInstance = null;
    }
  
    render() {

        return createPortal(
            this.componentInstance.renderEditMode(),
            document.querySelector("#abt-component-edit-zone")
        );
    }
}