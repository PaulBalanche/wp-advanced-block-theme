/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/_marginControls.js":
/*!********************************!*\
  !*** ./src/_marginControls.js ***!
  \********************************/
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
/* harmony import */ var merge_anything__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! merge-anything */ "./node_modules/merge-anything/dist/index.es.js");
/* harmony import */ var _js_devices_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../js/devices.js */ "../../js/devices.js");





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
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/server-side-render */ "@wordpress/server-side-render");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _marginControls_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_marginControls.js */ "./src/_marginControls.js");
/* harmony import */ var _js_attributes_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../js/attributes.js */ "../../js/attributes.js");








class WpeComponent extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
  }
  getAttribute(key) {
    return this.props.attributes[key];
  }
  setAttributes(attributes) {
    this.props.setAttributes(attributes);
  }

  /**
   * Render
   */
  render() {
    const {
      attributes,
      isSelected,
      clientId,
      element,
      current_user_can_edit_posts,
      experimentalDeviceType,
      theme_spec
    } = this.props;

    // Because of ID will be not saved to the block’s comment delimiter default attribute, we manually set it.
    if (typeof attributes.id_component == 'undefined') this.setAttributes({
      id_component: element.id
    });

    // Visual mode
    if (!isSelected || !parseInt(current_user_can_edit_posts)) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_1___default()), {
        key: clientId + "-serverSideRender",
        block: "custom/wpe-component-" + element.id,
        attributes: Object.assign(attributes, {
          "editor": true
        }),
        httpMethod: "POST"
      });
    }
    var editPlaceHolder = '';
    if (typeof element.props == 'object' && Object.keys(element.props).length > 0) {
      // Edition mode
      let catReOrder = {
        default: {
          props: {}
        }
      };

      // 1. Loop Props Categories
      if (typeof element.props_categories != 'undefined' && element.props_categories != null) {
        for (const [keyCatProps, valueCatProps] of Object.entries(element.props_categories)) {
          catReOrder[valueCatProps.id] = {
            name: valueCatProps.name,
            props: {}
          };
        }
      }

      // 2. Loop Props
      for (const [keyProp, valueProp] of Object.entries(element.props)) {
        if (typeof valueProp != 'object' || valueProp == null) continue;
        if (typeof valueProp.category != 'undefined' && valueProp.category != null && valueProp.category in catReOrder) {
          catReOrder[valueProp.category].props[keyProp] = valueProp;
        } else {
          catReOrder.default.props[keyProp] = valueProp;
        }
      }

      // 3. Remove empty category
      for (const [keyProp, valueProp] of Object.entries(catReOrder)) {
        if (Object.keys(catReOrder[keyProp].props).length == 0) {
          delete catReOrder[keyProp];
        }
      }

      // 4. Render
      var tabPanel = [];
      for (const [keyCat, valCat] of Object.entries(catReOrder)) {
        if (valCat.props.length == 0) continue;
        let currentEditCat = [];
        forEachCatProps: for (const [keyProp, prop] of Object.entries(valCat.props)) {
          // Conditional treatment
          if (typeof prop.conditional == 'object') {
            for (const [index, conditionalField] of Object.entries(prop.conditional)) {
              let conditionalFieldKey = Object.keys(conditionalField)[0];
              let conditionalFieldValue = conditionalField[conditionalFieldKey];
              if (this.getAttribute(conditionalFieldKey) != conditionalFieldValue) continue forEachCatProps;
            }
          }
          let valueProp = this.getAttribute(keyProp);
          currentEditCat.push((0,_js_attributes_js__WEBPACK_IMPORTED_MODULE_6__.renderControl)(prop, [keyProp], {
            [keyProp]: valueProp
          }, clientId));
        }
        if (keyCat == "default") {
          tabPanel.push({
            name: keyCat,
            title: "Default",
            content: currentEditCat
          });
        } else {
          tabPanel.push({
            name: keyCat,
            title: valCat.name,
            content: currentEditCat
          });
        }
      }
      if (tabPanel.length > 1) {
        editPlaceHolder = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TabPanel, {
          key: clientId + "-tabPanel",
          className: "tab-panel-wpe-component",
          activeClass: "active-tab",
          tabs: tabPanel
        }, tabPanel => tabPanel.content);
      } else {
        editPlaceHolder = tabPanel[0].content;
      }
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_marginControls_js__WEBPACK_IMPORTED_MODULE_5__.MarginControls, {
      props: this.props,
      deviceType: experimentalDeviceType,
      margin: theme_spec !== null && theme_spec !== void 0 && theme_spec.margin ? theme_spec === null || theme_spec === void 0 ? void 0 : theme_spec.margin : null
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Placeholder, {
      key: clientId + "-placeholder",
      label: element.name,
      isColumnLayout: true,
      className: "wpe-component_edit_placeholder"
    }, editPlaceHolder));
  }
}
/* harmony default export */ __webpack_exports__["default"] = ((element, current_user_can_edit_posts, frontspec_styles, theme_spec) => (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.withSelect)((select, props) => {
  const {
    getEntityRecords
  } = select('core');
  const {
    __experimentalGetPreviewDeviceType
  } = select('core/edit-post');
  let relations = [];
  if (props.name == "custom/wpe-component-" + element.id) {
    // Loop Props
    for (const [keyProp, valueProp] of Object.entries(element.props)) {
      if (valueProp.type == 'relation' && typeof valueProp.entity != 'undefined' && relations[valueProp.entity] == null) {
        relations[valueProp.entity] = getEntityRecords('postType', valueProp.entity, {
          per_page: -1,
          status: 'publish'
        });
      }
    }
  }
  return {
    relations: relations,
    element,
    current_user_can_edit_posts: current_user_can_edit_posts,
    frontspec_styles: frontspec_styles,
    theme_spec,
    experimentalDeviceType: __experimentalGetPreviewDeviceType()
  };
})(WpeComponent));

