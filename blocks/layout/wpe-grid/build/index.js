/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/icon/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/icon/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */

/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps} props icon is the SVG component to render
 *                          size is a number specifiying the icon size in pixels
 *                          Other props will be passed to wrapped SVG component
 *
 * @return {JSX.Element}  Icon component
 */

function Icon(_ref) {
  var icon = _ref.icon,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 24 : _ref$size,
      props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["icon", "size"]);

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.cloneElement)(icon, _objectSpread({
    width: size,
    height: size
  }, props));
}

/* harmony default export */ __webpack_exports__["default"] = (Icon);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../component-block-master/src/_marginControls.js":
/*!***********************************************************!*\
  !*** ../../component-block-master/src/_marginControls.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MarginControls": function() { return /* binding */ MarginControls; },
/* harmony export */   "generateMarginClassName": function() { return /* binding */ generateMarginClassName; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var merge_anything__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! merge-anything */ "../../component-block-master/node_modules/merge-anything/dist/index.es.js");
/* harmony import */ var _js_devices_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../js/devices.js */ "../../../js/devices.js");





class MarginControls extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(attr) {
    super(...arguments);
    this.parentProps = attr.props;
    this.spacing = attr !== null && attr !== void 0 && attr.margin ? attr.margin : [{
      "label": "1",
      "value": "1"
    }, {
      "label": "2",
      "value": "2"
    }, {
      "label": "3",
      "value": "3"
    }, {
      "label": "4",
      "value": "4"
    }, {
      "label": "5",
      "value": "5"
    }];

    if (!this.parentProps.attributes.hasOwnProperty('padding')) {
      this.parentProps.attributes.padding = {};
    }

    if (!this.parentProps.attributes.hasOwnProperty('margin')) {
      this.parentProps.attributes.margin = {};
    }

    this.state = {
      padding: {},
      margin: {}
    };
    (0,_js_devices_js__WEBPACK_IMPORTED_MODULE_2__.getLayouts)().forEach(layout => {
      this.state.padding[layout.value] = {
        all: undefined,
        top: undefined,
        bottom: undefined,
        left: undefined,
        right: undefined,
        x: undefined,
        y: undefined
      };
      this.state.margin[layout.value] = {
        all: undefined,
        top: undefined,
        bottom: undefined,
        left: undefined,
        right: undefined,
        x: undefined,
        y: undefined
      };
    });
    this.state.padding = (0,merge_anything__WEBPACK_IMPORTED_MODULE_3__.merge)(this.state.padding, this.parentProps.attributes.padding);
    this.state.margin = (0,merge_anything__WEBPACK_IMPORTED_MODULE_3__.merge)(this.state.margin, this.parentProps.attributes.margin);
  } // getPadding( type ) {
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


  getLayouts() {
    return (0,_js_devices_js__WEBPACK_IMPORTED_MODULE_2__.getLayouts)();
  }

  setPadding(type, deviceType, value) {
    const newPadding = (0,merge_anything__WEBPACK_IMPORTED_MODULE_3__.merge)(this.state.padding, {
      [deviceType]: {
        [type]: value
      }
    });
    this.setState({
      padding: newPadding
    });
    this.parentProps.setAttributes({
      padding: newPadding
    });
  }

  setMargin(type, deviceType, value) {
    const newMargin = (0,merge_anything__WEBPACK_IMPORTED_MODULE_3__.merge)(this.state.margin, {
      [deviceType]: {
        [type]: value
      }
    });
    this.setState({
      margin: newMargin
    });
    this.parentProps.setAttributes({
      margin: newMargin
    });
  }

  resetPadding(deviceType) {
    let newPadding = {};
    (0,_js_devices_js__WEBPACK_IMPORTED_MODULE_2__.getLayouts)().forEach(layout => {
      newPadding[layout.value] = deviceType == layout.value ? {} : this.state.padding[layout.value];
    });
    this.setState({
      padding: newPadding
    });
    this.parentProps.setAttributes({
      padding: newPadding
    });
  }

  resetMargin(deviceType) {
    let newMargin = {};
    (0,_js_devices_js__WEBPACK_IMPORTED_MODULE_2__.getLayouts)().forEach(layout => {
      newMargin[layout.value] = deviceType == layout.value ? {} : this.state.margin[layout.value];
    });
    this.setState({
      margin: newMargin
    });
    this.parentProps.setAttributes({
      margin: newMargin
    });
  }

  renderBtnReset(property, deviceType) {
    var propertyToTreat = property == 'padding' ? this.state.padding : this.state.margin;
    var btnResetPadding = [];

    if (typeof propertyToTreat[deviceType] == 'object' && Object.keys(propertyToTreat).length > 0) {
      for (const [key, value] of Object.entries(propertyToTreat[deviceType])) {
        if (typeof value != 'undefined') {
          btnResetPadding.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            key: "containerReset-" + property + "-" + deviceType + "-" + this.parentProps.clientId
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.HorizontalRule, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            variant: "secondary",
            className: "is-secondary",
            onClick: () => {
              if (property == 'padding') {
                this.resetPadding(deviceType);
              } else {
                this.resetMargin(deviceType);
              }
            }
          }, "Reset ", deviceType)));
          break;
        }
      }
    }

    return btnResetPadding;
  }

  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: 'Padding',
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
      className: "padding-tab-panel",
      activeClass: "active-tab",
      initialTabName: (0,_js_devices_js__WEBPACK_IMPORTED_MODULE_2__.getBodyDevice)(),
      tabs: (0,_js_devices_js__WEBPACK_IMPORTED_MODULE_2__.getLayouts)().map(layout => {
        return {
          name: layout.value,
          title: layout.label,
          className: 'tab-' + layout.value
        };
      })
    }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "All",
      value: this.state.padding[tab.name].all,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => {
        this.setPadding('all', tab.name, value);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.HorizontalRule, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Padding Y",
      value: this.state.padding[tab.name].y,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => {
        this.setPadding('y', tab.name, value);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Top",
      value: this.state.padding[tab.name].top,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => this.setPadding('top', tab.name, value)
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Bottom",
      value: this.state.padding[tab.name].bottom,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => this.setPadding('bottom', tab.name, value)
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.HorizontalRule, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "X",
      value: this.state.padding[tab.name].x,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => {
        this.setPadding('x', tab.name, value);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Left",
      value: this.state.padding[tab.name].left,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => this.setPadding('left', tab.name, value)
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Right",
      value: this.state.padding[tab.name].right,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => this.setPadding('right', tab.name, value)
    }))), this.renderBtnReset('padding', tab.name)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: 'Margin',
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
      className: "margin-tab-panel",
      activeClass: "active-tab",
      initialTabName: (0,_js_devices_js__WEBPACK_IMPORTED_MODULE_2__.getBodyDevice)(),
      tabs: (0,_js_devices_js__WEBPACK_IMPORTED_MODULE_2__.getLayouts)().map(layout => {
        return {
          name: layout.value,
          title: layout.label,
          className: 'tab-' + layout.value
        };
      })
    }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "All",
      value: this.state.margin[tab.name].all,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => {
        this.setMargin('all', tab.name, value);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.HorizontalRule, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Y",
      value: this.state.margin[tab.name].y,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => {
        this.setMargin('y', tab.name, value);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Top",
      value: this.state.margin[tab.name].top,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => this.setMargin('top', tab.name, value)
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Bottom",
      value: this.state.margin[tab.name].bottom,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => this.setMargin('bottom', tab.name, value)
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.HorizontalRule, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "X",
      value: this.state.margin[tab.name].x,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => {
        this.setMargin('x', tab.name, value);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Left",
      value: this.state.margin[tab.name].left,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => this.setMargin('left', tab.name, value)
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Right",
      value: this.state.margin[tab.name].right,
      options: [{
        label: 'Default',
        value: ''
      }].concat(this.spacing),
      onChange: value => this.setMargin('right', tab.name, value)
    }))), this.renderBtnReset('margin', tab.name)))));
  }

}
function generateMarginClassName(props) {
  var {
    attributes,
    className
  } = props;
  if (typeof className == 'undefined') className = '';

  if (typeof attributes.margin == 'object') {
    for (const [key, value] of Object.entries(attributes.margin)) {
      switch (value) {
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

  return className != '' ? className : false;
}

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _component_block_master_src_marginControls_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../component-block-master/src/_marginControls.js */ "../../component-block-master/src/_marginControls.js");
/* harmony import */ var _js_devices__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../js/devices */ "../../../js/devices.js");
/* harmony import */ var _js_attributes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../js/attributes */ "../../../js/attributes.js");


/**
 * WordPress dependencies
 */










/**
 * Add some columns in wpe-container based on variation selected
 *
 */

function createBlocksFromInnerBlocksTemplate(innerBlocksTemplate) {
  return (0,lodash__WEBPACK_IMPORTED_MODULE_6__.map)(innerBlocksTemplate, _ref => {
    let {
      name,
      attributes
    } = _ref;
    return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.createBlock)(name, attributes);
  });
}
/**
 * registerBlockType edit function
 */


