import '../css/admin/editor.scss'

import componentBlockMaster     from '../../blocks/component-block-master/src/index'
import layoutColumn             from '../../blocks/layout/wpe-column/src/index'
import layoutContainer          from '../../blocks/layout/wpe-container/src/index'
import layoutGallery            from '../../blocks/layout/wpe-gallery/src/index'
import layoutGrid               from '../../blocks/layout/wpe-grid/src/index'
import layoutSlide              from '../../blocks/layout/wpe-slide/src/index'
import layoutSlider             from '../../blocks/layout/wpe-slider/src/index'


import { Component, createElement } from '@wordpress/element';

class TestModal extends Component {

	constructor() {
        super( ...arguments );
    }

    render() {
        return <div className='test-modal'></div>
    }
}

window.onload = (event) => {
    const editor = document.getElementsByClassName('edit-post-visual-editor')[0];
    let editZone = document.createElement("div");
    editZone.setAttribute("id", "editZone");
    editor.append(editZone);
};