/***/ }),

/***/ "../../js/attributes.js":
/*!******************************!*\
  !*** ../../js/attributes.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileSizeFormat": function() { return /* binding */ fileSizeFormat; },
/* harmony export */   "recursiveUpdateObjectFromObject": function() { return /* binding */ recursiveUpdateObjectFromObject; },
/* harmony export */   "removeEltRepeatable": function() { return /* binding */ removeEltRepeatable; },
/* harmony export */   "renderControl": function() { return /* binding */ renderControl; },
/* harmony export */   "renderPanelComponent": function() { return /* binding */ renderPanelComponent; },
/* harmony export */   "returnStringOrNumber": function() { return /* binding */ returnStringOrNumber; },
/* harmony export */   "setAttributes": function() { return /* binding */ setAttributes; },
/* harmony export */   "updateAttributes": function() { return /* binding */ updateAttributes; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./devices */ "../../js/devices.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controls */ "../../js/controls.js");
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
  }

  // Re-index in case of element suppression
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
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderTextControl)(fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], false, repeatable, required_field, clientId));
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
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderImageVideoControl)(prop.type, prop.image && typeof prop.image == 'object' ? prop.image : {}, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;
      case 'video':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderImageVideoControl)(prop.type, prop.video && typeof prop.video == 'object' ? prop.video : {}, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;
      case 'file':
      case 'gallery':
        blocReturned.push((0,_controls__WEBPACK_IMPORTED_MODULE_3__.renderFileControl)(prop.type, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId));
        break;
      case 'object':
        if (typeof prop.props == "object") {
          let tempKeyObject = repeatable ? keys.concat(keyLoop) : keys;
          let fieldsetObject = [];
          if (responsive) {
            fieldsetObject.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
              key: fieldId + "-TabPanel",
              className: "tab-panel-wpe-component",
              activeClass: "active-tab",
              initialTabName: (0,_devices__WEBPACK_IMPORTED_MODULE_2__.getBodyDevice)(),
              tabs: (0,_devices__WEBPACK_IMPORTED_MODULE_2__.getLayouts)().map(layout => {
                return {
                  name: layout.value,
                  title: layout.label,
                  className: 'tab-' + layout.value
                };
              })
            }, tab => {
              let tempKeyObjectReponsive = keys.concat(tab.name);
              let fieldsetObjectResponsive = [];
              for (const [keySubProp, valueSubProp] of Object.entries(prop.props)) {
                fieldsetObjectResponsive.push(renderControl(valueSubProp, tempKeyObjectReponsive.concat(keySubProp), valueProp, clientId));
              }
              return fieldsetObjectResponsive;
            }));
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
  }

  // Add repeatable button
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
  }

  // Return
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

/***/ }),

/***/ "../../js/controls.js":
/*!****************************!*\
  !*** ../../js/controls.js ***!
  \****************************/
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
/* harmony import */ var _controls_DateTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controls/DateTime */ "../../js/controls/DateTime.js");
/* harmony import */ var _controls_File__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controls/File */ "../../js/controls/File.js");
/* harmony import */ var _controls_ImageVideo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls/ImageVideo */ "../../js/controls/ImageVideo.js");
/* harmony import */ var _controls_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controls/Link */ "../../js/controls/Link.js");
/* harmony import */ var _controls_Radio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controls/Radio */ "../../js/controls/Radio.js");
/* harmony import */ var _controls_Relation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controls/Relation */ "../../js/controls/Relation.js");
/* harmony import */ var _controls_Select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controls/Select */ "../../js/controls/Select.js");
/* harmony import */ var _controls_Text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controls/Text */ "../../js/controls/Text.js");
/* harmony import */ var _controls_Textarea__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controls/Textarea */ "../../js/controls/Textarea.js");
/* harmony import */ var _controls_Toggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./controls/Toggle */ "../../js/controls/Toggle.js");

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
  return (0,_controls_File__WEBPACK_IMPORTED_MODULE_1__.renderFile)(type, id, label, keys, valueProp, objectValue, repeatable, required, clientId);
}

