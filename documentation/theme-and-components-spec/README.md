# Theme & Components spec

### Root component VS Located component

By default, all components are available anywhere. It's possible to constraint available inside specific container by 2 ways:

* in global **theme\_spec.json** file, define\
  `"container": { "is_main": false }`\
  All components will be available only inside "custom/wpe-container" and "custom/wpe-column".
* in **override.json** file inside **blocks/custom/your-component/**, define\
  `"parent": [ "custom/wpe-container" ]`



#### [> theme\_spec.json](theme\_spec.json.md)

#### [> viewspec.json](viewspec.json.md)
