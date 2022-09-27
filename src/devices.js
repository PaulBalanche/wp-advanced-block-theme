var layout = [];
Object.keys(theme_spec.media.queries).forEach(function( key, index ) {
    layout.push( {
        value: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        attributeName: key.charAt(0).toUpperCase() + key.slice(1)
    });
});
export const getLayouts = () => ( layout );

export function setBodyDevice( device ) {

    getLayouts().forEach( ( layout ) => {
        document.body.classList.remove(layout.value);
    });

    document.body.classList.add(device);
}