function renderImageVideoControl(type, args, id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let required = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  let clientId = arguments.length > 9 ? arguments[9] : undefined;
  return (0,_controls_ImageVideo__WEBPACK_IMPORTED_MODULE_2__.renderImageVideo)(type, args, id, label, keys, valueProp, objectValue, repeatable, required, clientId);
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
  return (0,_controls_Text__WEBPACK_IMPORTED_MODULE_7__.renderText)(id, label, keys, valueProp, objectValue, isNumber, repeatable, required, clientId);
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
}

// import { renderWysiwyg } from './controls/Wysiwyg';
// export function renderWysiwygControl( id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
//     return renderWysiwyg( id, label, keys, valueProp, objectValue, repeatable, required, clientId );
// }

/***/ }),

/***/ "../../js/controls/DateTime.js":
/*!*************************************!*\
  !*** ../../js/controls/DateTime.js ***!
  \*************************************/
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

/***/ "../../js/controls/File.js":
/*!*********************************!*\
  !*** ../../js/controls/File.js ***!
  \*********************************/
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
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../attributes */ "../../js/attributes.js");




function renderFile(type, id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let required = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let clientId = arguments.length > 8 ? arguments[8] : undefined;
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
  }, preview));
  return renderPanelComponent(id, label, inner, false);
}

/***/ }),

/***/ "../../js/controls/ImageVideo.js":
/*!***************************************!*\
  !*** ../../js/controls/ImageVideo.js ***!
  \***************************************/
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
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../attributes */ "../../js/attributes.js");




function renderImageVideo(type, args, id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let required = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  let clientId = arguments.length > 9 ? arguments[9] : undefined;
  label = label && required ? label + '*' : label;
  let videoControl = [];
  var tabPanelResponsive = [];

  // Responsive init
  if (!args.responsive || typeof args.responsive != 'object') args.responsive = ['default'];

  // Remove useless data
  if (typeof objectValue == 'object') {
    for (var i in objectValue) {
      if (!args.responsive.includes(i)) delete objectValue[i];
    }
  }

  // Loop on each responsive entries
  for (var i in args.responsive) {
    let responsive_id = args.responsive[i];
    let responsiveContent = [];

    // Update component attribute if empty 
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
      }

      // MediaPlaceholder labels
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
    }

    // Tab panel construction
    tabPanelResponsive.push({
      name: responsive_id,
      title: responsive_id.charAt(0).toUpperCase() + responsive_id.slice(1),
      content: responsiveContent
    });
  }

  // Render tab if more than 1 content
  if (tabPanelResponsive.length > 1) {
    videoControl.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
      key: id + "-tabPanelVideo",
      className: "tab-panel-wpe-component",
      activeClass: "active-tab",
      tabs: tabPanelResponsive
    }, tabPanelResponsive => tabPanelResponsive.content));
  } else videoControl.push(tabPanelResponsive[0].content);
  return (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.renderPanelComponent)(id, label, videoControl, false);
}

/***/ }),

/***/ "../../js/controls/Link.js":
/*!*********************************!*\
  !*** ../../js/controls/Link.js ***!
  \*********************************/
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
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../attributes */ "../../js/attributes.js");




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

/***/ "../../js/controls/Radio.js":
/*!**********************************!*\
  !*** ../../js/controls/Radio.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderRadio": function() { return /* binding */ renderRadio; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../js/attributes.js");
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

/***/ "../../js/controls/Relation.js":
/*!*************************************!*\
  !*** ../../js/controls/Relation.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderRelation": function() { return /* binding */ renderRelation; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../js/attributes.js");



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

/***/ "../../js/controls/Select.js":
/*!***********************************!*\
  !*** ../../js/controls/Select.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderSelect": function() { return /* binding */ renderSelect; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../js/attributes.js");



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

/***/ "../../js/controls/Text.js":
/*!*********************************!*\
  !*** ../../js/controls/Text.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderText": function() { return /* binding */ renderText; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../js/attributes.js");



