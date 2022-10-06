/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../component-block-master/node_modules/is-what/dist/index.esm.js":
/*!***************************************************************************!*\
  !*** ../../component-block-master/node_modules/is-what/dist/index.esm.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/* harmony export */   "isNull": function() { return /* binding */ isNull; },
/* harmony export */   "isNullOrUndefined": function() { return /* binding */ isNullOrUndefined; },
/* harmony export */   "isNumber": function() { return /* binding */ isNumber; },
/* harmony export */   "isObject": function() { return /* binding */ isObject; },
/* harmony export */   "isObjectLike": function() { return /* binding */ isObjectLike; },
/* harmony export */   "isOneOf": function() { return /* binding */ isOneOf; },
/* harmony export */   "isPlainObject": function() { return /* binding */ isPlainObject; },
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
var isNullOrUndefined = isOneOf(isNull, isUndefined);
function isOneOf(a, b, c, d, e) {
    return function (value) {
        return a(value) || b(value) || (!!c && c(value)) || (!!d && d(value)) || (!!e && e(value));
    };
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
    var name = type.name;
    return getType(payload) === name || Boolean(payload && payload.constructor === type);
}




/***/ }),

/***/ "../../component-block-master/node_modules/merge-anything/dist/index.esm.js":
/*!**********************************************************************************!*\
  !*** ../../component-block-master/node_modules/merge-anything/dist/index.esm.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatArrays": function() { return /* binding */ concatArrays; },
/* harmony export */   "merge": function() { return /* binding */ merge; },
/* harmony export */   "mergeAndCompare": function() { return /* binding */ mergeAndCompare; },
/* harmony export */   "mergeAndConcat": function() { return /* binding */ mergeAndConcat; }
/* harmony export */ });
/* harmony import */ var is_what__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-what */ "../../component-block-master/node_modules/is-what/dist/index.esm.js");


/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function concatArrays(originVal, newVal) {
    if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(originVal) && (0,is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(newVal)) {
        // concat logic
        return originVal.concat(newVal);
    }
    return newVal; // always return newVal as fallback!!
}

function assignProp(carry, key, newVal, originalObject) {
    var propType = {}.propertyIsEnumerable.call(originalObject, key)
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
    var newObject = {};
    if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(origin)) {
        var props_1 = Object.getOwnPropertyNames(origin);
        var symbols_1 = Object.getOwnPropertySymbols(origin);
        newObject = __spreadArray(__spreadArray([], props_1), symbols_1).reduce(function (carry, key) {
            var targetVal = origin[key];
            if ((!(0,is_what__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(key) && !Object.getOwnPropertyNames(newComer).includes(key)) ||
                ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(key) && !Object.getOwnPropertySymbols(newComer).includes(key))) {
                assignProp(carry, key, targetVal, origin);
            }
            return carry;
        }, {});
    }
    // newObject has all properties that newComer hasn't
    var props = Object.getOwnPropertyNames(newComer);
    var symbols = Object.getOwnPropertySymbols(newComer);
    var result = __spreadArray(__spreadArray([], props), symbols).reduce(function (carry, key) {
        // re-define the origin and newComer as targetVal and newVal
        var newVal = newComer[key];
        var targetVal = (0,is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(origin) ? origin[key] : undefined;
        // When newVal is an object do the merge recursively
        if (targetVal !== undefined && (0,is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(newVal)) {
            newVal = mergeRecursively(targetVal, newVal, compareFn);
        }
        var propToAssign = compareFn ? compareFn(targetVal, newVal, key) : newVal;
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
function merge(object) {
    var otherObjects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherObjects[_i - 1] = arguments[_i];
    }
    return otherObjects.reduce(function (result, newComer) {
        return mergeRecursively(result, newComer);
    }, object);
}
function mergeAndCompare(compareFn, object) {
    var otherObjects = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        otherObjects[_i - 2] = arguments[_i];
    }
    return otherObjects.reduce(function (result, newComer) {
        return mergeRecursively(result, newComer, compareFn);
    }, object);
}
function mergeAndConcat(object) {
    var otherObjects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherObjects[_i - 1] = arguments[_i];
    }
    return otherObjects.reduce(function (result, newComer) {
        return mergeRecursively(result, newComer, concatArrays);
    }, object);
}




/***/ }),

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
/* harmony import */ var merge_anything__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! merge-anything */ "../../component-block-master/node_modules/merge-anything/dist/index.esm.js");




class MarginControls extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(attr) {
    super(...arguments);
    this.parentProps = attr.props;

    if (!this.parentProps.attributes.hasOwnProperty('padding')) {
      this.parentProps.attributes.padding = {};
    }

