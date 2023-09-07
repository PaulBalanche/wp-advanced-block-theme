<?php

namespace Abt\Helpers\Attributes;

class Form extends Base {
    
    public static function isValid( &$propInstance ) {
        
        return is_numeric( $propInstance->getValue() );
    }

    public static function format( &$propInstance ) {

        if( is_numeric( $propInstance->getValue() ) ) {
    
            $formData = [
                'action' => '/',
                'lnf' => [
                    'labelType' => 'block'
                ],
                'fields' => [],
                'actions' => [
                    [
                        'type' => 'submit',
                        'label' => 'Send my message!'
                    ]
                ]
            ];

            $form = get_post($propInstance->getValue());

            $parser_class = apply_filters( 'block_parser_class', 'WP_Block_Parser' );
            $parser = new $parser_class();
            $fields_parsed = $parser->parse( $form->post_content );
            if( is_array($fields_parsed) ) {
                foreach( $fields_parsed as $field ) {
                    if( $field['blockName'] == 'custom/wpe-contact-form-field' ) {
                        $formData['fields'][] = [
                            'type' => $field['attrs']['type'],
                            'label' => $field['attrs']['label'],
                            'name' => $field['attrs']['label'],
                            'placeholder' => $field['attrs']['label'],
                        ];
                    }
                }
            }

            return $formData;
            echo '<pre>';
            print_r($formData);
            die;
        }

        return null;
    }

}