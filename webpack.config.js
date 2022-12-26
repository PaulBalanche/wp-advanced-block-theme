const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry,
        abt_editor: path.resolve(__dirname, 'src/js/index.js'),
      },
    output: {
        ...defaultConfig.output,
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
};