class WpeGrid extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.state = {
      configMode: 1
    };
  }

  componentDidUpdate() {
    (0,_js_devices__WEBPACK_IMPORTED_MODULE_8__.initContainer)();
  }

  render() {
    var {
      block_spec,
      theme_spec,
      attributes,
      setAttributes,
      clientId,
      inner_blocks,
      innerBlocksProps,
      countColumns,
      blockVariations,
      blockType,
      experimentalDeviceType,
      isSelectedBlock,
      isParentOfSelectedBlock,
      replaceInnerBlocks
    } = this.props;
    /**
     * Define innerBlocks
     */

    if (typeof inner_blocks != 'object' || typeof inner_blocks == 'object' && countColumns == 0) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", innerBlocksProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.__experimentalBlockVariationPicker, {
        icon: (0,lodash__WEBPACK_IMPORTED_MODULE_6__.get)(blockType, ['icon', 'src']),
        label: (0,lodash__WEBPACK_IMPORTED_MODULE_6__.get)(blockType, ['title']),
        variations: blockVariations,
        onSelect: nextVariation => {
          if (nextVariation.innerBlocks) {
            replaceInnerBlocks(clientId, createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks), false);
          }

          if (nextVariation.attributes) {
            (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)('core/block-editor').updateBlockAttributes(clientId, nextVariation.attributes);
          }
        }
      }));
    } else {
      /**
       * Add or remove columns
       * 
       */
      if (attributes.gridCountColumns > countColumns) {
        // Define rowStart fo the new colums added
        let initLayout = {};
        (0,_js_devices__WEBPACK_IMPORTED_MODULE_8__.getLayouts)().forEach(layout => {
          initLayout[layout.value] = {
            columnStart: 1,
            width: 1,
            rowStart: 2,
            height: 1
          };
          inner_blocks.forEach(element => {
            if (element.attributes.layout && element.attributes.layout[layout.value]) {
              let currentRowStart = element.attributes.layout[layout.value].rowStart && element.attributes.layout[layout.value].rowStart ? element.attributes.layout[layout.value].rowStart : 1;
              let currentHeight = element.attributes.layout[layout.value].height && element.attributes.layout[layout.value].height ? element.attributes.layout[layout.value].height : 1;
              let currentRowEnd = currentRowStart + currentHeight;

              if (currentRowEnd > initLayout[layout.value].rowStart) {
                initLayout[layout.value].rowStart = currentRowEnd;
              }
            }
          });
        });
        let numberOfColumnsToAdd = attributes.gridCountColumns - countColumns;
        let inner_blocks_new = [...inner_blocks, ...(0,lodash__WEBPACK_IMPORTED_MODULE_6__.times)(numberOfColumnsToAdd, () => {
          return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.createBlock)('custom/wpe-column', {
            layout: initLayout
          });
        })];
        replaceInnerBlocks(clientId, inner_blocks_new, false);
      } else if (attributes.gridCountColumns < countColumns) {
        let inner_blocks_new = inner_blocks.slice(0, attributes.gridCountColumns);
        replaceInnerBlocks(clientId, inner_blocks_new, false);
      }

      let deviceButtonGroupClassName = isSelectedBlock || isParentOfSelectedBlock ? ' is-selected' : '';
      /**
       * Custom layout props
       * 
       */

      let configuration = null;

      if (typeof block_spec.props == 'object') {
        let InspectorControlsCustomProps = [];

        for (const [key, value] of Object.entries(block_spec.props)) {
          if (typeof value != 'object' || value == null) continue;
          InspectorControlsCustomProps.push((0,_js_attributes__WEBPACK_IMPORTED_MODULE_9__.renderControl)(value, [key], {
            [key]: attributes[key]
          }, clientId));
        }

        if (InspectorControlsCustomProps.length > 0) {
          configuration = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Placeholder, {
            key: clientId + "-placeholder",
            label: "Grid configuration",
            isColumnLayout: true,
            className: "wpe-component_edit_placeholder"
          }, InspectorControlsCustomProps);
        }
      }

      const buttonGroup = configuration != null ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "buttonGroupComponentModeContainer"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, {
        key: clientId + "-buttonGroupComponentMode"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        key: clientId + "-buttonConfigMode1",
        isPressed: this.state.configMode == 1,
        onClick: () => {
          this.setState({
            configMode: 1
          });
        }
      }, "Actual content"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        key: clientId + "-buttonConfigMode3",
        isPressed: this.state.configMode == 3,
        onClick: () => {
          this.setState({
            configMode: 3
          });
        }
      }, "Edit"))) : null;
      const EditDisplay = configuration != null && this.state.configMode == 3 ? configuration : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "deviceButtonGroup" + deviceButtonGroupClassName
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, null, (0,_js_devices__WEBPACK_IMPORTED_MODULE_8__.getLayouts)().map(layout => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
          key: "layoutButton_" + layout.value + "_" + clientId,
          isPressed: (0,_js_devices__WEBPACK_IMPORTED_MODULE_8__.getBodyDevice)() == layout.value,
          onClick: () => {
            (0,_js_devices__WEBPACK_IMPORTED_MODULE_8__.setBodyDevice)(layout.value);
            inner_blocks.forEach(elt => {
              (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)('core/block-editor').updateBlockAttributes(elt.clientId, {
                updated: true
              });
            });
          }
        }, layout.value);
      }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", innerBlocksProps));
      /**
       * Render edit
       */

      var editDisplay = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, buttonGroup, EditDisplay);
    } // InspectorControls


    let inspectorControls = '';

    if (!attributes.gridLocked) {
      inspectorControls = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
        label: "Number of cells",
        value: attributes.gridCountColumns,
        onChange: value => setAttributes({
          gridCountColumns: value
        }),
        min: 1,
        max: attributes.gridCountColumns + 1
      })));
    }
    /**
     * Render
     * 
     */


    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, inspectorControls, editDisplay);
  }

}

/* harmony default export */ __webpack_exports__["default"] = ((block_spec, theme_spec) => (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.compose)([(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.withSelect)((select, props) => {
  const {
    __experimentalGetPreviewDeviceType
  } = select('core/edit-post');
  return {
    block_spec,
    theme_spec,
    backgroundData: !props.attributes.backgroundFile ? null : select('core').getEntityRecord('postType', 'attachment', props.attributes.backgroundFile),
    inner_blocks: select('core/block-editor').getBlocks(props.clientId),
    innerBlocksProps: (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useInnerBlocksProps)((0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: ''
    }), {
      renderAppender: false
    }),
    countColumns: select('core/block-editor').getBlockCount(props.clientId),
    blockVariations: select('core/blocks').getBlockVariations(props.name, 'block'),
    blockType: select('core/blocks').getBlockType(props.name),
    experimentalDeviceType: __experimentalGetPreviewDeviceType(),
    isSelectedBlock: select('core/block-editor').isBlockSelected(props.clientId),
    isParentOfSelectedBlock: select('core/block-editor').hasSelectedInnerBlock(props.clientId, true)
  };
}), (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.withDispatch)(dispatch => {
  const {
    replaceInnerBlocks
  } = dispatch(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
  return {
    replaceInnerBlocks
  };
})])(WpeGrid));

/***/ }),

/***/ "./src/icons.js":
/*!**********************!*\
  !*** ./src/icons.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "column1": function() { return /* binding */ column1; },
/* harmony export */   "columns2": function() { return /* binding */ columns2; },
/* harmony export */   "columns2bis": function() { return /* binding */ columns2bis; },
/* harmony export */   "columns2ter": function() { return /* binding */ columns2ter; },
/* harmony export */   "columns3": function() { return /* binding */ columns3; },
/* harmony export */   "columns4": function() { return /* binding */ columns4; },
/* harmony export */   "columns6": function() { return /* binding */ columns6; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const column1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "205",
  height: "100",
  viewBox: "0 0 205 100",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  width: "205",
  height: "100",
  fill: "#007CBA"
}));
const columns2 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "205",
  height: "100",
  viewBox: "0 0 205 100",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  width: "97",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "108",
  width: "97",
  height: "100",
  fill: "#007CBA"
}));
const columns2bis = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "205",
  height: "100",
  viewBox: "0 0 205 100",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  width: "56",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "68",
  width: "137",
  height: "100",
  fill: "#007CBA"
}));
const columns2ter = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "205",
  height: "100",
  viewBox: "0 0 205 100",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  width: "137",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "149",
  width: "56",
  height: "100",
  fill: "#007CBA"
}));
const columns3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "205",
  height: "100",
  viewBox: "0 0 205 100",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  width: "61",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "72",
  width: "61",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "144",
  width: "61",
  height: "100",
  fill: "#007CBA"
}));
const columns4 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "205",
  height: "100",
  viewBox: "0 0 205 100",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  width: "43",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "162",
  width: "43",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "108",
  width: "43",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "54",
  width: "43",
  height: "100",
  fill: "#007CBA"
}));
const columns6 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "205",
  height: "100",
  viewBox: "0 0 205 100",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  width: "25",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "72",
  width: "25",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "108",
  width: "25",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "144",
  width: "25",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "180",
  width: "25",
  height: "100",
  fill: "#007CBA"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "36",
  width: "25",
  height: "100",
  fill: "#007CBA"
}));


/***/ }),

/***/ "../../../js/attributes.js":
/*!*********************************!*\
  !*** ../../../js/attributes.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileSizeFormat": function() { return /* binding */ fileSizeFormat; },
