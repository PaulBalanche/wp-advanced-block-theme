# How it works?

1. Components developed by front-end developer have to be placed inside the theme, under 2 directory level: by default "_**views/components/**_".\
   Each component need to have 2 files: **viewspec.json** and _**component\_name**_**.twig**\
   ****
2. Use CLI command to generate blocks:\
   `wp wpe-blocks generate_component_blocks`\
   ``\
   ``Will generate "_**blocks/custom/**_" directory with all components.\
   You can add an _**override.json**_ file in order to add or replace some component attributes/configurations.



Root component VS Located component: By default, all components are available anywhere. It's possible to constraint available inside specific container by 2 ways:

* in global theme\_spec.json file, define "is\_main" as true: all components will be available only inside "custom/wpe-container" and "custom/wpe-column"
* in override.json file inside blocks/custom/your-component/, define "parent" as \[ "custom/wpe-container", "custom/wpe-column" ]
