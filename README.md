# How it works?

### Front-end part

Components developed by front-end developer have to be placed inside the theme, under 2 directory level: by default **views/components/**.\
Each component need to have 2 files: **viewspec.json** and _**component\_name**_**.twig**

### **Back-end part**

Use WP-CLI command to generate blocks:

`wp wpe-blocks generate_component_blocks`

This will generate **blocks/custom/** directory with all components.\
You can add an **override.json** file in order to add or replace some component attributes/configurations.
