```
sass --style=compressed --no-source-map src/scss/admin/editor.scss assets/style/editor.min.css
```

## Component properties:

### label

Name of the property displayed on top of the input.

- Type: `String`
- Required: Yes

### type

The type will influence the back-office rendering and the structure of the saved data.

- Type: `String`
- Required: Yes
- Value:
  - string
  - number
  - boolean
  - text
  - image
  - file
  - gallery
  - object

*__object__ type allows to have child properties.*
*In this case, __props__ property should be defined.*

### repeatable

Set to true if the properties could be defined more than once.

- Type: `Boolean`
- Required: No

### category

Allows to lighten the back-office display, and to structure the controls in tabs.
Set the category id defined in the props_categories properties.

- Type: `String`
- Required: No

### props

Related to __object__ type. Allows to define child properties.

- Type: `Object`
- Required: No