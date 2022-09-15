# theme\_spec.json

```json
{
    "menu_locations": {
        "top-left": "Top left",
        "top-right": "Top right",
        "bottom": "Bottom"
    },
    "text_domain": "wpe-basic-boilerplate-theme",
    "spacing": "bootstrap",
    "i18n": {
        "copyright": "© 2022 Buzzbrothers - Projet 99"
    },
    "styles": {
        "typo": {
            "values": {
                "paragraph-lead": {
                    "name": "Paragraph lead",
                    "class": "lead",
                    "type": "block"
                },
                "bold": {
                    "name": "Bold",
                    "class": "typo-bold",
                    "type": "inline"
                },
                "italic": {
                    "name": "Italic",
                    "class": "typo-italic",
                    "type": "inline"
                }
            }
        }
    },
    "assets": {
        "css": {
            "global": {
                "src": "dist/*.css",
                "deps": "",
                "ver": "",
                "media": "",
                "env": "development",
                "in_editor": true
            }
        },
        "js": {
            "global": {
                "src": "dist/bundle.js",
                "deps": "",
                "ver": "",
                "in_footer": ""
            }
        }
    },
    "container": {
        "is_main": false,
        "style": [
            {
                "label": "Light",
                "value": "light"
            },
            {
                "label": "Dark",
                "value": "dark"
            }
        ]
    },
    "allowed_block_types": [
        "core/paragraph",
        "core/list",
        "core/heading",
        "core/button",
        "custom/wpe-container",
        "custom/wpe-component"
    ],
    "gridConfig": {
        "totalColumns": 12,
        "variations": [
            {
                "name": "column-2",
                "title": "2 column",
                "attributes": { "gridCountColumns": 2 },
                "innerBlocks": [
                    {
                        "name": "custom/wpe-column",
                        "attributes": { "widthDesktop": 6, "widthTablet": 6, "widthMobile": 12 }
                    },
                    {
                        "name": "custom/wpe-column",
                        "attributes": { "columnStartDesktop": 7, "columnStartTablet": 7, "widthDesktop": 6, "widthTablet": 6, "widthMobile": 12,"rowStartMobile": 2 }
                    }
                ]
            }
        ]
    },
    "galleryType": [
        {
            "label": "Test",
            "value": "test"
        },
        {
            "label": "Test 2",
            "value": "test_2"
        }
    ],
    "custom_blocks_routing": {
        "button": "core/button",
        "container": "layout/wpe-container",
        "image": "core/image",
        "text-image": "core/media-text"
    }
} 
```

