import {
    MediaPlaceholder
} from '@wordpress/block-editor';

import {
    Button
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable, fileSizeFormat, setAttributes } from '../attributes';

export function renderFile( type, id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId, responsive = false ) {

    label = ( label && required ) ? label + '<span class="o-required">*</span>' : label;
    
    let preview = false;
    if( objectValue && typeof objectValue == 'object' ) {

        switch( type ) {
            case "image":
                preview = (
                    <img
                        key={ id + "-imagePreview" }
                        alt="Edit image"
                        title="Edit image"
                        className="edit-image-preview"
                        src={ objectValue.preview }
                    />
                );
                break;

            case "video":
                preview = (
                    <>
                        <img
                            key={ id + "-filePreview" }
                            alt="Edit file"
                            title="Edit file"
                            className="edit-file-preview"
                            src={ objectValue.preview }
                        />
                        <div
                            key={ id + "-fileDetails" }
                            className="file-details"
                        >
                            { objectValue.name }<br />
                            { objectValue.mime}<br />
                            { fileSizeFormat(objectValue.size) }
                        </div>
                    </>
                );
                break;
            
            case "file":
                preview = (
                    <>
                        <img
                            key={ id + "-filePreview" }
                            alt="Edit file"
                            title="Edit file"
                            className="edit-file-preview"
                            src={ objectValue.preview }
                        />
                        <div
                            key={ id + "-fileDetails" }
                            className="file-details"
                        >
                            { objectValue.name }<br />
                            { objectValue.mime}<br />
                            { fileSizeFormat(objectValue.size) }
                        </div>
                    </>
                );
                break;

            case "gallery":
                preview = [];
                objectValue.forEach(image => {
                    preview.push(
                        <li
                            key={ id + "-galleryImageContainerLi" + image.id }
                            className="blocks-gallery-item"
                        >
                            <img
                                key={ id + "-galleryImage_" + image.id }
                                src={ image.preview }
                            />
                        </li>
                    );
                });
                
                let columns = ( objectValue.length > 5 ) ? 5 : objectValue.length;
                preview = (
                    <figure 
                        key={ id + "-galleryImagefigure" }
                        className={ "wp-block-gallery columns-" + columns }
                    >
                        <ul
                            key={ id + "-galleryImageContainerUl" }
                            className="blocks-gallery-grid"
                        >
                            { preview }
                        </ul>
                    </figure>
                );
                break;
        }
        preview = (
            <div
                key={ id + "-mediaPreviewContainer" }
                className="media-preview-container"
            >
                { preview }
                <Button
                    key={ id + "-removeMedia" }
                    isSecondary
                    isSmall
                    className="reset-button"
                    onClick={ () => {
                            if( type == "gallery" && objectValue.length > 1 )
                                setAttributes( { [keys]: objectValue.slice(0, objectValue.length - 1) }, clientId );
                            else if( repeatable )
                                removeEltRepeatable( keys, valueProp );
                            else
                                setAttributes( { [keys]: undefined }, clientId );
                        }
                    }
                >Remove</Button>
            </div>
        );
    }
    let inner = (
        <div
            key={ id + "-MediaPlaceholderBasicContainer"}
            className="basicField"
        >
            <MediaPlaceholder
                key={ id }
                onSelect={ ( value ) => {

                    let newValue = undefined;
                    switch( type ) {
                        case "image":
                            if( typeof value.id != 'undefined' ) {
                                newValue = {
                                    id: value.id,
                                    preview: value.url
                                };
                            }
                            break;

                        case "video":
                            if( typeof value.id != 'undefined' ) {
                                newValue = {
                                    id: value.id,
                                    preview: value.icon,
                                    name: value.filename,
                                    mime: value.mime,
                                    size: value.filesizeInBytes
                                };
                            }
                            break;
                        
                        case "file":
                            if( typeof value.id != 'undefined' ) {
                                newValue = {
                                    id: value.id,
                                    preview: value.icon,
                                    name: value.filename,
                                    mime: value.mime,
                                    size: value.filesizeInBytes
                                };
                            }
                            break;

                        case "gallery":
                            newValue = [];
                            value.forEach(image => {
                                if( typeof image.id != 'undefined' ) {
                                    newValue.push( {
                                        id: image.id,
                                        preview: image.url
                                    } )
                                }
                            });
                            break;
                    }

                    if( typeof newValue != 'undefined' && ( typeof newValue != 'object' || Object.keys(newValue).length > 0 ) )
                        updateAttributes( keys, valueProp, newValue, false, clientId );
                } }
                multiple= { type == 'gallery' }
                addToGallery= { type == 'gallery' && !! objectValue }
                value={ objectValue }
                disableDropZone={ true }
            >{ preview }</MediaPlaceholder>
        </div>
    );


    // if( responsive ) {

    //     let newInner = [];

    //     newInner.push(
    //         renderTabPanelComponent(
    //             id,
    //             getLayouts().map( ( layout ) => {
    //                 return {
    //                     name: layout.value,
    //                     title: layout.label,
    //                     className: 'tab-' + layout.value,
    //                 };
    //             } ),
    //             function ( tab ) {
    //                 return tab.label;
    //             },
    //             getBodyDevice()
    //         )
    //     );
        
    //     inner = newInner;
    // }




    return renderPanelComponent( id, label, inner, false );
}