    if (!this.parentProps.attributes.hasOwnProperty('margin')) {
      this.parentProps.attributes.margin = {};
    }

    this.state = {
      padding: (0,merge_anything__WEBPACK_IMPORTED_MODULE_2__.merge)({
        mobile: {
          all: undefined,
          top: undefined,
          bottom: undefined,
          left: undefined,
          right: undefined,
          x: undefined,
          y: undefined
        },
        tablet: {
          all: undefined,
          top: undefined,
          bottom: undefined,
          left: undefined,
          right: undefined,
          x: undefined,
          y: undefined
        },
        desktop: {
          all: undefined,
          top: undefined,
          bottom: undefined,
          left: undefined,
          right: undefined,
          x: undefined,
          y: undefined
        }
      }, this.parentProps.attributes.padding),
      margin: (0,merge_anything__WEBPACK_IMPORTED_MODULE_2__.merge)({
        mobile: {
          all: undefined,
          top: undefined,
          bottom: undefined,
          left: undefined,
          right: undefined,
          x: undefined,
          y: undefined
        },
        tablet: {
          all: undefined,
          top: undefined,
          bottom: undefined,
          left: undefined,
          right: undefined,
          x: undefined,
          y: undefined
        },
        desktop: {
          all: undefined,
          top: undefined,
          bottom: undefined,
          left: undefined,
          right: undefined,
          x: undefined,
          y: undefined
        }
      }, this.parentProps.attributes.margin)
    };
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