/* harmony export */   "recursiveUpdateObjectFromObject": function() { return /* binding */ recursiveUpdateObjectFromObject; },
/* harmony export */   "removeEltRepeatable": function() { return /* binding */ removeEltRepeatable; },
/* harmony export */   "renderControl": function() { return /* binding */ renderControl; },
/* harmony export */   "renderPanelComponent": function() { return /* binding */ renderPanelComponent; },
/* harmony export */   "renderTabPanelComponent": function() { return /* binding */ renderTabPanelComponent; },
/* harmony export */   "returnStringOrNumber": function() { return /* binding */ returnStringOrNumber; },
/* harmony export */   "setAttributes": function() { return /* binding */ setAttributes; },
/* harmony export */   "updateAttributes": function() { return /* binding */ updateAttributes; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./devices */ "../../../js/devices.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controls */ "../../../js/controls.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);





function returnStringOrNumber(value) {
  let isNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return !!isNumber ? parseInt(value, 10) : value;
}

function addEltToRepeatable(arrayKey, currentValueProp, currentValueRepeatableField) {
  let isNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let clientId = arguments.length > 4 ? arguments[4] : undefined;
  updateAttributes(arrayKey, currentValueProp, currentValueRepeatableField.concat(""), isNumber, clientId);
}

function removeEltRepeatable(arrayKey, currentValueProp) {
  updateAttributes(arrayKey, currentValueProp, false, false, clientId);
}
function fileSizeFormat(filesizeInBytes) {
  if (filesizeInBytes > 1000000) return Math.round(filesizeInBytes / 10000) / 100 + " Mo";else return Math.round(filesizeInBytes / 1000) + " Ko";
}
function setAttributes(attributes, clientId) {
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core/block-editor').updateBlockAttributes(clientId, attributes);
}
function updateAttributes(arrayKey, currentValue, newValue) {
  let isNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let clientId = arguments.length > 4 ? arguments[4] : undefined;
  let keyToUpdate = arrayKey[0];
  let newValueToUpdate = recursiveUpdateObjectFromObject(arrayKey, currentValue, newValue, isNumber);
  setAttributes({
    [keyToUpdate]: newValueToUpdate[keyToUpdate]
  }, clientId);
}
function recursiveUpdateObjectFromObject(arrayKey, fromObject, newValue) {
  let isNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  const firstElement = arrayKey.shift();
  if (typeof fromObject != 'object' || Array.isArray(fromObject) && typeof firstElement == 'string' || !Array.isArray(fromObject) && typeof firstElement == 'number') fromObject = typeof firstElement == 'string' ? {} : [];
  let objectReturned = Array.isArray(fromObject) ? [] : {};

  for (const [key, val] of Object.entries(fromObject)) {
    if (key == firstElement) {
      if (arrayKey.length > 0) objectReturned[key] = recursiveUpdateObjectFromObject(arrayKey, val, newValue, isNumber);else if (!!newValue) objectReturned[key] = returnStringOrNumber(newValue, isNumber);
    } else objectReturned[key] = val;
  }

  if (typeof objectReturned[firstElement] == 'undefined') {
    if (arrayKey.length > 0) objectReturned[firstElement] = recursiveUpdateObjectFromObject(arrayKey, undefined, newValue, isNumber);else if (!!newValue) objectReturned[firstElement] = returnStringOrNumber(newValue, isNumber);
  } // Re-index in case of element suppression


  if (arrayKey.length == 0 && !newValue) {
    for (let index = 0; index < objectReturned.length; index++) {
      if (typeof objectReturned[index] == 'undefined') objectReturned.splice(index, 1);
    }
  }

  return objectReturned;
}
function renderControl(prop, keys, valueProp, clientId) {
  prop.type = prop.type.toLowerCase();
  let blocReturned = [];
  let repeatable = typeof prop.repeatable != "undefined" && !!prop.repeatable ? true : false;
  let currentValueAttribute = valueProp;
  keys.forEach(element => {
    if (typeof currentValueAttribute == 'object') {
      if (currentValueAttribute.hasOwnProperty(element) && typeof currentValueAttribute[element] != "undefined") currentValueAttribute = currentValueAttribute[element];else currentValueAttribute = "";
    }
  });
  if (!repeatable) currentValueAttribute = [currentValueAttribute];else if (typeof currentValueAttribute != "object" || currentValueAttribute.length == 0) currentValueAttribute = [""];
  let responsive = typeof prop.responsive != "undefined" && !!prop.responsive ? true : false;

  for (var keyLoop in currentValueAttribute) {
    keyLoop = returnStringOrNumber(keyLoop, true);
    let label = typeof prop.label != "undefined" ? prop.label : typeof prop.title != "undefined" ? prop.title : keys.slice(-1);

    if (repeatable) {
      let index = keyLoop + 1;
      label = label + " " + index + "/" + currentValueAttribute.length;
    }

    let required_field = typeof prop.required != "undefined" && prop.required ? true : false;
    let fieldId = clientId + "-" + keys.join("-") + "-" + keyLoop;

    switch (prop.type) {
      case 'string':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderTextControl)(fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], false, repeatable, required_field, clientId, responsive));
        break;

      case 'number':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderTextControl)(fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], true, repeatable, required_field, clientId));
        break;

      case 'text':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderTextareaControl)(fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;
      // case 'richText':
      // case 'wysiwyg':
      //     blocReturned.push( renderWysiwygControl( fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
      //     break;

      case 'boolean':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderToggleControl)(fieldId, label, prop.help, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;

      case 'select':
      case 'color':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderSelectControl)(fieldId, label, prop.options, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;

      case 'radio':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderRadioControl)(fieldId, label, prop.options, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;

      case 'link':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderLinkControl)(fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;

      case 'relation':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderRelationControl)(fieldId, label, prop.entity, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;

      case 'date':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderDateTimeControl)(fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;

      case 'image':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderImageVideoControl)(prop.type, prop.image && typeof prop.image == 'object' ? prop.image : {}, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId, responsive));
        break;

      case 'video':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderImageVideoControl)(prop.type, prop.video && typeof prop.video == 'object' ? prop.video : {}, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;

      case 'file':
      case 'gallery':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderFileControl)(prop.type, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId, responsive));
        break;

      case 'object':
        if (typeof prop.props == "object") {
          let tempKeyObject = repeatable ? keys.concat(keyLoop) : keys;
          let fieldsetObject = [];

          if (responsive) {
            fieldsetObject.push(renderTabPanelComponent(fieldId, (0,_devices__WEBPACK_IMPORTED_MODULE_2__.getLayouts)().map(layout => {
              return {
                name: layout.value,
                title: layout.label,
                className: 'tab-' + layout.value
              };
            }), function (tab) {
              let tempKeyObjectReponsive = keys.concat(tab.name);
              let fieldsetObjectResponsive = [];

              for (const [keySubProp, valueSubProp] of Object.entries(prop.props)) {
                fieldsetObjectResponsive.push(renderControl(valueSubProp, tempKeyObjectReponsive.concat(keySubProp), valueProp, clientId));
              }

              return fieldsetObjectResponsive;
            }, (0,_devices__WEBPACK_IMPORTED_MODULE_2__.getBodyDevice)()));
          } else {
            for (const [keySubProp, valueSubProp] of Object.entries(prop.props)) {
              fieldsetObject.push(renderControl(valueSubProp, tempKeyObject.concat(keySubProp), valueProp, clientId));
            }
          }

          if (repeatable) {
            label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              key: fieldId + "-repeatableRemoveElt",
              isLink: true,
              className: "removeRepeatable",
              onClick: () => removeEltRepeatable(tempKeyObject, valueProp)
            }, "Remove"));
          }

          blocReturned.push(renderPanelComponent(fieldId, label, fieldsetObject, false));
        }

        break;
    }
  } // Add repeatable button


  if (!!repeatable) {
    blocReturned.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: clientId + "-" + keys.join("-") + "-repeatableAddElt",
      isSecondary: true,
      isSmall: true,
      onClick: () => addEltToRepeatable(keys, valueProp, currentValueAttribute, false, clientId)
    }, "Add"));
    blocReturned = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: clientId + "-" + keys.join("-") + "-repeatableContainer",
      className: "repeatableField components-base-control"
    }, blocReturned);
  } else {
    blocReturned = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: clientId + "-" + keys.join("-") + "-basicContainer",
      className: "basicField"
    }, blocReturned);
  } // Return


  return blocReturned;
}
function renderPanelComponent(id, label, inner) {
  let initialOpen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    key: id + "-panel"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    key: id + "-PanelBody",
    title: label,
    initialOpen: initialOpen
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-panelBodyDivObject",
    className: "objectField components-base-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-panelBodySubDivObject",
    className: "objectField-content"
  }, inner))));
}
function renderTabPanelComponent(id, tabs, inner) {
  let initialTabName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
    key: id + "-tabPanel",
    className: "tab-panel-wpe-component",
    activeClass: "active-tab",
    initialTabName: initialTabName,
    tabs: tabs
  }, inner);
}

/***/ }),

/***/ "../../../js/controls.js":
/*!*******************************!*\
  !*** ../../../js/controls.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderDateTimeControl": function() { return /* binding */ renderDateTimeControl; },
