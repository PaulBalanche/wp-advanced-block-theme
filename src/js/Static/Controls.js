import { renderDateTime } from '../Controls/DateTime';
import { renderFile } from '../Controls/File';
import { renderImageVideo } from '../Controls/ImageVideo';
import { renderLink } from '../Controls/Link';
import { renderRadio } from '../Controls/Radio';
import { renderRelation } from '../Controls/Relation';
import { renderSelect } from '../Controls/Select';
import { renderText } from '../Controls/Text';
import { renderTextarea } from '../Controls/Textarea';
import { renderToggle } from '../Controls/Toggle';
import { renderObject } from '../Controls/Object';
import WysiwygControl from '../Controls/WysiwygControl/WysiwygControl';

export class Controls {

    static render( type, componentInstance, id, label, keys, valueProp, objectValue, required = false, args = {} ) {

        switch(type) {

            case 'date':
                return renderDateTime( componentInstance, id, label, keys, valueProp, objectValue, required );
                
            case 'file':
            case 'gallery':
                return renderFile( componentInstance, args.type, id, label, keys, valueProp, objectValue, required );
                
            case 'image':
            case 'video':
                return renderImageVideo( componentInstance, args.type, args.args, id, label, keys, valueProp, objectValue, required );
                
            case 'link':
                return renderLink( componentInstance, id, label, keys, valueProp, objectValue, required );
                
            case 'radio':
                return renderRadio( componentInstance, id, label, args.options, keys, valueProp, objectValue, required );
                
            case 'relation':
                return renderRelation( componentInstance, id, label, args.entity, keys, valueProp, objectValue, required );
                
            case 'select':
            case 'color':
                return renderSelect( componentInstance, id, label, args.options, args.default, keys, valueProp, objectValue, required );
                
            case 'string':
            case 'number':
                return renderText( componentInstance, id, label, keys, valueProp, objectValue, args.isNumber, required );
                
            case 'text':
                return renderTextarea( componentInstance, id, label, keys, valueProp, objectValue, required );
                
            case 'boolean':
                return renderToggle( componentInstance, id, label, props.help, keys, valueProp, objectValue, required );
            
            case 'object':
                return renderObject( componentInstance, id, label, keys, valueProp, args.props, ( typeof args.initialOpen != 'undefined' ) ? args.initialOpen : false, required );

            case 'richText':
            case 'wysiwyg':
                return <WysiwygControl
                    key={ id + "-WysiwygControl" }
                    id={ id }
                    label={ label }
                    keys={ keys }
                    valueProp={ valueProp }
                    objectValue={ objectValue }
                    required={ required }
                    componentInstance={ componentInstance }
                />
        }
    }
}