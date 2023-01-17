export function initDevice() {

    document.addEventListener("DOMContentLoaded", function(event) {
        if( theme_spec?.media?.defaultMedia != 'undefined' ) {
            setBodyDevice( theme_spec.media.defaultMedia );
        }

        if( theme_spec?.layout?.container?.default != 'undefined' ) {
            setWidthContainer( theme_spec.layout.container.default );
        }
     });
}

export function initContainer() {

    if( theme_spec?.layout?.container?.default != 'undefined' ) {
        setWidthContainer( theme_spec.layout.container.default );
    }
}

export function getLayouts() {
    
    var layout = [];
    Object.keys(theme_spec.media.queries).forEach(function( key, index ) {
        layout.push( {
            value: key,
            label: key.charAt(0).toUpperCase() + key.slice(1),
            attributeName: key.charAt(0).toUpperCase() + key.slice(1)
        });
    });

    return layout;
}

export function getBodyDevice() {

    let currentDevice = 'desktop';

    getLayouts().forEach( ( layout ) => {
        if( document.body.classList.contains(layout.value) ) {
            currentDevice = layout.value;
            return;
        }
    });

    return currentDevice;
}

export function setBodyDevice( device ) {
    
    var loading = setInterval(function () {

        var editor_area = document.getElementsByClassName('edit-post-visual-editor__content-area');
        if( editor_area ) {
            
            editor_area[0].style.margin = 'auto';
            Object.keys(theme_spec.media.queries).forEach((item) => {

                if( device == item ) {

                    if( theme_spec.media.queries[item]['maxWidth'] != null && theme_spec.media.queries[item]['maxWidth'] <= editor_area[0].offsetWidth ) {

                        editor_area[0].style.width = theme_spec.media.queries[item]['maxWidth'] + 'px';
                    }
                    else {
                        editor_area[0].style.removeProperty('width');
                    }
                }
            });
            clearInterval(loading);
        }
    }, 100); // Checks every 100ms(0.1s)

    getLayouts().forEach( ( layout ) => {
        document.body.classList.remove(layout.value);
    });
    document.body.classList.add(device);
}

export function setWidthContainer( width ) {

    var loading = setInterval(function () {

        var wp_block_elements = document.getElementsByClassName('block-editor-block-list__block');
        if( wp_block_elements ) {
            
            for( var i=0; i < wp_block_elements.length; i++ ) {
                wp_block_elements[i].style.maxWidth = width;
            }
            clearInterval(loading);
        }
    }, 100); // Checks every 100ms(0.1s)
}