/* harmony export */   "renderFileControl": function() { return /* binding */ renderFileControl; },
/* harmony export */   "renderImageVideoControl": function() { return /* binding */ renderImageVideoControl; },
/* harmony export */   "renderLinkControl": function() { return /* binding */ renderLinkControl; },
/* harmony export */   "renderRadioControl": function() { return /* binding */ renderRadioControl; },
/* harmony export */   "renderRelationControl": function() { return /* binding */ renderRelationControl; },
/* harmony export */   "renderSelectControl": function() { return /* binding */ renderSelectControl; },
/* harmony export */   "renderTextControl": function() { return /* binding */ renderTextControl; },
/* harmony export */   "renderTextareaControl": function() { return /* binding */ renderTextareaControl; },
/* harmony export */   "renderToggleControl": function() { return /* binding */ renderToggleControl; }
/* harmony export */ });
/* harmony import */ var _controls_DateTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controls/DateTime */ "../../../js/controls/DateTime.js");
/* harmony import */ var _controls_File__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controls/File */ "../../../js/controls/File.js");
/* harmony import */ var _controls_ImageVideo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls/ImageVideo */ "../../../js/controls/ImageVideo.js");
/* harmony import */ var _controls_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controls/Link */ "../../../js/controls/Link.js");
/* harmony import */ var _controls_Radio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controls/Radio */ "../../../js/controls/Radio.js");
/* harmony import */ var _controls_Relation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controls/Relation */ "../../../js/controls/Relation.js");
/* harmony import */ var _controls_Select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controls/Select */ "../../../js/controls/Select.js");
/* harmony import */ var _controls_Text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controls/Text */ "../../../js/controls/Text.js");
/* harmony import */ var _controls_Textarea__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controls/Textarea */ "../../../js/controls/Textarea.js");
/* harmony import */ var _controls_Toggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./controls/Toggle */ "../../../js/controls/Toggle.js");

function renderDateTimeControl(id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let clientId = arguments.length > 7 ? arguments[7] : undefined;
  return (0,_controls_DateTime__WEBPACK_IMPORTED_MODULE_0__.renderDateTime)(id, label, keys, valueProp, objectValue, repeatable, required, clientId);
}

function renderFileControl(type, id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  let responsive = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
  return (0,_controls_File__WEBPACK_IMPORTED_MODULE_1__.renderFile)(type, id, label, keys, valueProp, objectValue, repeatable, required, clientId, responsive);
}

function renderImageVideoControl(type, args, id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let required = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  let clientId = arguments.length > 9 ? arguments[9] : undefined;
  let responsive = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
  return (0,_controls_ImageVideo__WEBPACK_IMPORTED_MODULE_2__.renderImageVideo)(type, args, id, label, keys, valueProp, objectValue, repeatable, required, clientId, responsive);
}

function renderLinkControl(id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let clientId = arguments.length > 7 ? arguments[7] : undefined;
  return (0,_controls_Link__WEBPACK_IMPORTED_MODULE_3__.renderLink)(id, label, keys, valueProp, objectValue, repeatable, required, clientId);
}

function renderRadioControl(id, label, options, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  return (0,_controls_Radio__WEBPACK_IMPORTED_MODULE_4__.renderRadio)(id, label, options, keys, valueProp, objectValue, repeatable, required, clientId);
}

function renderRelationControl(id, label, entity, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  return (0,_controls_Relation__WEBPACK_IMPORTED_MODULE_5__.renderRelation)(id, label, entity, keys, valueProp, objectValue, repeatable, required, clientId);
}

function renderSelectControl(id, label, options, keys, valueProp, attributeValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  return (0,_controls_Select__WEBPACK_IMPORTED_MODULE_6__.renderSelect)(id, label, options, keys, valueProp, attributeValue, repeatable, required, clientId);
}

function renderTextControl(id, label, keys, valueProp, objectValue) {
  let isNumber = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  let responsive = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
  return (0,_controls_Text__WEBPACK_IMPORTED_MODULE_7__.renderText)(id, label, keys, valueProp, objectValue, isNumber, repeatable, required, clientId, responsive);
}

function renderTextareaControl(id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let clientId = arguments.length > 7 ? arguments[7] : undefined;
  return (0,_controls_Textarea__WEBPACK_IMPORTED_MODULE_8__.renderTextarea)(id, label, keys, valueProp, objectValue, repeatable, required, clientId);
}

function renderToggleControl(id, label, help, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  return (0,_controls_Toggle__WEBPACK_IMPORTED_MODULE_9__.renderToggle)(id, label, help, keys, valueProp, objectValue, repeatable, required, clientId);
} // import { renderWysiwyg } from './controls/Wysiwyg';
// export function renderWysiwygControl( id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
//     return renderWysiwyg( id, label, keys, valueProp, objectValue, repeatable, required, clientId );
// }

/***/ }),

/***/ "../../../js/controls/DateTime.js":
/*!****************************************!*\
  !*** ../../../js/controls/DateTime.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderDateTime": function() { return /* binding */ renderDateTime; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


function renderDateTime(id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let clientId = arguments.length > 7 ? arguments[7] : undefined;
  label = required ? label + '*' : label;

  if (repeatable) {
    label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: id + "-repeatableRemoveElt",
      isLink: true,
      className: "removeRepeatable",
      onClick: () => removeEltRepeatable(keys, valueProp)
    }, "Remove"));
  }

  const MyDateTimePicker = withState({
    date: objectValue ? objectValue : new Date()
  })(_ref => {
    let {
      date,
      setState
    } = _ref;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.DateTimePicker, {
      key: id,
      currentDate: date,
      onChange: newDate => {
        setState({
          date: newDate
        });
        updateAttributes(keys, valueProp, newDate, false, clientId);
      },
      is12Hour: false
    });
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-dateTimeContainer",
    className: "dateTime-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control__label",
    key: id + "-label"
  }, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyDateTimePicker, null));
}

/***/ }),

/***/ "../../../js/controls/File.js":
/*!************************************!*\
  !*** ../../../js/controls/File.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderFile": function() { return /* binding */ renderFile; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../attributes */ "../../../js/attributes.js");




function renderFile(type, id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  let responsive = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
  label = label && required ? label + '*' : label;
  let preview = false;

  if (objectValue && typeof objectValue == 'object') {
    switch (type) {
      case "image":
        preview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          key: id + "-imagePreview",
          alt: "Edit image",
          title: "Edit image",
          className: "edit-image-preview",
          src: objectValue.preview
        });
        break;

      case "video":
        preview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          key: id + "-filePreview",
          alt: "Edit file",
          title: "Edit file",
          className: "edit-file-preview",
          src: objectValue.preview
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: id + "-fileDetails",
          className: "file-details"
        }, objectValue.name, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), objectValue.mime, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.fileSizeFormat)(objectValue.size)));
        break;

      case "file":
        preview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          key: id + "-filePreview",
          alt: "Edit file",
          title: "Edit file",
          className: "edit-file-preview",
          src: objectValue.preview
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: id + "-fileDetails",
          className: "file-details"
        }, objectValue.name, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), objectValue.mime, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.fileSizeFormat)(objectValue.size)));
        break;

      case "gallery":
        preview = [];
        objectValue.forEach(image => {
          preview.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            key: id + "-galleryImageContainerLi" + image.id,
            className: "blocks-gallery-item"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
            key: id + "-galleryImage_" + image.id,
            src: image.preview
          })));
        });
        let columns = objectValue.length > 5 ? 5 : objectValue.length;
        preview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", {
          key: id + "-galleryImagefigure",
          className: "wp-block-gallery columns-" + columns
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
          key: id + "-galleryImageContainerUl",
          className: "blocks-gallery-grid"
        }, preview));
        break;
    }

    preview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: id + "-mediaPreviewContainer",
      className: "media-preview-container"
    }, preview, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      key: id + "-removeMedia",
      isSecondary: true,
      isSmall: true,
      className: "reset-button",
      onClick: () => {
        if (type == "gallery" && objectValue.length > 1) (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.setAttributes)({
          [keys]: objectValue.slice(0, objectValue.length - 1)
        }, clientId);else if (repeatable) (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.removeEltRepeatable)(keys, valueProp);else (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.setAttributes)({
          [keys]: undefined
        }, clientId);
      }
    }, "Remove"));
  }

  let inner = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-MediaPlaceholderBasicContainer",
    className: "basicField"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaPlaceholder, {
    key: id,
    onSelect: value => {
      let newValue = undefined;

      switch (type) {
        case "image":
          if (typeof value.id != 'undefined') {
            newValue = {
              id: value.id,
              preview: value.url
            };
          }

          break;

        case "video":
          if (typeof value.id != 'undefined') {
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
          if (typeof value.id != 'undefined') {
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
            if (typeof image.id != 'undefined') {
              newValue.push({
                id: image.id,
                preview: image.url
              });
            }
          });
          break;
      }

      if (typeof newValue != 'undefined' && (typeof newValue != 'object' || Object.keys(newValue).length > 0)) (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys, valueProp, newValue, false, clientId);
    },
    multiple: type == 'gallery',
    addToGallery: type == 'gallery' && !!objectValue,
    value: objectValue,
    disableDropZone: true
  }, preview)); // if( responsive ) {
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

  return renderPanelComponent(id, label, inner, false);
}

/***/ }),

/***/ "../../../js/controls/ImageVideo.js":
/*!******************************************!*\
  !*** ../../../js/controls/ImageVideo.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderImageVideo": function() { return /* binding */ renderImageVideo; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../attributes */ "../../../js/attributes.js");
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../devices */ "../../../js/devices.js");





