import { useContext } from '@wordpress/element';
import { Attributes } from '../../Static/Attributes';
import { Render } from '../../Static/Render';
import { DraftEditor } from './DraftEditor';
import { OBlockEditorContext } from '../../Context/Providers/OBlockEditorProvider';

export default function WysiwygControl({
    id,
    label,
    keys,
    valueProp,
    objectValue,
    repeatable = false,
    onChange,
}) {
    const { themeSpec } = useContext(OBlockEditorContext);

    function getTypo() {
        let typo = {};
        if (
            themeSpec?.editor?.typo &&
            typeof themeSpec.editor.typo == 'object'
        ) {
            for (const [key, val] of Object.entries(themeSpec.editor.typo)) {
                if (key == 'a') {
                    continue;
                }

                let isBlock = false;

                let editorCss = null;
                if (val?.style && typeof val.style == 'object') {
                    editorCss = {};
                    for (const [keyCss, valCss] of Object.entries(val.style)) {
                        if (keyCss != 'display') {
                            editorCss[keyCss] = valCss;
                        } else if (valCss == 'block') {
                            isBlock = true;
                        }
                    }
                }

                if (val?.editorStyle && typeof val.editorStyle == 'object') {
                    for (const [keyCss, valCss] of Object.entries(
                        val.editorStyle,
                    )) {
                        if (keyCss != 'display') {
                            editorCss[keyCss] = valCss;
                        } else if (valCss == 'block') {
                            isBlock = true;
                        }
                    }
                }

                typo[key] = {
                    label: val.label,
                    isBlock: isBlock,
                    editor: editorCss,
                    group: val?.group ? val.group : null,
                    type: val?.type ? val.type : null,
                    isDefault: val?.default && !!val.default ? true : false,
                };
            }
        }

        return typo;
    }

    function getTools() {
        let tools = {
            a: {
                style: {
                    textDecoration: 'underline',
                },
            },
        };

        if (
            themeSpec?.editor?.typo &&
            typeof themeSpec.editor.typo == 'object'
        ) {
            for (const [key, val] of Object.entries(themeSpec.editor.typo)) {
                let editorCss = null;

                if (key === 'a') {
                    if (val?.style && typeof val.style == 'object') {
                        editorCss = {};
                        for (const [keyCss, valCss] of Object.entries(
                            val.style,
                        )) {
                            if (keyCss != 'display') {
                                editorCss[keyCss] = valCss;
                            }
                        }
                    }

                    if (
                        val?.editorStyle &&
                        typeof val.editorStyle == 'object'
                    ) {
                        for (const [keyCss, valCss] of Object.entries(
                            val.editorStyle,
                        )) {
                            if (keyCss != 'display') {
                                editorCss[keyCss] = valCss;
                            }
                        }
                    }

                    tools.a = {
                        style: editorCss,
                    };
                }
            }
        }

        return tools;
    }

    return (
        <div
            key={id + '-WysiwygComponentsBaseControl'}
            className="components-base-control"
        >
            <div
                key={id + '-WysiwygComponentsBaseControlField'}
                className="components-base-control__field"
            >
                <div
                    key={id + '-WysiwygContainer'}
                    className="wysiwyg-container"
                >
                    {Render.label(id, label)}
                    <DraftEditor
                        id={id}
                        initialContent={objectValue}
                        onChange={onChange}
                        typo={getTypo()}
                        tools={getTools()}
                    />
                </div>
            </div>
        </div>
    );
}
