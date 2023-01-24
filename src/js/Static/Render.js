import {
    Panel,
    PanelBody,
    TabPanel
} from '@wordpress/components';

export class Render {

    static tabPanelComponent( id, tabs, inner, initialTabName = null  ) {
    
        return <TabPanel
            key={ id + "-tabPanel" }
            className="tab-panel-wpe-component"
            activeClass="active-tab"
            initialTabName={ initialTabName }
            tabs={ tabs }
        >{ inner }</TabPanel>;
    }

    static panelComponent( id, label, inner, initialOpen = false ) {
    
        return (
            <Panel
                key={ id + "-panel" }
            >
                <PanelBody
                    key={ id + "-PanelBody" }
                    title={ label }
                    initialOpen={ initialOpen }
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
                        </div>
                    </div>
                </PanelBody>
            </Panel>
        );
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

}