function renderImageVideo(type, args, id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let required = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  let clientId = arguments.length > 9 ? arguments[9] : undefined;
  let responsive = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
  label = label && required ? label + '*' : label;
  let videoControl = [];
  var tabPanelResponsive = []; // Responsive init

  if (!args.responsive || typeof args.responsive != 'object') args.responsive = ['default']; // Remove useless data

  if (typeof objectValue == 'object') {
    for (var i in objectValue) {
      if (!args.responsive.includes(i)) delete objectValue[i];
    }
  } // Loop on each responsive entries


  for (var i in args.responsive) {
    let responsive_id = args.responsive[i];
    let responsiveContent = []; // Update component attribute if empty 

    if (!objectValue[responsive_id]) {
      if (typeof objectValue != 'object') (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys, valueProp, {
        [responsive_id]: {}
      }, false, clientId);else (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys.concat(responsive_id), valueProp, {}, false, clientId);
    }

    if (type == 'image') {
      let preview = false;

      if (objectValue[responsive_id] && typeof objectValue[responsive_id] == 'object' && objectValue[responsive_id].preview) {
        preview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: id + "-mediaPreviewContainer" + responsive_id,
          className: "media-preview-container"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          key: id + "-imagePreview" + responsive_id,
          alt: "Edit image",
          title: "Edit image",
          className: "edit-image-preview",
          src: objectValue[responsive_id].preview
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          key: id + "-removeMedia" + responsive_id,
          isSecondary: true,
          isSmall: true,
          className: "reset-button",
          onClick: () => {
            (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys.concat(responsive_id), valueProp, undefined, false, clientId);
          }
        }, "Remove"));
      } // MediaPlaceholder labels


      let labels = {
        title: responsive_id != 'default' ? label + ' (' + responsive_id + ')' : label
      };

      if (args.instructions && typeof args.instructions == 'object' && args.instructions[responsive_id]) {
        labels.instructions = args.instructions[responsive_id];
      }

      responsiveContent.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: id + "-MediaPlaceholderBasicContainer-" + responsive_id,
        className: "basicField"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaPlaceholder, {
        key: id + "-MediaPlaceholder-" + responsive_id,
        onSelect: value => {
          let newValue = undefined;

          if (typeof value.id != 'undefined') {
            newValue = {
              id: value.id,
              preview: value.url
            };
          }

          if (typeof newValue != 'undefined' && (typeof newValue != 'object' || Object.keys(newValue).length > 0)) (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys.concat(responsive_id), valueProp, newValue, false, clientId);
        },
        value: objectValue[responsive_id] ? objectValue[responsive_id] : false,
        disableDropZone: true,
        labels: labels
      }, preview)));
    } else if (type == 'video') {
      /**
       * Video type
       */
      let options_video_type = [];
      if (args.file) options_video_type.push({
        label: 'File',
        value: 'file'
      });
      if (args.embed) options_video_type.push({
        label: 'Embed',
        value: 'embed'
      });
      let selected_option = objectValue[responsive_id] && objectValue[responsive_id].type ? objectValue[responsive_id].type : args.file ? 'file' : args.embed ? 'embed' : false;
      const VideoRadioControl = withState({
        option: selected_option
      })(_ref => {
        let {
          option,
          setState
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RadioControl, {
          key: id + "-videoType-" + responsive_id,
          label: "Video type",
          selected: option,
          options: options_video_type,
          onChange: newValue => {
            setState({
              newValue
            });
            (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys.concat(responsive_id), valueProp, {
              type: newValue
            }, false, clientId);
          }
        });
      });
      responsiveContent.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: id + "-videoTypeBasicContainer-" + responsive_id,
        className: "basicField"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(VideoRadioControl, null)));
      /**
       * File
       */

      if (selected_option == 'file') {
        let preview = false;

        if (objectValue[responsive_id] && objectValue[responsive_id].file && typeof objectValue[responsive_id].file == 'object') {
          preview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
            key: id + "-filePreview-" + responsive_id,
            alt: "Edit file",
            title: "Edit file",
            className: "edit-file-preview",
            src: objectValue[responsive_id].file.preview
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            key: id + "-fileDetails-" + responsive_id,
            className: "file-details"
          }, objectValue[responsive_id].file.name, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), objectValue[responsive_id].file.mime, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.fileSizeFormat)(objectValue[responsive_id].file.size)));
          preview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            key: id + "-mediaPreviewContainer-" + responsive_id,
            className: "media-preview-container"
          }, preview, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            key: id + "-removeMedia-" + responsive_id,
            isSecondary: true,
            isSmall: true,
            className: "reset-button",
            onClick: () => (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys.concat(responsive_id), valueProp, {
              type: 'file'
            }, false, clientId)
          }, "Remove"));
        }

        responsiveContent.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: id + "-MediaPlaceholderBasicContainer-" + responsive_id,
          className: "basicField"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaPlaceholder, {
          key: id + "-MediaPlaceholder-" + responsive_id,
          onSelect: value => {
            let newValue = undefined;

            if (typeof value.id != 'undefined') {
              newValue = {
                id: value.id,
                preview: value.icon,
                name: value.filename,
                mime: value.mime,
                size: value.filesizeInBytes
              };
            }

            if (typeof newValue != 'undefined' && (typeof newValue != 'object' || Object.keys(newValue).length > 0)) (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys.concat(responsive_id), valueProp, {
              type: 'file',
              file: newValue
            }, false, clientId);
          },
          value: objectValue[responsive_id] && objectValue[responsive_id].file ? objectValue[responsive_id].file : false,
          disableDropZone: true
        }, preview)));
      }
      /**
       * Embed
       */


      if (selected_option == 'embed') {
        responsiveContent.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: id + "-embedLinkBasicContainer-" + responsive_id,
          className: "basicField"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          key: id + "-embedLink",
          label: 'Embed link',
          type: 'text',
          value: objectValue[responsive_id] && objectValue[responsive_id].embed ? objectValue[responsive_id].embed.url : '',
          onChange: newValue => (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys.concat(responsive_id), valueProp, {
            type: 'embed',
            embed: {
              url: newValue
            }
          }, false, clientId)
        })));
      }
    } // Tab panel construction


    tabPanelResponsive.push({
      name: responsive_id,
      title: responsive_id.charAt(0).toUpperCase() + responsive_id.slice(1),
      content: responsiveContent
    });
  } // Render tab if more than 1 content


  if (tabPanelResponsive.length > 1) {
    videoControl.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
      key: id + "-tabPanelVideo",
      className: "tab-panel-wpe-component",
      activeClass: "active-tab",
      tabs: tabPanelResponsive
    }, tabPanelResponsive => tabPanelResponsive.content));
  } else videoControl.push(tabPanelResponsive[0].content); // if( responsive ) {
  //     let newVideoControl = [];
  //     newVideoControl.push(
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
  //                 return videoControl;
  //             },
  //             getBodyDevice()
  //         )
  //     );
  //     videoControl = newVideoControl;
  // }


  return (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.renderPanelComponent)(id, label, videoControl, false);
}

/***/ }),

/***/ "../../../js/controls/Link.js":
/*!************************************!*\
  !*** ../../../js/controls/Link.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderLink": function() { return /* binding */ renderLink; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../attributes */ "../../../js/attributes.js");




function renderLink(id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let clientId = arguments.length > 7 ? arguments[7] : undefined;

  if (typeof objectValue == 'undefined') {
    objectValue = {};
  }

  label = required ? label + '*' : label;

  if (repeatable) {
    label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: id + "-repeatableRemoveElt",
      isLink: true,
      className: "removeRepeatable",
      onClick: () => (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.removeEltRepeatable)(keys, valueProp)
    }, "Remove"));
  }

  let inner = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-LinkControlBasicContainer",
    className: "basicField"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-LinkControlComponentsBaseControl",
    className: "components-base-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-LinkControlComponentsBaseControlField",
    className: "components-base-control__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-LinkControlContainer",
    className: "link-control-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    key: id + "-text",
    label: "Text",
    type: "text",
    value: objectValue.text,
    onChange: newValue => {
      (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys.concat('text'), valueProp, newValue, false, clientId);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.__experimentalLinkControl, {
    key: id + "-LinkControl",
    className: "wp-block-navigation-link__inline-link-input",
    value: objectValue,
    settings: [{
      id: 'url',
      title: 'URL ...'
    }, {
      id: 'opensInNewTab',
      title: 'Open in new tab'
    }],
    onChange: _ref => {
      let {
        url: newURL,
        opensInNewTab: newOpensInNewTab
      } = _ref;
      let newObjectValue = typeof newURL == 'string' ? {
        text: objectValue.text,
        url: newURL,
        opensInNewTab: newOpensInNewTab
      } : {
        text: objectValue.text
      };
      (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.updateAttributes)(keys, valueProp, newObjectValue, false, clientId);
    }
  })))));
  return (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.renderPanelComponent)(id, label, inner, false);
}

/***/ }),

/***/ "../../../js/controls/Radio.js":
/*!*************************************!*\
  !*** ../../../js/controls/Radio.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderRadio": function() { return /* binding */ renderRadio; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../../js/attributes.js");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);