  setPadding(type, deviceType, value) {
    const newPadding = (0,merge_anything__WEBPACK_IMPORTED_MODULE_2__.merge)(this.state.padding, {
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
    const newMargin = (0,merge_anything__WEBPACK_IMPORTED_MODULE_2__.merge)(this.state.margin, {
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
    const newPadding = {
      mobile: deviceType == 'mobile' ? {} : this.state.padding.mobile,
      tablet: deviceType == 'tablet' ? {} : this.state.padding.tablet,
      desktop: deviceType == 'desktop' ? {} : this.state.padding.desktop
    };
    this.setState({
      padding: newPadding
    });
    this.parentProps.setAttributes({
      padding: newPadding
    });
  }

  resetMargin(deviceType) {
    const newMargin = {
      mobile: deviceType == 'mobile' ? {} : this.state.margin.mobile,
      tablet: deviceType == 'tablet' ? {} : this.state.margin.tablet,
      desktop: deviceType == 'desktop' ? {} : this.state.margin.desktop
    };
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
      activeClass: "active-tab" // onSelect={ (tabName) => wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType( tabName.charAt(0).toUpperCase() + tabName.slice(1) ) }
      ,
      tabs: [{
        name: 'mobile',
        title: 'Mobile (all)',
        className: 'tab-one'
      }, {
        name: 'tablet',
        title: 'Tablet',
        className: 'tab-two'
      }, {
        name: 'desktop',
        title: 'Desktop',
        className: 'tab-three'
      }]
    }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "All",
      value: this.state.padding[tab.name].all,
      onChange: value => {
        this.setPadding('all', tab.name, value);
      },
      min: 0,
      max: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.HorizontalRule, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "Padding Y",
      value: this.state.padding[tab.name].y,
      onChange: value => {
        this.setPadding('y', tab.name, value);
      },
      min: 0,
      max: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "Top",
      value: this.state.padding[tab.name].top,
      onChange: value => this.setPadding('top', tab.name, value),
      min: 0,
      max: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "Bottom",
      value: this.state.padding[tab.name].bottom,
      onChange: value => this.setPadding('bottom', tab.name, value),
      min: 0,
      max: 5
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.HorizontalRule, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "X",
      value: this.state.padding[tab.name].x,
      onChange: value => {
        this.setPadding('x', tab.name, value);
      },
      min: 0,
      max: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "Left",
      value: this.state.padding[tab.name].left,
      onChange: value => this.setPadding('left', tab.name, value),
      min: 0,
      max: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "Right",
      value: this.state.padding[tab.name].right,
      onChange: value => this.setPadding('right', tab.name, value),
      min: 0,
      max: 5
    }))), this.renderBtnReset('padding', tab.name)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: 'Margin',
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
      className: "margin-tab-panel",
      activeClass: "active-tab" // onSelect={ (tabName) => wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType( tabName.charAt(0).toUpperCase() + tabName.slice(1) ) }
      ,
      tabs: [{
        name: 'mobile',
        title: 'Mobile (all)',
        className: 'tab-one'
      }, {
        name: 'tablet',
        title: 'Tablet',
        className: 'tab-two'
      }, {
        name: 'desktop',
        title: 'Desktop',
        className: 'tab-three'
      }]
    }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "All",
      value: this.state.margin[tab.name].all,
      onChange: value => {
        this.setMargin('all', tab.name, value);
      },
      min: 0,
      max: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.HorizontalRule, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "Y",
      value: this.state.margin[tab.name].y,
      onChange: value => {
        this.setMargin('y', tab.name, value);
      },
      min: 0,
      max: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "Top",
      value: this.state.margin[tab.name].top,
      onChange: value => this.setMargin('top', tab.name, value),
      min: 0,
      max: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "Bottom",
      value: this.state.margin[tab.name].bottom,
      onChange: value => this.setMargin('bottom', tab.name, value),
      min: 0,
      max: 5
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.HorizontalRule, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "X",
      value: this.state.margin[tab.name].x,
      onChange: value => {
        this.setMargin('x', tab.name, value);
      },
      min: 0,
      max: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "child-range-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "Left",
      value: this.state.margin[tab.name].left,
      onChange: value => this.setMargin('left', tab.name, value),
      min: 0,
      max: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: "Right",
      value: this.state.margin[tab.name].right,
      onChange: value => this.setMargin('right', tab.name, value),
      min: 0,
      max: 5
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
/* harmony import */ var _component_block_master_src_marginControls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../component-block-master/src/_marginControls */ "../../component-block-master/src/_marginControls.js");
/* harmony import */ var _src_devices_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../src/devices.js */ "../../../src/devices.js");


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
      selectedDevice: null,
      defaultClassName: null
    };
  }

  getDeviceType() {
    return this.state.selectedDevice;
  }

  render() {
    var {
      attributes,
      setAttributes,
      clientId,
      inner_blocks,
      innerBlocksProps,
      countColumns,
      blockVariations,
      blockType,
      experimentalDeviceType,
      setState,
      isSelectedBlock,
      isParentOfSelectedBlock
    } = this.props;
    const {
      replaceInnerBlocks
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
    if (this.state.defaultClassName === null) this.state.defaultClassName = innerBlocksProps.className; // Device
    // const deviceType = this.getDeviceType();
    // const deviceType = experimentalDeviceType.toLowerCase();
    // if( typeof deviceType != 'undefined' && deviceType != 'undefined' ) {
    //     // innerBlocksProps.className = this.state.defaultClassName + ' ' + deviceType;
    //     innerBlocksProps.className += ' ' + deviceType;
    // }

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
            (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)('core/editor').updateBlockAttributes(clientId, nextVariation.attributes);
          }
        }
      }));
    } else {
      /**
       * Add or remove columns
       * 
       */
      if (attributes.gridCountColumns > countColumns) {
        let numberOfColumnsToAdd = attributes.gridCountColumns - countColumns;
        let inner_blocks_new = [...inner_blocks, ...(0,lodash__WEBPACK_IMPORTED_MODULE_6__.times)(numberOfColumnsToAdd, () => {
          return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.createBlock)('custom/wpe-column');
        })];
        replaceInnerBlocks(clientId, inner_blocks_new, false);
      } else if (attributes.gridCountColumns < countColumns) {
        let inner_blocks_new = inner_blocks.slice(0, attributes.gridCountColumns);
        replaceInnerBlocks(clientId, inner_blocks_new, false);
      }

      let deviceButtonGroupClassName = isSelectedBlock || isParentOfSelectedBlock ? ' is-selected' : '';
      /**
       * Render edit
       */

      var editDisplay = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "deviceButtonGroup" + deviceButtonGroupClassName
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, null, (0,_src_devices_js__WEBPACK_IMPORTED_MODULE_8__.getLayouts)().map(layout => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
          key: "layoutButton_" + layout.value + "_" + clientId,
          isPressed: (0,_src_devices_js__WEBPACK_IMPORTED_MODULE_8__.getBodyDevice)() == layout.value,
          onClick: () => {
            (0,_src_devices_js__WEBPACK_IMPORTED_MODULE_8__.setBodyDevice)(layout.value);
            inner_blocks.forEach(elt => {
              (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)('core/editor').updateBlockAttributes(elt.clientId, {
                updated: true
              });
            });
          }
        }, layout.value);
      }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", innerBlocksProps));
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
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_component_block_master_src_marginControls__WEBPACK_IMPORTED_MODULE_7__.MarginControls, {
        props: this.props,
        deviceType: experimentalDeviceType
      }));
    }
    /**
     * Render
     * 
     */


    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, inspectorControls, editDisplay);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (() => (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.compose)([(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.withSelect)((select, props) => {
  const {
    __experimentalGetPreviewDeviceType
  } = select('core/edit-post');
  return {
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

/***/ "../../../src/devices.js":
/*!*******************************!*\
  !*** ../../../src/devices.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBodyDevice": function() { return /* binding */ getBodyDevice; },
/* harmony export */   "getLayouts": function() { return /* binding */ getLayouts; },
/* harmony export */   "setBodyDevice": function() { return /* binding */ setBodyDevice; }
/* harmony export */ });
var layout = [];
Object.keys(theme_spec.media.queries).forEach(function (key, index) {
  layout.push({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    attributeName: key.charAt(0).toUpperCase() + key.slice(1)
  });
});
const getLayouts = () => layout;
function setBodyDevice(device) {
  const el = document.getElementsByClassName('edit-post-visual-editor__content-area'); // const dropZone = document.getElementsByClassName('block-editor-block-list__layout');

  el[0].style.margin = 'auto';
  Object.keys(theme_spec.media.queries).forEach(item => {
    if (device == item) {
      let width = theme_spec.media.queries[item]['max-width'] != null ? theme_spec.media.queries[item]['max-width'] + 'px' : '100%';
      el[0].style.width = width;
    }
  });
  getLayouts().forEach(layout => {
    document.body.classList.remove(layout.value);
  });
  document.body.classList.add(device);
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

/***/ }),

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/***/ (function(module) {

module.exports = JSON.parse('{"totalColumns":12,"variations":[{"name":"column-1","title":"1 column","icon":"column1","attributes":{"gridCountColumns":1},"innerBlocks":[{"name":"custom/wpe-column","attributes":{"widthDesktop":12}}]},{"name":"column-2","title":"2 columns","icon":"columns2","attributes":{"gridCountColumns":2},"innerBlocks":[{"name":"custom/wpe-column","attributes":{"widthDesktop":6}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":7,"widthDesktop":6}}]},{"name":"column-2-bis","title":"2 columns bis","icon":"columns2bis","attributes":{"gridCountColumns":2},"innerBlocks":[{"name":"custom/wpe-column","attributes":{"widthDesktop":4,"widthTablet":6,"widthMobile":12}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":5,"columnStartTablet":7,"widthDesktop":8,"widthTablet":6,"widthMobile":12,"rowStartMobile":2}}]},{"name":"column-2-ter","title":"2 columns ter","icon":"columns2ter","attributes":{"gridCountColumns":2},"innerBlocks":[{"name":"custom/wpe-column","attributes":{"widthDesktop":8,"widthTablet":6,"widthMobile":12}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":9,"columnStartTablet":7,"widthDesktop":4,"widthTablet":6,"widthMobile":12,"rowStartMobile":2}}]},{"name":"column-3","title":"3 columns","icon":"columns3","attributes":{"gridCountColumns":3},"innerBlocks":[{"name":"custom/wpe-column","attributes":{"widthDesktop":4}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":5,"widthDesktop":4}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":9,"widthDesktop":4}}]},{"name":"column-4","title":"4 columns","icon":"columns4","attributes":{"gridCountColumns":4},"innerBlocks":[{"name":"custom/wpe-column","attributes":{"widthDesktop":3}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":4,"widthDesktop":3}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":7,"widthDesktop":3}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":10,"widthDesktop":3}}]},{"name":"column-6","title":"6 columns","icon":"columns6","attributes":{"gridCountColumns":6},"innerBlocks":[{"name":"custom/wpe-column","attributes":{"widthDesktop":2}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":3,"widthDesktop":2}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":5,"widthDesktop":2}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":7,"widthDesktop":2}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":9,"widthDesktop":2}},{"name":"custom/wpe-column","attributes":{"columnStartDesktop":11,"widthDesktop":2}}]}]}');

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
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons */ "./src/icons.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config.json */ "./config.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit */ "./src/edit.js");


/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */


var variations = global_localized.gridConfig && global_localized.gridConfig.variations ? global_localized.gridConfig.variations : _config_json__WEBPACK_IMPORTED_MODULE_5__.variations;
variations.forEach(function (elt, index) {
  if (typeof elt.scope != 'object') {
    variations[index].scope = ["block"];
  }

  if (typeof elt.icon == 'string') {
    variations[index].icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
      icon: _icons__WEBPACK_IMPORTED_MODULE_4__[elt.icon]
    });
  }
});
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
    lightBlockWrapper: true,
    anchor: true
  },
  parent: ['custom/wpe-container'],
  attributes: {
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
  },
  variations,
  edit: (0,_edit__WEBPACK_IMPORTED_MODULE_6__["default"])(),
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