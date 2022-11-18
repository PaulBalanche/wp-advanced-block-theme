/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_WpeComponentBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../js/WpeComponentBase */ "../../js/WpeComponentBase.js");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/server-side-render */ "@wordpress/server-side-render");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _js_attributes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../js/attributes.js */ "../../js/attributes.js");






class WpeComponent extends _js_WpeComponentBase__WEBPACK_IMPORTED_MODULE_1__.WpeComponentBase {
  constructor() {
    super(...arguments);
    this.defineLiveRendering();
  }
  defineLiveRendering() {
    // Because of ID will be not saved to the block’s comment delimiter default attribute, we manually set it.
    if (typeof this.props.attributes.id_component == 'undefined') this.setAttributes({
      id_component: block_spec.id
    });
    this.blockSpecificRender = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2___default()), {
      key: this.props.clientId + "-serverSideRender",
      block: "custom/wpe-component-" + this.props.block_spec.id,
      attributes: this.props.attributes,
      httpMethod: "POST"
    });
  }
}
/* harmony default export */ __webpack_exports__["default"] = ((block_spec, current_user_can_edit_posts, frontspec_styles) => (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.withSelect)((select, props) => {
  const {
    getEntityRecords
  } = select('core');
  const {
    __experimentalGetPreviewDeviceType
  } = select('core/edit-post');
  let relations = [];
  if (props.name == "custom/wpe-component-" + block_spec.id) {
    // Loop Props
    for (const [keyProp, valueProp] of Object.entries(block_spec.props)) {
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
    block_spec,
    current_user_can_edit_posts: current_user_can_edit_posts,
    frontspec_styles: frontspec_styles
  };
})(WpeComponent));

/***/ }),

/***/ "../../js/WpeComponentBase.js":
/*!************************************!*\
  !*** ../../js/WpeComponentBase.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WpeComponentBase": function() { return /* binding */ WpeComponentBase; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attributes */ "../../js/attributes.js");




class WpeComponentBase extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    var _this$props, _this$props$block_spe;
    super(...arguments);
    this.state = {
      configMode: this !== null && this !== void 0 && (_this$props = this.props) !== null && _this$props !== void 0 && (_this$props$block_spe = _this$props.block_spec) !== null && _this$props$block_spe !== void 0 && _this$props$block_spe.screenshot ? 1 : 2
    };
    this.initEnabledMode();
    this.blockSpecificRender = null;
    this.inspectorControls = 'test';
  }
  initEnabledMode() {
    this.tabEnabledMode = [];
    if (typeof this.props.current_user_can_edit_posts == 'undefined' || parseInt(this.props.current_user_can_edit_posts)) {
      if (this.props.block_spec.screenshot) {
        this.tabEnabledMode.push(1);
      }
      this.tabEnabledMode.push(2);
      if (typeof this.props.block_spec.props == 'object' && Object.keys(this.props.block_spec.props).length > 0) {
        this.tabEnabledMode.push(3);
      }
    }
  }
  getAttribute(key) {
    return this.props.attributes[key];
  }
  setAttributes(attributes) {
    this.props.setAttributes(attributes);
  }
  renderButtonGroupMode() {
    let modeDefinition = {
      1: 'Screenshot',
      2: 'Live',
      3: 'Edit'
    };
    if (typeof this.tabEnabledMode == 'object') {
      let buttons = [];
      for (var i in modeDefinition) {
        let index = parseInt(i);
        if (this.tabEnabledMode.includes(index)) {
          buttons.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            key: this.props.clientId + "-buttonConfigMode_" + index,
            isPressed: this.state.configMode == index,
            onClick: () => {
              this.setState({
                configMode: index
              });
            }
          }, modeDefinition[index]));
        }
      }
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "buttonGroupComponentModeContainer"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
        key: this.props.clientId + "-buttonGroupComponentMode"
      }, buttons));
    }
    return null;
  }
  propsExists() {
    return typeof this.props.block_spec.props == 'object' && Object.keys(this.props.block_spec.props).length > 0;
  }
  renderPlaceholderProps() {
    if (this.propsExists()) {
      let catReOrder = {
        default: {
          props: {}
        }
      };

      // 1. Loop Props Categories
      if (typeof this.props.block_spec.props_categories != 'undefined' && this.props.block_spec.props_categories != null) {
        for (const [keyCatProps, valueCatProps] of Object.entries(this.props.block_spec.props_categories)) {
          catReOrder[valueCatProps.id] = {
            name: valueCatProps.name,
            props: {}
          };
        }
      }

      // 2. Loop Props
      for (const [keyProp, valueProp] of Object.entries(this.props.block_spec.props)) {
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
          currentEditCat.push((0,_attributes__WEBPACK_IMPORTED_MODULE_2__.renderControl)(prop, [keyProp], {
            [keyProp]: valueProp
          }, this.props.clientId));
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
      if (tabPanel.length > 0) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          key: this.props.clientId + "-ConfigurationPlaceholder",
          label: "Configuration",
          isColumnLayout: true,
          className: "wpe-component_edit_placeholder"
        }, tabPanel.length > 1 ? (0,_attributes__WEBPACK_IMPORTED_MODULE_2__.renderTabPanelComponent)(this.props.clientId, tabPanel, function (tabPanel) {
          return tabPanel.content;
        }) : tabPanel[0].content);
      }
    }
    return null;
  }
  renderInspectorControls() {
    if (this.inspectorControls !== null) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, this.inspectorControls);
    }
    return null;
  }
  renderConfigMode1() {
    if (this.props.block_spec.screenshot) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        key: this.props.clientId + "-serverSideRender",
        src: this.props.block_spec.screenshot
      }));
    }
    return null;
  }
  renderConfigMode2() {
    return this.blockSpecificRender;
  }
  renderConfigMode3() {
    return this.renderPlaceholderProps();
  }
  render() {
    let render = [];
    render.push(this.renderInspectorControls());
    render.push(this.renderButtonGroupMode());
    switch (this.state.configMode) {
      case 1:
        render.push(this.renderConfigMode1());
        break;
      case 2:
        render.push(this.renderConfigMode2());
        break;
      case 3:
        render.push(this.renderConfigMode3());
        break;
    }
    return render;
  }
}