function renderRadio(id, label, options, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  if (typeof options == 'undefined') return null;
  label = required ? label + '*' : label;

  if (repeatable) {
    label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: id + "-repeatableRemoveElt",
      isLink: true,
      className: "removeRepeatable",
      onClick: () => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.removeEltRepeatable)(keys, valueProp)
    }, "Remove"));
  }

  const MyRadioControl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.withState)({
    option: objectValue
  })(_ref => {
    let {
      option,
      setState
    } = _ref;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
      key: id,
      label: label,
      selected: option,
      options: options.map(function (value) {
        return {
          label: value.name,
          value: value.value
        };
      }),
      onChange: newValue => {
        setState({
          newValue
        });
        (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.updateAttributes)(keys, valueProp, newValue, false, clientId);
      }
    });
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-RadioControlComponentsBaseControl",
    className: "components-base-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-RadioControlComponentsBaseControlField",
    className: "components-base-control__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id + "-RadioControlContainer",
    className: "radio-control-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyRadioControl, null))));
}

/***/ }),

/***/ "../../../js/controls/Relation.js":
/*!****************************************!*\
  !*** ../../../js/controls/Relation.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderRelation": function() { return /* binding */ renderRelation; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../../js/attributes.js");



function renderRelation(id, label, entity, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  if (typeof entity == 'undefined' || typeof this.props.relations[entity] == 'undefined' || this.props.relations[entity] == null || Object.keys(this.props.relations[entity]).length == 0) return null;
  label = required ? label + '*' : label;

  if (repeatable) {
    label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: id + "-repeatableRemoveElt",
      isLink: true,
      className: "removeRepeatable",
      onClick: () => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.removeEltRepeatable)(keys, valueProp)
    }, "Remove"));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    key: id,
    label: label,
    value: objectValue,
    options: this.props.relations[entity].map(function (value) {
      return {
        label: value.title.raw,
        value: value.id
      };
    }),
    onChange: newValue => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.updateAttributes)(keys, valueProp, newValue, false, clientId)
  });
}

/***/ }),

/***/ "../../../js/controls/Select.js":
/*!**************************************!*\
  !*** ../../../js/controls/Select.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderSelect": function() { return /* binding */ renderSelect; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../../js/attributes.js");



function renderSelect(id, label, options, keys, valueProp, attributeValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  if (typeof options == 'undefined') return null;
  label = required ? label + '*' : label;

  if (repeatable) {
    label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: id + "-repeatableRemoveElt",
      isLink: true,
      className: "removeRepeatable",
      onClick: () => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.removeEltRepeatable)(keys, valueProp)
    }, "Remove"));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    key: id,
    label: label,
    value: attributeValue,
    options: [{
      label: 'Choose...',
      value: ''
    }].concat(options.map(function (value) {
      return {
        label: value.name,
        value: value.value
      };
    })),
    onChange: newValue => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.updateAttributes)(keys, valueProp, newValue, false, clientId)
  });
}

/***/ }),

/***/ "../../../js/controls/Text.js":
/*!************************************!*\
  !*** ../../../js/controls/Text.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderText": function() { return /* binding */ renderText; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../../js/attributes.js");
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../devices */ "../../../js/devices.js");




function renderText(id, label, keys, valueProp, objectValue) {
  let isNumber = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  let responsive = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
  label = required ? label + '*' : label;

  if (repeatable) {
    label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: id + "-repeatableRemoveElt",
      isLink: true,
      className: "removeRepeatable",
      onClick: () => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.removeEltRepeatable)(keys, valueProp)
    }, "Remove"));
  }

  if (responsive) {
    let newInner = (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.renderTabPanelComponent)(id, (0,_devices__WEBPACK_IMPORTED_MODULE_3__.getLayouts)().map(layout => {
      return {
        name: layout.value,
        title: layout.label,
        className: 'tab-' + layout.value
      };
    }), function (tab) {
      return renderTextControl(id + "-" + tab.name, label, isNumber, typeof objectValue[tab.name] == 'string' ? objectValue[tab.name] : '', keys.concat(tab.name), valueProp, clientId);
    }, (0,_devices__WEBPACK_IMPORTED_MODULE_3__.getBodyDevice)());
    return newInner;
  }

  return renderTextControl(id, label, isNumber, objectValue, keys, valueProp, clientId);
}

function renderTextControl(id, label, isNumber, value, keysToUpdate, valueProp, clientId) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    key: id,
    label: label,
    type: !!isNumber ? "number" : "text",
    value: value,
    onChange: newValue => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.updateAttributes)(keysToUpdate, valueProp, newValue, isNumber, clientId)
  });
}

/***/ }),

/***/ "../../../js/controls/Textarea.js":
/*!****************************************!*\
  !*** ../../../js/controls/Textarea.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderTextarea": function() { return /* binding */ renderTextarea; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../../js/attributes.js");



function renderTextarea(id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let clientId = arguments.length > 7 ? arguments[7] : undefined;
  label = required ? label + '*' : label;

  if (repeatable) {
    label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: id + "-repeatableRemoveElt",
      isLink: true,
      className: "removeRepeatable",
      onClick: () => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.removeEltRepeatable)(keys, valueProp)
    }, "Remove"));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    key: id,
    label: label,
    value: objectValue,
    onChange: newValue => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.updateAttributes)(keys, valueProp, newValue, false, clientId)
  });
}

/***/ }),

/***/ "../../../js/controls/Toggle.js":
/*!**************************************!*\
  !*** ../../../js/controls/Toggle.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderToggle": function() { return /* binding */ renderToggle; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../../js/attributes.js");



function renderToggle(id, label, help, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
  label = required ? label + '*' : label;

  if (repeatable) {
    label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: id + "-repeatableRemoveElt",
      isLink: true,
      className: "removeRepeatable",
      onClick: () => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.removeEltRepeatable)(keys, valueProp)
    }, "Remove"));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    key: id,
    label: label,
    help: typeof help == 'object' && Array.isArray(help) && help.length == 2 ? !!objectValue ? help[1] : help[0] : false,
    checked: objectValue,
    onChange: newValue => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.updateAttributes)(keys, valueProp, newValue, false, clientId)
  });
}

/***/ }),

/***/ "../../../js/devices.js":
/*!******************************!*\
  !*** ../../../js/devices.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBodyDevice": function() { return /* binding */ getBodyDevice; },
/* harmony export */   "getLayouts": function() { return /* binding */ getLayouts; },
/* harmony export */   "initContainer": function() { return /* binding */ initContainer; },
/* harmony export */   "initDevice": function() { return /* binding */ initDevice; },
/* harmony export */   "setBodyDevice": function() { return /* binding */ setBodyDevice; },
/* harmony export */   "setWidthContainer": function() { return /* binding */ setWidthContainer; }
/* harmony export */ });
function initDevice() {
  document.addEventListener("DOMContentLoaded", function (event) {
    var _theme_spec, _theme_spec$media, _theme_spec2, _theme_spec2$layout, _theme_spec2$layout$c;

    if (((_theme_spec = theme_spec) === null || _theme_spec === void 0 ? void 0 : (_theme_spec$media = _theme_spec.media) === null || _theme_spec$media === void 0 ? void 0 : _theme_spec$media.defaultMedia) != 'undefined') {
      setBodyDevice(theme_spec.media.defaultMedia);
    }

    if (((_theme_spec2 = theme_spec) === null || _theme_spec2 === void 0 ? void 0 : (_theme_spec2$layout = _theme_spec2.layout) === null || _theme_spec2$layout === void 0 ? void 0 : (_theme_spec2$layout$c = _theme_spec2$layout.container) === null || _theme_spec2$layout$c === void 0 ? void 0 : _theme_spec2$layout$c.default) != 'undefined') {
      setWidthContainer(theme_spec.layout.container.default);
    }
  });
}
function initContainer() {
  var _theme_spec3, _theme_spec3$layout, _theme_spec3$layout$c;

  if (((_theme_spec3 = theme_spec) === null || _theme_spec3 === void 0 ? void 0 : (_theme_spec3$layout = _theme_spec3.layout) === null || _theme_spec3$layout === void 0 ? void 0 : (_theme_spec3$layout$c = _theme_spec3$layout.container) === null || _theme_spec3$layout$c === void 0 ? void 0 : _theme_spec3$layout$c.default) != 'undefined') {
    setWidthContainer(theme_spec.layout.container.default);
  }
}
function getLayouts() {
  var layout = [];
  Object.keys(theme_spec.media.queries).forEach(function (key, index) {
    layout.push({
      value: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      attributeName: key.charAt(0).toUpperCase() + key.slice(1)
    });
  });
  return layout;
}
function getBodyDevice() {
  let currentDevice = 'desktop';
  getLayouts().forEach(layout => {
    if (document.body.classList.contains(layout.value)) {
      currentDevice = layout.value;
      return;
    }
  });
  return currentDevice;
}
function setBodyDevice(device) {
  var loading = setInterval(function () {
    var editor_area = document.getElementsByClassName('edit-post-visual-editor__content-area');

    if (editor_area) {
      editor_area[0].style.margin = 'auto';
      Object.keys(theme_spec.media.queries).forEach(item => {
        if (device == item) {
          if (theme_spec.media.queries[item]['max-width'] != null && theme_spec.media.queries[item]['max-width'] <= editor_area[0].offsetWidth) {
            editor_area[0].style.width = theme_spec.media.queries[item]['max-width'] + 'px';
          } else {
            editor_area[0].style.removeProperty('width');
          }
        }
      });
      clearInterval(loading);
    }
  }, 100); // Checks every 100ms(0.1s)

  getLayouts().forEach(layout => {
    document.body.classList.remove(layout.value);
  });
  document.body.classList.add(device);
}
function setWidthContainer(width) {
  var loading = setInterval(function () {
    var wp_block_elements = document.getElementsByClassName('wp-block');

    if (wp_block_elements) {
      for (var i = 0; i < wp_block_elements.length; i++) {
        wp_block_elements[i].style.maxWidth = width;
      }

      clearInterval(loading);
    }
  }, 100); // Checks every 100ms(0.1s)
}

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "../../component-block-master/node_modules/is-what/dist/index.es.js":
/*!**************************************************************************!*\
  !*** ../../component-block-master/node_modules/is-what/dist/index.es.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getType": function() { return /* binding */ getType; },
