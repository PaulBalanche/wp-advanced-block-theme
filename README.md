# Theme configuration

### Create `current_theme/`theme\_spec.`json` file:

{% content-ref url="group-1/page-1/theme_spec.json.md" %}
[theme\_spec.json.md](group-1/page-1/theme\_spec.json.md)
{% endcontent-ref %}

###

### Environment variables uses by WPextend plugin:

```css
# Template location in current theme (default: views/)
THEME_VIEW_ROOT_LOCATION='views/'

# Component sub-location (default: components/)
COMPONENTS_RELATIVE_PATH='components/'

# Section container class name (default: container)
CONTAINER_CLASS_NAME='container

# Used for scripts enqueue. If doesn't exists, WP_ENV used instead.
FRONT_ENV='dev'
```

{% hint style="danger" %}
Don't forget to add them in **config/application.php**.
{% endhint %}
