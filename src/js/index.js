import '../css/admin/editor.scss'

import componentBlockMaster     from '../../blocks/component-block-master/src/index'
import layoutColumn             from '../../blocks/layout/wpe-column/src/index'
import layoutContainer          from '../../blocks/layout/wpe-container/src/index'
import layoutGallery            from '../../blocks/layout/wpe-gallery/src/index'
import layoutGrid               from '../../blocks/layout/wpe-grid/src/index'
import layoutSlide              from '../../blocks/layout/wpe-slide/src/index'
import layoutSlider             from '../../blocks/layout/wpe-slider/src/index'

import { Devices } from './Devices';
import {
    PanelBody,
    Button,
    ButtonGroup,
    RangeControl
} from '@wordpress/components';


window.addEventListener('load', () => {
    
    // Component edit zone
    const componentEditZone = document.createElement("div");
    componentEditZone.setAttribute("id", "abt-component-edit-zone");
    componentEditZone.setAttribute("class", "hide");
    document.querySelector('.interface-interface-skeleton__body').appendChild(componentEditZone);
});