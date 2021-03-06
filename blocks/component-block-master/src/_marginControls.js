import { Component } from '@wordpress/element';

import {
    PanelBody,
    RangeControl,
    Button,
    HorizontalRule,
    TabPanel
} from '@wordpress/components';

import { merge } from 'merge-anything'

export class MarginControls extends Component {

	constructor( attr ) {
        super( ...arguments );
        this.parentProps = attr.props;

        if( ! this.parentProps.attributes.hasOwnProperty('padding') ) {
            this.parentProps.attributes.padding = {};
        }
        if( ! this.parentProps.attributes.hasOwnProperty('margin') ) {
            this.parentProps.attributes.margin = {};
        }

        this.state = {
            padding: merge( {
                mobile: { all: undefined, top: undefined, bottom: undefined, left: undefined, right: undefined, x: undefined, y: undefined },
                tablet: { all: undefined, top: undefined, bottom: undefined, left: undefined, right: undefined, x: undefined, y: undefined },
                desktop: { all: undefined, top: undefined, bottom: undefined, left: undefined, right: undefined, x: undefined, y: undefined }
            }, this.parentProps.attributes.padding),
            margin: merge( {
                mobile: { all: undefined, top: undefined, bottom: undefined, left: undefined, right: undefined, x: undefined, y: undefined },
                tablet: { all: undefined, top: undefined, bottom: undefined, left: undefined, right: undefined, x: undefined, y: undefined },
                desktop: { all: undefined, top: undefined, bottom: undefined, left: undefined, right: undefined, x: undefined, y: undefined }
            }, this.parentProps.attributes.margin)
		};

    }

    // getPadding( type ) {
    //     if( this.state.padding[this.props.deviceType.toLowerCase()].hasOwnProperty(type) ) {
    //         return this.state.padding[this.props.deviceType.toLowerCase()][type];
    //     }
        
    //     return null;
    // }

    // getMargin( type ) {
    //     if( this.state.margin[this.props.deviceType.toLowerCase()].hasOwnProperty(type) ) {
    //         return this.state.margin[this.props.deviceType.toLowerCase()][type];
    //     }
        
    //     return null;
    // }

    setPadding( type, deviceType, value ) {

        const newPadding = merge(this.state.padding, { [deviceType]: { [type]: value } } );
        this.setState( { padding: newPadding } );
        this.parentProps.setAttributes( { padding: newPadding } );
    }
    
    setMargin( type, deviceType, value ) {
        
        const newMargin = merge(this.state.margin, { [deviceType]: { [type]: value } } );
        this.setState( { margin: newMargin } );
        this.parentProps.setAttributes( { margin: newMargin } );
    }

    resetPadding( deviceType ) {

        const newPadding = {
            mobile: ( deviceType == 'mobile' ) ? {} : this.state.padding.mobile,
            tablet: ( deviceType == 'tablet' ) ? {} : this.state.padding.tablet,
            desktop: ( deviceType == 'desktop' ) ? {} : this.state.padding.desktop
        };
        this.setState( { padding: newPadding } );
        this.parentProps.setAttributes( { padding: newPadding } );
    }
    
    resetMargin( deviceType ) {
        
        const newMargin = {
            mobile: ( deviceType == 'mobile' ) ? {} : this.state.margin.mobile,
            tablet: ( deviceType == 'tablet' ) ? {} : this.state.margin.tablet,
            desktop: ( deviceType == 'desktop' ) ? {} : this.state.margin.desktop
        };
        this.setState( { margin: newMargin } );
        this.parentProps.setAttributes( { margin: newMargin } );
    }

    renderBtnReset( property, deviceType ) {

        var propertyToTreat = ( property == 'padding' ) ? this.state.padding : this.state.margin;

        var btnResetPadding = [];
        if( typeof propertyToTreat[deviceType] == 'object' && Object.keys(propertyToTreat).length > 0 ) {

            for (const [key, value] of Object.entries(propertyToTreat[deviceType])) {
                if( typeof value != 'undefined' ) {

                    btnResetPadding.push(
                        <div key={ "containerReset-" + property + "-" + deviceType + "-" + this.parentProps.clientId }>
                            <HorizontalRule />
                            <Button
                                variant="secondary"
                                className="is-secondary"
                                onClick={ () => {

                                        if( property == 'padding' ) {
                                            this.resetPadding(deviceType)
                                        }
                                        else {
                                            this.resetMargin(deviceType)
                                        }
                                    }
                                }
                            >
                                Reset { deviceType }
                            </Button>
                        </div>
                    )

                    break;
                }
            }
        }

        return btnResetPadding;
    }