function renderText(id, label, keys, valueProp, objectValue) {
  let isNumber = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    key: id,
    label: label,
    type: !!isNumber ? "number" : "text",
    value: objectValue,
    onChange: newValue => (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.updateAttributes)(keys, valueProp, newValue, isNumber, clientId)
  });
}

/***/ }),

/***/ "../../js/controls/Textarea.js":
/*!*************************************!*\
  !*** ../../js/controls/Textarea.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderTextarea": function() { return /* binding */ renderTextarea; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../js/attributes.js");



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

/***/ "../../js/controls/Toggle.js":
/*!***********************************!*\
  !*** ../../js/controls/Toggle.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderToggle": function() { return /* binding */ renderToggle; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attributes */ "../../js/attributes.js");



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

/***/ "../../js/devices.js":
/*!***************************!*\
  !*** ../../js/devices.js ***!
  \***************************/
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

/***/ "@wordpress/server-side-render":
/*!******************************************!*\
  !*** external ["wp","serverSideRender"] ***!
  \******************************************/
/***/ (function(module) {

module.exports = window["wp"]["serverSideRender"];

/***/ }),

/***/ "./node_modules/is-what/dist/index.es.js":
/*!***********************************************!*\
  !*** ./node_modules/is-what/dist/index.es.js ***!
  \***********************************************/
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

/***/ "./node_modules/merge-anything/dist/index.es.js":
/*!******************************************************!*\
  !*** ./node_modules/merge-anything/dist/index.es.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatArrays": function() { return /* binding */ concatArrays; },
/* harmony export */   "merge": function() { return /* binding */ merge; },
/* harmony export */   "mergeAndCompare": function() { return /* binding */ mergeAndCompare; },
/* harmony export */   "mergeAndConcat": function() { return /* binding */ mergeAndConcat; }
/* harmony export */ });
/* harmony import */ var is_what__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-what */ "./node_modules/is-what/dist/index.es.js");


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
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _js_devices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../js/devices */ "../../js/devices.js");




/**
 * Internal dependencies
 */


(0,_js_devices__WEBPACK_IMPORTED_MODULE_4__.initDevice)();
var current_user_can_edit_posts = global_localized.current_user_can_edit_posts;
Object.values(global_localized.components).forEach(element => {
  var initAttributes = {
    id_component: {
      type: 'string'
    },
    padding: {
      type: 'object'
    },
    margin: {
      type: 'object'
    }
  };
  for (const [key, value] of Object.entries(element.props)) {
    if (typeof value != 'object' || value == null) continue;
    let currentType = typeof value.repeatable != 'undefined' && value.repeatable ? 'array' : value.type.toLowerCase();
    switch (currentType) {
      case 'string':
        initAttributes[key] = {
          type: 'string'
        };
        break;
      case 'text':
        initAttributes[key] = {
          type: 'string'
        };
        break;
      case 'richText':
        initAttributes[key] = {
          type: 'string'
        };
        break;
      case 'wysiwyg':
        initAttributes[key] = {
          type: 'string'
        };
        break;
      case 'boolean':
        initAttributes[key] = {
          type: 'boolean'
        };
        break;
      case 'select':
        initAttributes[key] = {
          type: 'string'
        };
        break;
      case 'color':
        initAttributes[key] = {
          type: 'string'
        };
        break;
      case 'radio':
        initAttributes[key] = {
          type: 'string'
        };
        break;
      case 'relation':
        initAttributes[key] = {
          type: 'string'
        };
        break;
      case 'array':
        initAttributes[key] = {
          type: 'array'
        };
        break;
      case 'object':
        initAttributes[key] = {
          type: 'object'
        };
        break;
      case 'link':
        initAttributes[key] = {
          type: 'object'
        };
        break;
      case 'number':
        initAttributes[key] = {
          type: 'number'
        };
        break;
      case 'image':
        initAttributes[key] = {
          type: 'object'
        };
        break;
      case 'video':
        initAttributes[key] = {
          type: 'object'
        };
        break;
      case 'file':
        initAttributes[key] = {
          type: 'object'
        };
        break;
      case 'gallery':
        initAttributes[key] = {
          type: 'array'
        };
        break;
      case 'date':
        initAttributes[key] = {
          type: 'string'
        };
        break;
    }
  }
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('custom/wpe-component-' + element.id, {
    title: element.name,
    category: element.category.slug,
    supports: {
      anchor: true
    },
    parent: element.parent,
    attributes: initAttributes,
    description: element.description,
    edit: (0,_edit__WEBPACK_IMPORTED_MODULE_3__["default"])(element, current_user_can_edit_posts, global_localized.styles, theme_spec),
    save: () => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
    }
  });
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map