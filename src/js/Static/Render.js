import {
    Panel,
    PanelBody,
    TabPanel,
    Button,
    Dashicon
} from '@wordpress/components';

export class Render {

    static tabPanelComponent( id, tabs, inner, initialTabName = null, onSelect = null ) {

        return <TabPanel
            key={ id + "-tabPanel" }
            className="tab-panel-wpe-component"
            activeClass="active-tab"
            initialTabName={ initialTabName }
            tabs={ tabs }
            onSelect={ onSelect }
        >{ inner }</TabPanel>;
    }

    static panelComponent( id, label, inner, initialOpen = false ) {
    
        return <Panel
            key={ id + "-panel" }
        >
            { this.panelBodyComponent(id, label, inner, initialOpen ) }
        </Panel>
    }

    static panelBodyComponent( id, label, inner, initialOpen = false, removeButton = null ) {

        return <PanelBody
            key={ id + "-PanelBody" }
            title={ label }
            initialOpen={ initialOpen }
            className={ removeButton != null  ? 'repeatableItem' : false }
        >
            <div
                key={ id + "-panelBodyDivObject" }
                className="objectField components-base-control"
            >
                <div
                    key={ id + "-panelBodySubDivObject" }
                    className="objectField-content"
                > 
                    { inner }
                    { removeButton }
                </div>
            </div>
        </PanelBody>
    }

    static fieldContainer( id, inner, extraClass = '' ) {

        const className = "basicField" + ( extraClass != '' ? " " + extraClass : "");
        return <div
            key={ id + "-basicContainer"}
            className={ className }
        >
            { inner }
        </div>
    }

    static label( id, inner, extraClass = '' ) {

        const className = "components-base-control__label" + ( extraClass != '' ? " " + extraClass : "");
        return <div
            key={ id + "-label" }
            className={ className }
        >
            { inner }
        </div>
    }

    static buttonAddRepeatableElt( id, onclick ) {
        
        return <Button
            key={ id + "-repeatableAddElt" }
            className="repeatableAddElt"
            onMouseDown={onclick}
            variant="secondary"
        ><Dashicon icon="insert" /> Add</Button>
    }

    static buttonRemoveRepeatableElt( id, onclick ) {
        
        return <Button
            key={ id + "-repeatableRemoveElt" }
            className="repeatableRemoveElt"
            onMouseDown={onclick}
            variant="secondary"
            isSmall
        >
            <Dashicon icon="no-alt" /> Remove
        </Button>
    }
}