    render() {

        return (
            <>
                <PanelBody title={ 'Padding' } initialOpen={ false }>

                    <TabPanel
                        className="padding-tab-panel"
                        activeClass="active-tab"
                        // onSelect={ (tabName) => wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType( tabName.charAt(0).toUpperCase() + tabName.slice(1) ) }
                        tabs={ [
                            {
                                name: 'mobile',
                                title: 'Mobile (all)',
                                className: 'tab-one',
                            },
                            {
                                name: 'tablet',
                                title: 'Tablet',
                                className: 'tab-two',
                            },
                            {
                                name: 'desktop',
                                title: 'Desktop',
                                className: 'tab-three',
                            }
                        ] }
                    >
                        { ( tab ) => 
                            <>
                                <RangeControl
                                    label="All"
                                    value={ this.state.padding[tab.name].all }
                                    onChange={ ( value ) => {
                                        this.setPadding('all', tab.name, value);
                                    } }
                                    min={ 0 }
                                    max={ 5 }
                                />
                                <HorizontalRule />
                                <div className="child-range-control">
                                    <RangeControl
                                        label="Padding Y"
                                        value={ this.state.padding[tab.name].y }
                                        onChange={ ( value ) => {
                                            this.setPadding('y', tab.name, value);
                                        } }
                                        min={ 0 }
                                        max={ 5 }
                                    />
                                    <div className="child-range-control">
                                        <RangeControl
                                            label="Top"
                                            value={ this.state.padding[tab.name].top }
                                            onChange={ ( value ) => 
                                                this.setPadding('top', tab.name, value)
                                            }
                                            min={ 0 }
                                            max={ 5 }
                                        />
                                        <RangeControl
                                            label="Bottom"
                                            value={ this.state.padding[tab.name].bottom }
                                            onChange={ ( value ) =>
                                                this.setPadding('bottom', tab.name, value)
                                            }
                                            min={ 0 }
                                            max={ 5 }
                                        />
                                    </div>
                                    <HorizontalRule />
                                    <RangeControl
                                        label="X"
                                        value={ this.state.padding[tab.name].x }
                                        onChange={ ( value ) => {
                                            this.setPadding('x', tab.name, value);
                                        } }
                                        min={ 0 }
                                        max={ 5 }
                                    />
                                    <div className="child-range-control">
                                        <RangeControl
                                            label="Left"
                                            value={ this.state.padding[tab.name].left }
                                            onChange={ ( value ) => 
                                                this.setPadding('left', tab.name, value)
                                            }
                                            min={ 0 }
                                            max={ 5 }
                                        />
                                        <RangeControl
                                            label="Right"
                                            value={ this.state.padding[tab.name].right }
                                            onChange={ ( value ) =>
                                                this.setPadding('right', tab.name, value)
                                            }
                                            min={ 0 }
                                            max={ 5 }
                                        />
                                    </div>
                                </div>
                                { this.renderBtnReset( 'padding', tab.name ) }
                            </>
                        }
                    </TabPanel>
                </PanelBody>
                <PanelBody title={ 'Margin' } initialOpen={ false }>
                    <TabPanel
                        className="margin-tab-panel"
                        activeClass="active-tab"
                        // onSelect={ (tabName) => wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType( tabName.charAt(0).toUpperCase() + tabName.slice(1) ) }
                        tabs={ [
                            {
                                name: 'mobile',
                                title: 'Mobile (all)',
                                className: 'tab-one',
                            },
                            {
                                name: 'tablet',
                                title: 'Tablet',
                                className: 'tab-two',
                            },
                            {
                                name: 'desktop',
                                title: 'Desktop',
                                className: 'tab-three',
                            }
                        ] }
                    >
                        { ( tab ) => 
                            <>
                            <RangeControl
                                label="All"
                                value={ this.state.margin[tab.name].all }
                                onChange={ ( value ) => {
                                    this.setMargin('all', tab.name, value);
                                } }
                                min={ 0 }
                                max={ 5 }
                            />
                            <HorizontalRule />
                            <div className="child-range-control">
                                <RangeControl
                                    label="Y"
                                    value={ this.state.margin[tab.name].y }
                                    onChange={ ( value ) => {
                                        this.setMargin('y', tab.name, value);
                                    } }
                                    min={ 0 }
                                    max={ 5 }
                                />
                                <div className="child-range-control">
                                    <RangeControl
                                        label="Top"
                                        value={ this.state.margin[tab.name].top }
                                        onChange={ ( value ) =>
                                            this.setMargin('top', tab.name, value)
                                        }
                                        min={ 0 }
                                        max={ 5 }
                                    />
                                    <RangeControl
                                        label="Bottom"
                                        value={ this.state.margin[tab.name].bottom }
                                        onChange={ ( value ) =>
                                            this.setMargin('bottom', tab.name, value)
                                        }
                                        min={ 0 }
                                        max={ 5 }
                                    />
                                </div>
                                <HorizontalRule />
                                <RangeControl
                                    label="X"
                                    value={ this.state.margin[tab.name].x }
                                    onChange={ ( value ) => {
                                        this.setMargin('x', tab.name, value);
                                    } }
                                    min={ 0 }
                                    max={ 5 }
                                />
                                <div className="child-range-control">
                                    <RangeControl
                                        label="Left"
                                        value={ this.state.margin[tab.name].left }
                                        onChange={ ( value ) =>
                                            this.setMargin('left', tab.name, value)
                                        }
                                        min={ 0 }
                                        max={ 5 }
                                    />
                                    <RangeControl
                                        label="Right"
                                        value={ this.state.margin[tab.name].right }
                                        onChange={ ( value ) =>
                                            this.setMargin('right', tab.name, value)
                                        }
                                        min={ 0 }
                                        max={ 5 }
                                    />
                                </div>
                            </div>
                            { this.renderBtnReset( 'margin', tab.name ) }
                            </>
                        }
                    </TabPanel>
                </PanelBody>
            </>
        );
    }

}

export function generateMarginClassName(props) {
    
    var {
        attributes,
        className
    } = props;

    if( typeof className == 'undefined' )
        className = '';

    if( typeof attributes.margin == 'object' ) {
        for( const [key, value] of Object.entries(attributes.margin) ) {
            switch( value ) {
                case 0:
                    className += ' ' + key + '-none';
                    break;
                case 1:
                    className += ' ' + key + '-smaller';
                    break;
                case 2:
                    className += ' ' + key + '-small';
                    break;
                case 3:
                    className += ' ' + key + '-medium';
                    break;
                case 4:
                    className += ' ' + key + '-big';
                    break;
                case 5:
                    className += ' ' + key + '-bigger';
                    break;
            }
        }
    }

    return ( className != '' ) ? className : false;
}