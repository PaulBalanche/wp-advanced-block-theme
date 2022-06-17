import { registerBlockType } from '@wordpress/blocks';
import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps
} from '@wordpress/block-editor';

registerBlockType( 'custom/wpe-column', {
    title: 'Col',
    category: 'wpe-layout',
    icon: <svg enableBackground="new 0 0 24 24" height="24px" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><g><g><g><g><path d="M12,10.9c-0.1,0-0.2,0-0.2-0.1L3.5,6.1C3.4,6,3.3,5.8,3.3,5.6c0-0.2,0.1-0.3,0.2-0.4l8.2-4.7c0.2-0.1,0.3-0.1,0.5,0      l8.2,4.7c0.2,0.1,0.2,0.3,0.2,0.4S20.6,6,20.5,6.1l-8.2,4.7C12.2,10.8,12.1,10.9,12,10.9z M4.8,5.6L12,9.8l7.2-4.2L12,1.5      L4.8,5.6z"/></g><g><path d="M10.4,23.6c-0.1,0-0.2,0-0.2-0.1l-8.2-4.7c-0.2-0.1-0.3-0.3-0.3-0.4V8.9c0-0.2,0.1-0.3,0.2-0.4c0.2-0.1,0.3-0.1,0.5,0      l8.2,4.7c0.2,0.1,0.2,0.3,0.2,0.4v9.5c0,0.2-0.1,0.3-0.2,0.4C10.5,23.6,10.5,23.6,10.4,23.6z M2.7,18.1l7.2,4.2v-8.3L2.7,9.8      V18.1z"/></g><g><path d="M13.6,23.6c-0.1,0-0.2,0-0.2-0.1c-0.2-0.1-0.2-0.3-0.2-0.4v-9.5c0-0.2,0.1-0.3,0.2-0.4l8.2-4.7c0.2-0.1,0.3-0.1,0.5,0      c0.2,0.1,0.2,0.3,0.2,0.4v9.5c0,0.2-0.1,0.3-0.3,0.4l-8.2,4.7C13.8,23.6,13.7,23.6,13.6,23.6z M14.1,13.9v8.3l7.2-4.2V9.8      L14.1,13.9z"/></g></g></g></g></svg>,
    supports: {
        lightBlockWrapper: true,
        reusable: false
    },
    parent: [ 'custom/wpe-grid' ],
    attributes: {
        columnStartDesktop: {
            type: 'number',
            default: 1
        },
        columnStartTablet: {
            type: 'number',
            default: 1
        },
        columnStartMobile: {
            type: 'number',
            default: 1
        },
        widthDesktop: {
            type: 'number',
            default: 1
        },
        widthTablet: {
            type: 'number',
            default: 1
        },
        widthMobile: {
            type: 'number',
            default: 1
        },
        rowStartDesktop: {
            type: 'number',
            default: 1
        },
        rowStartTablet: {
            type: 'number',
            default: 1
        },
        rowStartMobile: {
            type: 'number',
            default: 1
        },
        heightDesktop: {
            type: 'number',
            default: 1
        },
        heightTablet: {
            type: 'number',
            default: 1
        },
        heightMobile: {
            type: 'number',
            default: 1
        }
    },
    edit: ( ( { attributes, className } ) => {

        let newClassName = '';

        if( Number.isInteger(attributes.columnStartDesktop) && attributes.columnStartDesktop > 0 &&
            Number.isInteger(attributes.widthDesktop) && attributes.widthDesktop > 0 ) {

            let ColumnEndDesktop = attributes.columnStartDesktop + attributes.widthDesktop;
            newClassName += "gridColumnStartDesktop-" + attributes.columnStartDesktop + " gridColumnEndDesktop-" + ColumnEndDesktop + " ";
        }

        if( Number.isInteger(attributes.columnStartTablet) && attributes.columnStartTablet > 0 &&
            Number.isInteger(attributes.widthTablet) && attributes.widthTablet > 0 ) {

            let ColumnEndTablet = attributes.columnStartTablet + attributes.widthTablet;
            newClassName += "gridColumnStartTablet-" + attributes.columnStartTablet + " gridColumnEndTablet-" + ColumnEndTablet + " ";
        }

        if( Number.isInteger(attributes.columnStartMobile) && attributes.columnStartMobile > 0 &&
            Number.isInteger(attributes.widthMobile) && attributes.widthMobile > 0 ) {

            let ColumnEndMobile= attributes.columnStartMobile + attributes.widthMobile;
            newClassName += "gridColumnStartMobile-" + attributes.columnStartMobile + " gridColumnEndMobile-" + ColumnEndMobile + " ";
        }

        if( Number.isInteger(attributes.rowStartDesktop) && attributes.rowStartDesktop > 0 &&
            Number.isInteger(attributes.heightDesktop) && attributes.heightDesktop > 0 ) {

            let RowEndDesktop = attributes.rowStartDesktop + attributes.heightDesktop;
            newClassName += "gridRowStartDesktop-" + attributes.rowStartDesktop + " gridRowEndDesktop-" + RowEndDesktop + " ";
        }

        if( Number.isInteger(attributes.rowStartTablet) && attributes.rowStartTablet > 0 &&
            Number.isInteger(attributes.heightTablet) && attributes.heightTablet > 0 ) {

            let RowEndTablet = attributes.rowStartTablet + attributes.heightTablet;
            newClassName += "gridRowStartTablet-" + attributes.rowStartTablet + " gridRowEndTablet-" + RowEndTablet + " ";
        }

        if( Number.isInteger(attributes.rowStartMobile) && attributes.rowStartMobile > 0 &&
            Number.isInteger(attributes.heightMobile) && attributes.heightMobile > 0 ) {

            let RowEndMobile= attributes.rowStartMobile + attributes.heightMobile;
            newClassName += "gridRowStartMobile-" + attributes.rowStartMobile + " gridRowEndMobile-" + RowEndMobile + " ";
        }



        const blockProps = useBlockProps( {
            className: newClassName,
        } );
        const innerBlocksProps = useInnerBlocksProps( blockProps, {
            renderAppender: InnerBlocks.ButtonBlockAppender,
        } );

        // Render
        return <div { ...innerBlocksProps } />
    } ),
 
    save: () => {
        return <InnerBlocks.Content />;
    },
} );