/***/ }),

/***/ "../../js/attributes.js":
/*!******************************!*\
  !*** ../../js/attributes.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileSizeFormat": function() { return /* binding */ fileSizeFormat; },
/* harmony export */   "initComponentAttributes": function() { return /* binding */ initComponentAttributes; },
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
function initComponentAttributes(attributes, props) {
  for (const [key, value] of Object.entries(props)) {
    if (typeof value != 'object' || value == null) continue;
    let currentType = typeof value.repeatable != 'undefined' && value.repeatable ? 'array' : value.type.toLowerCase();
    currentType = typeof value.responsive != 'undefined' && value.responsive ? 'object' : currentType;
    switch (currentType) {
      case 'string':
        attributes[key] = {
          type: 'string'
        };
        break;
      case 'text':
        attributes[key] = {
          type: 'string'
        };
        break;
      case 'richText':
        attributes[key] = {
          type: 'string'
        };
        break;
      case 'wysiwyg':
        attributes[key] = {
          type: 'string'
        };
        break;
      case 'boolean':
        attributes[key] = {
          type: 'boolean'
        };
        break;
      case 'select':
        attributes[key] = {
          type: 'string'
        };
        break;
      case 'color':
        attributes[key] = {
          type: 'string'
        };
        break;
      case 'radio':
        attributes[key] = {
          type: 'string'
        };
        break;
      case 'relation':
        attributes[key] = {
          type: 'string'
        };
        break;
      case 'array':
        attributes[key] = {
          type: 'array'
        };
        break;
      case 'object':
        attributes[key] = {
          type: 'object'
        };
        break;
      case 'link':
        attributes[key] = {
          type: 'object'
        };
        break;
      case 'number':
        attributes[key] = {
          type: 'number'
        };
        break;
      case 'image':
        attributes[key] = {
          type: 'object'
        };
        break;
      case 'video':
        attributes[key] = {
          type: 'object'
        };
        break;
      case 'file':
        attributes[key] = {
          type: 'object'
        };
        break;
      case 'gallery':
        attributes[key] = {
          type: 'array'
        };
        break;
      case 'date':
        attributes[key] = {
          type: 'string'
        };
        break;
    }
  }
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
  }, preview));

  // if( responsive ) {

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
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../devices */ "../../js/devices.js");





function renderImageVideo(type, args, id, label, keys, valueProp, objectValue) {
  let repeatable = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let required = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  let clientId = arguments.length > 9 ? arguments[9] : undefined;
  let responsive = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
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

  // if( responsive ) {

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
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../devices */ "../../js/devices.js");




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
/* harmony import */ var _js_attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../js/attributes */ "../../js/attributes.js");
/* harmony import */ var _js_devices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../js/devices */ "../../js/devices.js");




/**
 * Internal dependencies
 */



(0,_js_devices__WEBPACK_IMPORTED_MODULE_5__.initDevice)();
var current_user_can_edit_posts = global_localized.current_user_can_edit_posts;
Object.values(global_localized.components).forEach(element => {
  var initAttributes = {
    id_component: {
      type: 'string'
    }
  };
  (0,_js_attributes__WEBPACK_IMPORTED_MODULE_4__.initComponentAttributes)(initAttributes, element.props);
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