/* harmony export */   "isAnyObject": function() { return /* binding */ isAnyObject; },
/* harmony export */   "isArray": function() { return /* binding */ isArray; },
/* harmony export */   "isBlob": function() { return /* binding */ isBlob; },
/* harmony export */   "isBoolean": function() { return /* binding */ isBoolean; },
/* harmony export */   "isDate": function() { return /* binding */ isDate; },
/* harmony export */   "isEmptyArray": function() { return /* binding */ isEmptyArray; },
/* harmony export */   "isEmptyObject": function() { return /* binding */ isEmptyObject; },
/* harmony export */   "isEmptyString": function() { return /* binding */ isEmptyString; },
/* harmony export */   "isError": function() { return /* binding */ isError; },
/* harmony export */   "isFile": function() { return /* binding */ isFile; },
/* harmony export */   "isFullArray": function() { return /* binding */ isFullArray; },
/* harmony export */   "isFullObject": function() { return /* binding */ isFullObject; },
/* harmony export */   "isFullString": function() { return /* binding */ isFullString; },
/* harmony export */   "isFunction": function() { return /* binding */ isFunction; },
/* harmony export */   "isMap": function() { return /* binding */ isMap; },
/* harmony export */   "isNaNValue": function() { return /* binding */ isNaNValue; },
/* harmony export */   "isNegativeNumber": function() { return /* binding */ isNegativeNumber; },
/* harmony export */   "isNull": function() { return /* binding */ isNull; },
/* harmony export */   "isNullOrUndefined": function() { return /* binding */ isNullOrUndefined; },
/* harmony export */   "isNumber": function() { return /* binding */ isNumber; },
/* harmony export */   "isObject": function() { return /* binding */ isObject; },
/* harmony export */   "isObjectLike": function() { return /* binding */ isObjectLike; },
/* harmony export */   "isOneOf": function() { return /* binding */ isOneOf; },
/* harmony export */   "isPlainObject": function() { return /* binding */ isPlainObject; },
/* harmony export */   "isPositiveNumber": function() { return /* binding */ isPositiveNumber; },
/* harmony export */   "isPrimitive": function() { return /* binding */ isPrimitive; },
/* harmony export */   "isPromise": function() { return /* binding */ isPromise; },
/* harmony export */   "isRegExp": function() { return /* binding */ isRegExp; },
/* harmony export */   "isSet": function() { return /* binding */ isSet; },
/* harmony export */   "isString": function() { return /* binding */ isString; },
/* harmony export */   "isSymbol": function() { return /* binding */ isSymbol; },
/* harmony export */   "isType": function() { return /* binding */ isType; },
/* harmony export */   "isUndefined": function() { return /* binding */ isUndefined; },
/* harmony export */   "isWeakMap": function() { return /* binding */ isWeakMap; },
/* harmony export */   "isWeakSet": function() { return /* binding */ isWeakSet; }
/* harmony export */ });
/**
 * Returns the object type of the given payload
 *
 * @param {*} payload
 * @returns {string}
 */
function getType(payload) {
    return Object.prototype.toString.call(payload).slice(8, -1);
}
/**
 * Returns whether the payload is undefined
 *
 * @param {*} payload
 * @returns {payload is undefined}
 */
function isUndefined(payload) {
    return getType(payload) === 'Undefined';
}
/**
 * Returns whether the payload is null
 *
 * @param {*} payload
 * @returns {payload is null}
 */
function isNull(payload) {
    return getType(payload) === 'Null';
}
/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
function isPlainObject(payload) {
    if (getType(payload) !== 'Object')
        return false;
    return payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype;
}
/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
function isObject(payload) {
    return isPlainObject(payload);
}
/**
 * Returns whether the payload is a an empty object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is { [K in any]: never }}
 */
function isEmptyObject(payload) {
    return isPlainObject(payload) && Object.keys(payload).length === 0;
}
/**
 * Returns whether the payload is a an empty object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
function isFullObject(payload) {
    return isPlainObject(payload) && Object.keys(payload).length > 0;
}
/**
 * Returns whether the payload is an any kind of object (including special classes or objects with different prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
function isAnyObject(payload) {
    return getType(payload) === 'Object';
}
/**
 * Returns whether the payload is an object like a type passed in < >
 *
 * Usage: isObjectLike<{id: any}>(payload) // will make sure it's an object and has an `id` prop.
 *
 * @template T this must be passed in < >
 * @param {*} payload
 * @returns {payload is T}
 */
function isObjectLike(payload) {
    return isAnyObject(payload);
}
/**
 * Returns whether the payload is a function (regular or async)
 *
 * @param {*} payload
 * @returns {payload is AnyFunction}
 */
function isFunction(payload) {
    return typeof payload === 'function';
}
/**
 * Returns whether the payload is an array
 *
 * @param {any} payload
 * @returns {payload is any[]}
 */
function isArray(payload) {
    return getType(payload) === 'Array';
}
/**
 * Returns whether the payload is a an array with at least 1 item
 *
 * @param {*} payload
 * @returns {payload is any[]}
 */
function isFullArray(payload) {
    return isArray(payload) && payload.length > 0;
}
/**
 * Returns whether the payload is a an empty array
 *
 * @param {*} payload
 * @returns {payload is []}
 */
function isEmptyArray(payload) {
    return isArray(payload) && payload.length === 0;
}
/**
 * Returns whether the payload is a string
 *
 * @param {*} payload
 * @returns {payload is string}
 */
function isString(payload) {
    return getType(payload) === 'String';
}
/**
 * Returns whether the payload is a string, BUT returns false for ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */
function isFullString(payload) {
    return isString(payload) && payload !== '';
}
/**
 * Returns whether the payload is ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */
function isEmptyString(payload) {
    return payload === '';
}
/**
 * Returns whether the payload is a number (but not NaN)
 *
 * This will return `false` for `NaN`!!
 *
 * @param {*} payload
 * @returns {payload is number}
 */
function isNumber(payload) {
    return getType(payload) === 'Number' && !isNaN(payload);
}
/**
 * Returns whether the payload is a positive number (but not 0)
 *
 * @param {*} payload
 * @returns {payload is number}
 */
function isPositiveNumber(payload) {
    return isNumber(payload) && payload > 0;
}
/**
 * Returns whether the payload is a negative number (but not 0)
 *
 * @param {*} payload
 * @returns {payload is number}
 */
function isNegativeNumber(payload) {
    return isNumber(payload) && payload < 0;
}
/**
 * Returns whether the payload is a boolean
 *
 * @param {*} payload
 * @returns {payload is boolean}
 */
function isBoolean(payload) {
    return getType(payload) === 'Boolean';
}
/**
 * Returns whether the payload is a regular expression (RegExp)
 *
 * @param {*} payload
 * @returns {payload is RegExp}
 */
function isRegExp(payload) {
    return getType(payload) === 'RegExp';
}
/**
 * Returns whether the payload is a Map
 *
 * @param {*} payload
 * @returns {payload is Map<any, any>}
 */
function isMap(payload) {
    return getType(payload) === 'Map';
}
/**
 * Returns whether the payload is a WeakMap
 *
 * @param {*} payload
 * @returns {payload is WeakMap<any, any>}
 */
function isWeakMap(payload) {
    return getType(payload) === 'WeakMap';
}
/**
 * Returns whether the payload is a Set
 *
 * @param {*} payload
 * @returns {payload is Set<any>}
 */
function isSet(payload) {
    return getType(payload) === 'Set';
}
/**
 * Returns whether the payload is a WeakSet
 *
 * @param {*} payload
 * @returns {payload is WeakSet<any>}
 */
function isWeakSet(payload) {
    return getType(payload) === 'WeakSet';
}
/**
 * Returns whether the payload is a Symbol
 *
 * @param {*} payload
 * @returns {payload is symbol}
 */
function isSymbol(payload) {
    return getType(payload) === 'Symbol';
}
/**
 * Returns whether the payload is a Date, and that the date is valid
 *
 * @param {*} payload
 * @returns {payload is Date}
 */
function isDate(payload) {
    return getType(payload) === 'Date' && !isNaN(payload);
}
/**
 * Returns whether the payload is a Blob
 *
 * @param {*} payload
 * @returns {payload is Blob}
 */
function isBlob(payload) {
    return getType(payload) === 'Blob';
}
/**
 * Returns whether the payload is a File
 *
 * @param {*} payload
 * @returns {payload is File}
 */
function isFile(payload) {
    return getType(payload) === 'File';
}
/**
 * Returns whether the payload is a Promise
 *
 * @param {*} payload
 * @returns {payload is Promise<any>}
 */
