# Actions and Filters

## Component

### Filters:

#### # wpextend/pre\_render\_component\_relation

```php
add_filter( 'wpextend/pre_render_component_relation', 'hook_pre_render_component_relation', 10, 3);
function hook_pre_render_component_relation($value, $component_id, $key_prop) {

	return $value;
}
```

#### # wpextend/render\_wpe\_component\_attributes\_{$component\_id}

```php
add_filter( 'wpextend/render_wpe_component_attributes_{$component_id}', 'hook_wpe_component_attributes');
function hook_wpe_component_attributes($attributes) {

	return $attributes;
}
```

#### # wpextend/get\_frontspec\_component\_props\_{$component\_id}

```php
add_filter( 'wpextend/get_frontspec_component_props_{$component_id}', 'hook_get_frontspec_component_props');
function hook_get_frontspec_component_props($attributes) {

	return $attributes;
}
```

## Container

### Filters:

#### # wpextend/wpe\_container\_view\_path

```php
add_filter( 'wpextend/wpe_container_view_path', 'hook_wpe_container_view_path');
function hook_wpe_container_view_path($view_path) {

	return $view_path;
}
```



#### # wpextend/wpe\_container\_data

```php
add_filter( 'wpextend/wpe_container_data', 'hook_wpe_container_data', 10, 2);
function hook_wpe_container_data($data, $attributes) {

	return $data;
}
```



## Grid

### Filters:

#### # wpextend/wpe\_grid\_view\_path

```php
add_filter( 'wpextend/wpe_grid_view_path', 'hook_wpe_grid_view_path');
function hook_wpe_grid_view_path($view_path) {

	return $view_path;
}
```

#### # wpextend/wpe\_grid\_data

```php
add_filter( 'wpextend/wpe_grid_data', 'hook_wpe_grid_data', 10, 2);
function hook_wpe_grid_data($data, $attributes) {

	return $data;
}
```



## Column

### Filters:

#### # wpextend/wpe\_column\_view\_path

```php
add_filter( 'wpextend/wpe_column_view_path', 'hook_wpe_column_view_path');
function hook_wpe_column_view_path($view_path) {

	return $view_path;
}
```

#### # wpextend/wpe\_column\_data

```php
add_filter( 'wpextend/wpe_column_data', 'hook_wpe_column_data', 10, 2);
function hook_wpe_column_data($data, $attributes) {

	return $data;
}
```
