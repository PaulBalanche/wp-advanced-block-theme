import '../css/admin/editor.scss'

import componentBlockMaster     from '../../blocks/component-block-master/src/index'
import layoutColumn             from '../../blocks/layout/wpe-column/src/index'
import layoutContainer          from '../../blocks/layout/wpe-container/src/index'
import layoutGallery            from '../../blocks/layout/wpe-gallery/src/index'
import layoutGrid               from '../../blocks/layout/wpe-grid/src/index'
import layoutSlide              from '../../blocks/layout/wpe-slide/src/index'
import layoutSlider             from '../../blocks/layout/wpe-slider/src/index'

window.onload = (event) => {

    const componentEditZone = document.createElement("div");
    componentEditZone.setAttribute("id", "abt-component-edit-zone");
    componentEditZone.setAttribute("class", "hide");
    // const componentEditZoneInner = document.createElement("div");
    // componentEditZoneInner.setAttribute("id", "abt-component-edit-zone__inner");
    // componentEditZone.appendChild(componentEditZoneInner);

    document.getElementsByClassName('interface-interface-skeleton__body')[0].appendChild(componentEditZone);

    // Array.prototype.forEach.call( document.getElementsByClassName('abtButtonEditZone') , function(el) {
    //     el.style.display = 'inline-block';
    // });

};