function isPromise(payload) {
    return getType(payload) === 'Promise';
}
/**
 * Returns whether the payload is an Error
 *
 * @param {*} payload
 * @returns {payload is Error}
 */
function isError(payload) {
    return getType(payload) === 'Error';
}
/**
 * Returns whether the payload is literally the value `NaN` (it's `NaN` and also a `number`)
 *
 * @param {*} payload
 * @returns {payload is typeof NaN}
 */
function isNaNValue(payload) {
    return getType(payload) === 'Number' && isNaN(payload);
}
/**
 * Returns whether the payload is a primitive type (eg. Boolean | Null | Undefined | Number | String | Symbol)
 *
 * @param {*} payload
 * @returns {(payload is boolean | null | undefined | number | string | symbol)}
 */
function isPrimitive(payload) {
    return (isBoolean(payload) ||
        isNull(payload) ||
        isUndefined(payload) ||
        isNumber(payload) ||
        isString(payload) ||
        isSymbol(payload));
}
/**
 * Returns true whether the payload is null or undefined
 *
 * @param {*} payload
 * @returns {(payload is null | undefined)}
 */
const isNullOrUndefined = isOneOf(isNull, isUndefined);
function isOneOf(a, b, c, d, e) {
    return (value) => a(value) || b(value) || (!!c && c(value)) || (!!d && d(value)) || (!!e && e(value));
}
/**
 * Does a generic check to check that the given payload is of a given type.
 * In cases like Number, it will return true for NaN as NaN is a Number (thanks javascript!);
 * It will, however, differentiate between object and null
 *
 * @template T
 * @param {*} payload
 * @param {T} type
 * @throws {TypeError} Will throw type error if type is an invalid type
 * @returns {payload is T}
 */
function isType(payload, type) {
    if (!(type instanceof Function)) {
        throw new TypeError('Type must be a function');
    }
    if (!Object.prototype.hasOwnProperty.call(type, 'prototype')) {
        throw new TypeError('Type is not a class');
    }
    // Classes usually have names (as functions usually have names)
    const name = type.name;
    return getType(payload) === name || Boolean(payload && payload.constructor === type);
}




/***/ }),

/***/ "../../component-block-master/node_modules/merge-anything/dist/index.es.js":
/*!*********************************************************************************!*\
  !*** ../../component-block-master/node_modules/merge-anything/dist/index.es.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatArrays": function() { return /* binding */ concatArrays; },
/* harmony export */   "merge": function() { return /* binding */ merge; },
/* harmony export */   "mergeAndCompare": function() { return /* binding */ mergeAndCompare; },
/* harmony export */   "mergeAndConcat": function() { return /* binding */ mergeAndConcat; }
/* harmony export */ });
/* harmony import */ var is_what__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-what */ "../../component-block-master/node_modules/is-what/dist/index.es.js");


/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function concatArrays(originVal, newVal) {
    if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(originVal) && (0,is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(newVal)) {
        // concat logic
        return originVal.concat(newVal);
    }
    return newVal; // always return newVal as fallback!!
}

function assignProp(carry, key, newVal, originalObject) {
    const propType = {}.propertyIsEnumerable.call(originalObject, key)
        ? 'enumerable'
        : 'nonenumerable';
    if (propType === 'enumerable')
        carry[key] = newVal;
    if (propType === 'nonenumerable') {
        Object.defineProperty(carry, key, {
            value: newVal,
            enumerable: false,
            writable: true,
            configurable: true,
        });
    }
}
function mergeRecursively(origin, newComer, compareFn) {
    // always return newComer if its not an object
    if (!(0,is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(newComer))
        return newComer;
    // define newObject to merge all values upon
    let newObject = {};
    if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(origin)) {
        const props = Object.getOwnPropertyNames(origin);
        const symbols = Object.getOwnPropertySymbols(origin);
        newObject = [...props, ...symbols].reduce((carry, key) => {
            const targetVal = origin[key];
            if ((!(0,is_what__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(key) && !Object.getOwnPropertyNames(newComer).includes(key)) ||
                ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(key) && !Object.getOwnPropertySymbols(newComer).includes(key))) {
                assignProp(carry, key, targetVal, origin);
            }
            return carry;
        }, {});
    }
    // newObject has all properties that newComer hasn't
    const props = Object.getOwnPropertyNames(newComer);
    const symbols = Object.getOwnPropertySymbols(newComer);
    const result = [...props, ...symbols].reduce((carry, key) => {
        // re-define the origin and newComer as targetVal and newVal
        let newVal = newComer[key];
        const targetVal = (0,is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(origin) ? origin[key] : undefined;
        // When newVal is an object do the merge recursively
        if (targetVal !== undefined && (0,is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(newVal)) {
            newVal = mergeRecursively(targetVal, newVal, compareFn);
        }
        const propToAssign = compareFn ? compareFn(targetVal, newVal, key) : newVal;
        assignProp(carry, key, propToAssign, newComer);
        return carry;
    }, newObject);
    return result;
}
/**
 * Merge anything recursively.
 * Objects get merged, special objects (classes etc.) are re-assigned "as is".
 * Basic types overwrite objects or other basic types.
 * @param object
 * @param otherObjects
 */
function merge(object, ...otherObjects) {
    return otherObjects.reduce((result, newComer) => {
        return mergeRecursively(result, newComer);
    }, object);
}
function mergeAndCompare(compareFn, object, ...otherObjects) {
    return otherObjects.reduce((result, newComer) => {
        return mergeRecursively(result, newComer, compareFn);
    }, object);
}
function mergeAndConcat(object, ...otherObjects) {
    return otherObjects.reduce((result, newComer) => {
        return mergeRecursively(result, newComer, concatArrays);
    }, object);
}




/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _objectWithoutProperties; }
/* harmony export */ });
/* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = (0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _objectWithoutPropertiesLoose; }
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons */ "./src/icons.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./edit */ "./src/edit.js");


/**
 * WordPress dependencies
 */




 // import * as gridConfig from '../config.json';

/**
 * Internal dependencies
 */


var variations = global_localized.gridConfig && global_localized.gridConfig.variations ? global_localized.gridConfig.variations : gridConfig.variations;
variations.forEach(function (elt, index) {
  if (typeof elt.scope != 'object') {
    variations[index].scope = ["block"];
  }

  if (typeof elt.icon == 'string') {
    variations[index].icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"], {
      icon: _icons__WEBPACK_IMPORTED_MODULE_4__[elt.icon]
    });
  }
});
let attributes = {
  gridCountColumns: {
    type: 'number'
  },
  gridLocked: {
    type: 'boolean',
    default: false
  },
  padding: {
    type: 'object'
  },
  margin: {
    type: 'object'
  }
};

if (typeof block_spec.props == 'object') {
  for (const [key, value] of Object.entries(block_spec.props)) {
    if (typeof value != 'object' || value == null) continue;

    switch (value.type) {
      case 'select':
        attributes[key] = {
          type: 'string'
        };
        break;
    }
  }
}

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('custom/wpe-grid', {
  title: 'Grid',
  category: 'wpe-layout',
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    enableBackground: "new 0 0 24 24",
    height: "24px",
    id: "Layer_1",
    version: "1.1",
    viewBox: "0 0 24 24",
    width: "24px",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12,10.9c-0.1,0-0.2,0-0.2-0.1L3.5,6.1C3.4,6,3.3,5.8,3.3,5.6c0-0.2,0.1-0.3,0.2-0.4l8.2-4.7c0.2-0.1,0.3-0.1,0.5,0      l8.2,4.7c0.2,0.1,0.2,0.3,0.2,0.4S20.6,6,20.5,6.1l-8.2,4.7C12.2,10.8,12.1,10.9,12,10.9z M4.8,5.6L12,9.8l7.2-4.2L12,1.5      L4.8,5.6z"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M10.4,23.6c-0.1,0-0.2,0-0.2-0.1l-8.2-4.7c-0.2-0.1-0.3-0.3-0.3-0.4V8.9c0-0.2,0.1-0.3,0.2-0.4c0.2-0.1,0.3-0.1,0.5,0      l8.2,4.7c0.2,0.1,0.2,0.3,0.2,0.4v9.5c0,0.2-0.1,0.3-0.2,0.4C10.5,23.6,10.5,23.6,10.4,23.6z M2.7,18.1l7.2,4.2v-8.3L2.7,9.8      V18.1z"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M13.6,23.6c-0.1,0-0.2,0-0.2-0.1c-0.2-0.1-0.2-0.3-0.2-0.4v-9.5c0-0.2,0.1-0.3,0.2-0.4l8.2-4.7c0.2-0.1,0.3-0.1,0.5,0      c0.2,0.1,0.2,0.3,0.2,0.4v9.5c0,0.2-0.1,0.3-0.3,0.4l-8.2,4.7C13.8,23.6,13.7,23.6,13.6,23.6z M14.1,13.9v8.3l7.2-4.2V9.8      L14.1,13.9z"
  })))))),
  supports: {
    anchor: true
  },
  // parent: [ 'custom/wpe-container' ],
  attributes: attributes,
  variations,
  edit: (0,_edit__WEBPACK_IMPORTED_MODULE_5__["default"])(block_spec, theme_spec),
  save: () => {
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save();
    const innerBlocksProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useInnerBlocksProps.save(blockProps);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", innerBlocksProps);
  }
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map