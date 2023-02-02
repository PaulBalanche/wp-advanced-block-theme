import {
    MediaPlaceholder
} from '@wordpress/block-editor';

import {
    TextControl,
    Button,
    TabPanel,
    RadioControl,
} from '@wordpress/components';

import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';
import { Devices } from '../Singleton/Devices';

export function renderImageVideo( componentInstance, type, args, id, label, keys, valueProp, objectValue, required = false ) {

    label = ( label && required ) ? label + '*' : label;

    let imageVideoControl = [];

    if( type == 'image' ) {

        let preview = false;
        if( typeof objectValue == 'object' && objectValue.preview ) {
            preview = (
                <div
                    key={ id + "-mediaPreviewContainer" }
                    className="media-preview-container"
                >
                    <img
                        key={ id + "-imagePreview" }
                        alt="Edit image"
                        title="Edit image"
                        className="edit-image-preview"
                        src={ objectValue.preview }
                    />
                    <Button
                        key={ id + "-removeMedia" }
                        isSecondary
                        isSmall
                        className="reset-button"
                        onMouseDown={ () => {
                                Attributes.updateAttributes( keys, valueProp, undefined, false, componentInstance )
                            }
                        }
                    >Remove</Button>
                </div>
            );
        }

        // MediaPlaceholder labels
        let labels = {
            // title: label
            title: null
        }
        if( args.instructions && typeof args.instructions == 'object' && args.instructions ) {
            labels.instructions = args.instructions
        }

        imageVideoControl.push( Render.fieldContainer( id + "_image",
                <MediaPlaceholder
                    key={ id + "-MediaPlaceholder" }
                    onSelect={ ( value ) => {
                        
                        let newValue = undefined;

                        if( typeof value.id != 'undefined' ) {
                            newValue = {
                                id: value.id,
                                preview: value.url
                            };
                        }

                        if( typeof newValue != 'undefined' && ( typeof newValue != 'object' || Object.keys(newValue).length > 0 ) )
                            Attributes.updateAttributes( keys, valueProp, newValue, false, componentInstance );
                    } }
                    value={ ( objectValue ) ? objectValue : false }
                    disableDropZone={ true }
                    labels={ labels }
                >{ preview }</MediaPlaceholder>
            )
        );
    }
    else if( type == 'video' ) {

        /**
         * Video type
         */
        let options_video_type = [];
        if( args.file )
            options_video_type.push( { label: 'File', value: 'file' } );

        if( args.embed )
            options_video_type.push( { label: 'Embed', value: 'embed' } );

        let selected_option = ( objectValue && objectValue.type ) ? objectValue.type : ( ( args.file ) ? 'file' : ( ( args.embed ) ? 'embed' : false ) );
            
        const VideoRadioControl = withState( {
            option: selected_option,
        } )( ( { option, setState } ) => (
            <RadioControl
                key={ id + "-videoType" }
                label={ "Video type" }
                selected={ option }
                options={ options_video_type }
                onChange={ ( newValue ) => {
                    setState( { newValue } );
                    Attributes.updateAttributes( keys, valueProp, { type: newValue }, false, componentInstance );
                } }
            />
        ) );

        imageVideoControl.push( Render.fieldContainer( id + "_video", <VideoRadioControl /> ) );

        /**
         * File
         */
        if( selected_option == 'file' ) {

            let preview = false;
            if( objectValue && objectValue.file && typeof objectValue.file == 'object' ) {
                preview = (
                    <>
                        <img
                            key={ id + "-filePreview" }
                            alt="Edit file"
                            title="Edit file"
                            className="edit-file-preview"
                            src={ objectValue.file.preview }
                        />
                        <div
                            key={ id + "-fileDetails" }
                            className="file-details"
                        >
                            { objectValue.file.name }<br />
                            { objectValue.file.mime}<br />
                            { Attributes.fileSizeFormat(objectValue.file.size) }
                        </div>
                    </>
                );
                
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
                            onMouseDown={ () => 
                                Attributes.updateAttributes( keys, valueProp, {  type: 'file' }, false, componentInstance )
                            }
                        >Remove</Button>
                    </div>
                );
            }
            
            imageVideoControl.push ( Render.fieldContainer( id + "_file",
                    <MediaPlaceholder
                        key={ id + "-MediaPlaceholder" }
                        onSelect={ ( value ) => {
                            
                            let newValue = undefined;
                            if( typeof value.id != 'undefined' ) {
                                newValue = {
                                    id: value.id,
                                    preview: value.icon,
                                    name: value.filename,
                                    mime: value.mime,
                                    size: value.filesizeInBytes
                                };
                            }

                            if( typeof newValue != 'undefined' && ( typeof newValue != 'object' || Object.keys(newValue).length > 0 ) ) {
                                Attributes.updateAttributes( keys, valueProp, { type: 'file', file: newValue }, false, componentInstance );
                            }
                        } }
                        value={ ( objectValue && objectValue.file ) ? objectValue.file : false }
                        disableDropZone={ true }
                    >{ preview }</MediaPlaceholder>
                )
            );
        }

        /**
         * Embed
         */
        if( selected_option == 'embed' ) {
            imageVideoControl.push ( Render.fieldContainer( id + "_embed",
                    <TextControl
                        key={ id + "-embedLink"}
                        label={ 'Embed link' }
                        type={ 'text' }
                        value={ ( objectValue && objectValue.embed ) ? objectValue.embed.url : '' }
                        onChange={ ( newValue ) =>
                            Attributes.updateAttributes( keys, valueProp, { type: 'embed', embed: { url: newValue} }, false, componentInstance )
                        }
                    />
                )
            );
        }
    }
    
    return Render.panelComponent( id, label, imageVideoControl, false );
}