import {
    MediaPlaceholder,
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor';

import {
    TextControl,
    Button,
    TabPanel,
    RadioControl,
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable, fileSizeFormat, setAttributes } from '../Attributes';

export function renderImageVideo( type, args, id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {

    label = ( label && required ) ? label + '*' : label;

    let videoControl = [];
    var tabPanelResponsive = [];

    // Responsive init
    if( ! args.responsive || typeof args.responsive != 'object' )
        args.responsive = [ 'default' ];

    // Remove useless data
    if( typeof objectValue == 'object' ) {
        for( var i in objectValue ) {
            if( ! args.responsive.includes(i) )
                delete objectValue[i];
        }
    }

    // Loop on each responsive entries
    for( var i in args.responsive ) {

        let responsive_id = args.responsive[i];
        let responsiveContent = [];

        // Update component attribute if empty 
        if( ! objectValue[responsive_id] ) {
            if( typeof objectValue != 'object' )
                updateAttributes( keys, valueProp, { [responsive_id]: {} }, false, clientId );
            else
                updateAttributes( keys.concat(responsive_id), valueProp, {}, false, clientId );
        }

        if( type == 'image' ) {

            let preview = false;
            if( objectValue[responsive_id] && typeof objectValue[responsive_id] == 'object' && objectValue[responsive_id].preview ) {
                preview = (
                    <div
                        key={ id + "-mediaPreviewContainer" + responsive_id }
                        className="media-preview-container"
                    >
                        <img
                            key={ id + "-imagePreview" + responsive_id }
                            alt="Edit image"
                            title="Edit image"
                            className="edit-image-preview"
                            src={ objectValue[responsive_id].preview }
                        />
                        <Button
                            key={ id + "-removeMedia" + responsive_id }
                            isSecondary
                            isSmall
                            className="reset-button"
                            onClick={ () => {
                                    updateAttributes( keys.concat(responsive_id), valueProp, undefined, false, clientId )
                                }
                            }
                        >Remove</Button>
                    </div>
                );
            }

            // MediaPlaceholder labels
            let labels = {
                title: ( responsive_id != 'default' ) ? label + ' (' + responsive_id + ')' : label
            }
            if( args.instructions && typeof args.instructions == 'object' && args.instructions[responsive_id] ) {
                labels.instructions = args.instructions[responsive_id]
            }

            responsiveContent.push (
                <div
                    key={ id + "-MediaPlaceholderBasicContainer-" + responsive_id }
                    className="basicField"
                >
                    <MediaPlaceholder
                        key={ id + "-MediaPlaceholder-" + responsive_id }
                        onSelect={ ( value ) => {
                            
                            let newValue = undefined;

                            if( typeof value.id != 'undefined' ) {
                                newValue = {
                                    id: value.id,
                                    preview: value.url
                                };
                            }

                            if( typeof newValue != 'undefined' && ( typeof newValue != 'object' || Object.keys(newValue).length > 0 ) )
                                updateAttributes( keys.concat(responsive_id), valueProp, newValue, false, clientId );
                        } }
                        value={ ( objectValue[responsive_id] ) ? objectValue[responsive_id] : false }
                        disableDropZone={ true }
                        labels={ labels }
                    >{ preview }</MediaPlaceholder>
                </div>
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

            let selected_option = ( objectValue[responsive_id] && objectValue[responsive_id].type ) ? objectValue[responsive_id].type : ( ( args.file ) ? 'file' : ( ( args.embed ) ? 'embed' : false ) );
                
            const VideoRadioControl = withState( {
                option: selected_option,
            } )( ( { option, setState } ) => (
                <RadioControl
                    key={ id + "-videoType-" + responsive_id }
                    label={ "Video type" }
                    selected={ option }
                    options={ options_video_type }
                    onChange={ ( newValue ) => {
                        setState( { newValue } );
                        updateAttributes( keys.concat(responsive_id), valueProp, { type: newValue }, false, clientId );
                    } }
                />
            ) );

            responsiveContent.push(
                <div
                    key={ id + "-videoTypeBasicContainer-" + responsive_id }
                    className="basicField"
                >
                    <VideoRadioControl />
                </div>
            );

            /**
             * File
             */
            if( selected_option == 'file' ) {

                let preview = false;
                if( objectValue[responsive_id] && objectValue[responsive_id].file && typeof objectValue[responsive_id].file == 'object' ) {
                    preview = (
                        <>
                            <img
                                key={ id + "-filePreview-" + responsive_id }
                                alt="Edit file"
                                title="Edit file"
                                className="edit-file-preview"
                                src={ objectValue[responsive_id].file.preview }
                            />
                            <div
                                key={ id + "-fileDetails-" + responsive_id }
                                className="file-details"
                            >
                                { objectValue[responsive_id].file.name }<br />
                                { objectValue[responsive_id].file.mime}<br />
                                { fileSizeFormat(objectValue[responsive_id].file.size) }
                            </div>
                        </>
                    );
                    
                    preview = (
                        <div
                            key={ id + "-mediaPreviewContainer-" + responsive_id }
                            className="media-preview-container"
                        >
                            { preview }
                            <Button
                                key={ id + "-removeMedia-" + responsive_id }
                                isSecondary
                                isSmall
                                className="reset-button"
                                onClick={ () => 
                                    updateAttributes( keys.concat(responsive_id), valueProp, {  type: 'file' }, false, clientId )
                                }
                            >Remove</Button>
                        </div>
                    );
                }
                
                responsiveContent.push (
                    <div
                        key={ id + "-MediaPlaceholderBasicContainer-" + responsive_id }
                        className="basicField"
                    >
                        <MediaPlaceholder
                            key={ id + "-MediaPlaceholder-" + responsive_id }
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

                                if( typeof newValue != 'undefined' && ( typeof newValue != 'object' || Object.keys(newValue).length > 0 ) )
                                    updateAttributes( keys.concat(responsive_id), valueProp, { type: 'file', file: newValue }, false, clientId );
                            } }
                            value={ ( objectValue[responsive_id] && objectValue[responsive_id].file ) ? objectValue[responsive_id].file : false }
                            disableDropZone={ true }
                        >{ preview }</MediaPlaceholder>
                    </div>
                );
            }

            /**
             * Embed
             */
            if( selected_option == 'embed' ) {
                responsiveContent.push (
                    <div
                        key={ id + "-embedLinkBasicContainer-" + responsive_id }
                        className="basicField"
                    >
                        <TextControl
                            key={ id + "-embedLink"}
                            label={ 'Embed link' }
                            type={ 'text' }
                            value={ ( objectValue[responsive_id] && objectValue[responsive_id].embed ) ? objectValue[responsive_id].embed.url : '' }
                            onChange={ ( newValue ) =>
                                updateAttributes( keys.concat(responsive_id), valueProp, { type: 'embed', embed: { url: newValue} }, false, clientId )
                            }
                        />
                    </div>
                );
            }
        }

        // Tab panel construction
        tabPanelResponsive.push( {
            name: responsive_id,
            title: responsive_id.charAt(0).toUpperCase() + responsive_id.slice(1),
            content: responsiveContent
        } );
    }

    // Render tab if more than 1 content
    if( tabPanelResponsive.length > 1 ) {

        videoControl.push(
            <TabPanel
                key={ id + "-tabPanelVideo" }
                className="tab-panel-wpe-component"
                activeClass="active-tab"
                tabs={ tabPanelResponsive }
            >
                { ( tabPanelResponsive ) => tabPanelResponsive.content }
            </TabPanel>
        );

    }
    else 
        videoControl.push( tabPanelResponsive[0].content );
    
    return renderPanelComponent( id, label, videoControl, false );
}