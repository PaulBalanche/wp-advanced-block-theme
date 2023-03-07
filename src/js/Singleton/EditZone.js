import { createPortal } from '@wordpress/element';
import { Component } from '@wordpress/element';

export class EditZone {
    
    _$editZone;
    _$editor;
    _$loader;

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
        
        if( this._$editZone == null ) {

            const componentEditZone = document.createElement("div");
            componentEditZone.setAttribute("id", "o-edit-zone");
            componentEditZone.classList.add('o-edit-zone', 'hide');
            this._$editZone = componentEditZone;

            const componentEditZoneLoader = document.createElement("div");
            componentEditZone.classList.add('loader');
            this._$loader = componentEditZoneLoader;

            componentEditZone.appendChild(componentEditZoneLoader);
            document.querySelector('.edit-post-visual-editor').appendChild(componentEditZone);

            this._$editor = document.querySelector('#editor');
            this._$editor.classList.add("resizable");

            // init shortcuts
            this._initShortcuts();

            // init mouse events
            this._initMouseEvents();

        }

        // add a class on loaderLiveRenderingIframe for convinience
        Array.from(document.querySelectorAll('.loaderLiveRenderingIframe') ?? []).forEach($elm => {
            $elm.classList.add('o-preview-zone_loader');
        });

    }

    _initMouseEvents() {

    }

    _initShortcuts() {
        // listen for escape to close the editor
        document.addEventListener('keyup', (e) => {
            if(e.key === "Escape") {
                e.stopPropagation();
                e.preventDefault();
                this.close();
            }
        });

        // liten for maintaining the "§" key to hide and show the editor
        document.addEventListener('keydown', (e) => {
            if (e.key === '§') {
                e.preventDefault();
                this.hide();
            }
        });
        document.addEventListener('keyup', (e) => {
            if (e.key === '§') {
                e.preventDefault();
                this.show();
            }
        });
    }

    update() {
        this._$editZone.classList.add("updating");
        this._$loader.style.display = 'block';

        setTimeout( () => {
            this._$loader.style.display = 'none';
        }, 1000);
    }

    open( componentInstance = this.componentInstance ) {

        // if it's not the same componentInstance to display
        // hide the previous one and display the new one
        if( this.componentInstance != null ) {
            if( this.componentInstance == componentInstance ) {
                this.close();
                return;
            }
            else {
                this.update();
                this.componentInstance.setState( { editZone: false } );
            }
        }

        this.componentInstance = componentInstance;

        const newState = { editZone: true };
        if( componentInstance.getReusableBlock() != null && componentInstance.state.alertReusableBlockMessage == null ) {
            newState.alertReusableBlockMessage =  false;
        }
        componentInstance.setState( newState);
        
        setTimeout( () => {
            this._$editZone.classList.remove("hide", 'updating');
        });  
    }

    close() {
        this.hide();
        if( this.componentInstance != null ) {
            this.componentInstance.setState( { editZone: false } );
            this.componentInstance = null;
        }
    }

    show() {
        if (!this.componentInstance) {
            return;
        }
        this._$editZone.classList.remove("hide", 'updating');
    }

    hide() {
        if (!this.componentInstance) {
            return;
        }
        this._$editZone.classList.add("hide"); 
    }
  
    render() {

        if( this.componentInstance != null ) {

            return createPortal(
                this.componentInstance.renderEditMode(),
                this._$editZone
            );
        }

        return;
    }
}