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
import WysiwygControl from '../Controls/WysiwygControl/WysiwygControl';

export class Controls {

    static render( type, componentInstance, id, label, keys, valueProp, objectValue, repeatable = false, required = false, responsive = false, args = [] ) {

        switch(type) {

            case 'DateTime':
                return renderDateTime( componentInstance, id, label, keys, valueProp, objectValue, repeatable, required );
                break;
                
            case 'File':
                return renderFile( componentInstance, args.type, id, label, keys, valueProp, objectValue, repeatable, required, responsive );
                break;
                
            case 'ImageVideo':
                return renderImageVideo( componentInstance, args.type, args.args, id, label, keys, valueProp, objectValue, repeatable, required, responsive );
                break;
                
            case 'Link':
                return renderLink( componentInstance, id, label, keys, valueProp, objectValue, repeatable, required );
                break;
                
            case 'Radio':
                return renderRadio( componentInstance, id, label, args.options, keys, valueProp, objectValue, repeatable, required );
                break;
                
            case 'Relation':
                return renderRelation( componentInstance, id, label, args.entity, keys, valueProp, objectValue, repeatable, required );
                break;
                
            case 'Select':
                return  renderSelect( componentInstance, id, label, args.options, keys, valueProp, objectValue, repeatable, required );
                break;
                
            case 'Text':
                return renderText( componentInstance, id, label, keys, valueProp, objectValue, args.isNumber, repeatable, required, responsive );
                break;
                
            case 'Textarea':
                return renderTextarea( componentInstance, id, label, keys, valueProp, objectValue, repeatable, required );
                break;
                
            case 'Toggle':
                return renderToggle( componentInstance, id, label, props.help, keys, valueProp, objectValue, repeatable, required );
                break;

            case 'Wysiwyg':
                return <WysiwygControl
                    key={ id + "-WysiwygControl" }
                    id={ id }
                    label={ label }
                    keys={ repeatable ? keys.concat(keyLoop) : keys }
                    valueProp={ valueProp }
                    objectValue={ objectValue }
                    repeatable={ repeatable }
                    required={ required }
                    componentInstance={ componentInstance }
                />
                break;
        }
    }
}