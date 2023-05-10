<?php

namespace Abt\Helpers;

class Anchor
{
    /**
     * Get anchor in DIV rendered by Gutbemberg edit function
     *
     */
    public static function get($className, &$content)
    {
        $anchor = null;

        if (
            preg_match(
                '/<div(.*)class="wp-block-' .
                    $className .
                    '[^"]*"([^>]*)>(.*)<\/div>/s',
                $content,
                $content_transformed
            ) === 1
        ) {
            $class_prev = $content_transformed[1];
            $class_next = $content_transformed[2];
            $content_transformed = $content_transformed[3];

            if (strpos($class_prev, 'id="') !== false) {
                preg_match('/id="(.*)"/', $class_prev, $match_anchor);
                if (is_array($match_anchor) && count($match_anchor) == 2) {
                    $anchor = self::str_rand() . $match_anchor[1];
                }
            } elseif (strpos($class_next, 'id="') !== false) {
                preg_match('/id="(.*)"/', $class_next, $match_anchor);
                if (is_array($match_anchor) && count($match_anchor) == 2) {
                    $anchor = self::str_rand() . $match_anchor[1];
                }
            }

            $content = $content_transformed;
        }

        return $anchor;
    }

    public static function str_rand()
    {
        $car = "abcdefghijklmnopqrstuvwxyz";
        return $car[mt_rand(0, strlen($car) - 1)];
    }
}
