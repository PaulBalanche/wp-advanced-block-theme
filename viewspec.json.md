# viewspec.json

```json
{
  "id": "my-first-component",
  "name": "My first component",
  "category": "Ma new category",
  "parent": null,
  "path": "my-first-component.twig",
  "props_categories": [
      {
          "id": "media",
          "name": "Media"
      }
  ],
  "props": {
    "string": {
      "label": "String",
      "type": "string",
      "repeatable": false
    },
    "number": {
      "label": "Number",
      "type": "number",
      "repeatable": false
    },
    "text": {
      "label": "Text",
      "type": "text",
      "repeatable": false
    },
    "wysiwyg": {
      "label": "Wysiwyg",
      "type": "wysiwyg",
      "repeatable": false
    },
    "boolean": {
      "label": "Boolean",
      "type": "boolean",
      "repeatable": false
    },
    "select": {
      "label": "Select",
      "type": "select",
      "repeatable": false,
      "options": [
        {
          "label": "Un",
          "value": "un"
        },
        {
          "label": "Deux",
          "value": "deux"
        },
        {
          "label": "Trois",
          "value": "trois"
        }
      ]
    },
    "radio": {
      "label": "Radio",
      "type": "radio",
      "repeatable": false,
      "options": [
        {
          "label": "Un",
          "value": "un"
        },
        {
          "label": "Deux",
          "value": "deux"
        },
        {
          "label": "Trois",
          "value": "trois"
        }
      ]
    },
    "link": {
      "label": "Link",
      "type": "link",
      "repeatable": false
    },
    "relation": {
      "label": "Relation",
      "type": "relation",
      "repeatable": false,
      "entity": "post"
    },
    "image": {
      "label": "Image",
      "type": "image",
      "repeatable": false,
      "category": "media",
      "image": {
        "responsive": [ "default", "mobile" ],
        "image_size_identifier": {
            "default": "large",
            "mobile": "thumbnail"
        },
        "instructions": {
            "default": "Recommended source: 3072x1728 (16/9)",
            "mobile": "Recommended source: 2048x2048 (1/1)"
        }
      }
    },
    "file": {
      "label": "File",
      "type": "file",
      "repeatable": false
    },
    "gallery": {
      "label": "Gallery",
      "type": "gallery",
      "repeatable": false
    },
    "object": {
      "label": "Object",
      "type": "object",
      "repeatable": false,
      "props": {
        "sub-string": {
          "label": "Sub String",
          "type": "string",
          "repeatable": false
        },
        "sub-number": {
          "label": "Sub Number",
          "type": "number",
          "repeatable": false
        },
        "sub-text": {
          "label": "Sub Text",
          "type": "text",
          "repeatable": false
        }
      }
    }
  }
} 
```



## # Components definitions

## **id**

## name

## **category**

## path

{% hint style="danger" %}
Your components path configuration have to be relative to the COMPONENTS\_RELATIVE\_PATH environment variable.
{% endhint %}

## props

### **# label**

Name of the property displayed on top of the input.

* Type: `String`
* Required: Yes

### **# type**

The type will influence the back-office rendering and the structure of the saved data.

* Type: `String`
* Required: Yes
* Value:
  * string
  * number
  * text
  * richText
  * wysiwyg
  * boolean
  * select
  * radio
  * link
  * relation
  * image
  * file
  * gallery
  * object

_**object** type allows to have child properties._ _In this case, **props** property should be defined._

### **# repeatable**

Set to true if the properties could be defined more than once.

* Type: `Boolean`
* Required: No

### **# category**

Allows to lighten the back-office display, and to structure the controls in tabs. Set the category id defined in the props\_categories properties.

* Type: `String`
* Required: No

### **# props**

Related to **object** type. Allows to define child properties.

* Type: `Object`
* Required: No
