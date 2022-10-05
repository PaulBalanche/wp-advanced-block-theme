var layout = [];
Object.keys(theme_spec.media.queries).forEach(function( key, index ) {
    layout.push( {
        value: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        attributeName: key.charAt(0).toUpperCase() + key.slice(1)
    });
});
export const getLayouts = () => ( layout );

export function setBodyDevice( device, component = null ) {
    
    const el = document.getElementsByClassName('edit-post-visual-editor__content-area');
    // const dropZone = document.getElementsByClassName('block-editor-block-list__layout');

    el[0].style.margin = 'auto';

    console.log(theme_spec.media.queries);
    Object.keys(theme_spec.media.queries).forEach((item) => {

        if( device == item ) {
            let width = ( theme_spec.media.queries[item]['max-width'] != null ) ? theme_spec.media.queries[item]['max-width'] + 'px' : '100%';
            el[0].style.width = width;
        }
    });

    getLayouts().forEach( ( layout ) => {
        document.body.classList.remove(layout.value);
    });

    document.body.classList.add(device);
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