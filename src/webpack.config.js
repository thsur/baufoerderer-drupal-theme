/**
 * See:
 * https://symfony.com/doc/current/frontend.html
 * https://symfony.com/doc/current/frontend/encore/advanced-config.html
 * https://symfony.com/doc/current/frontend/encore/postcss.html
 * https://symfony.com/doc/current/frontend/encore/vuejs.html
 */


// webpack.config.js
const Encore  = require('@symfony/webpack-encore');
const webpack = require('webpack')

Encore
  // the project directory where all compiled assets will be stored
  .setOutputPath('../build')

  // the public path used by the web server to access the previous directory
  .setPublicPath('/themes/custom/vzbv_generic/build')

  // will create public/build/app.js and public/build/app.css
  .addEntry('main', './js/main.js')

  // enable source maps during development
  .enableSourceMaps(!Encore.isProduction())

  // empty the outputPath dir before each build
  .cleanupOutputBeforeBuild()

  // show OS notifications when builds finish/fail
  // .enableBuildNotifications()

  // https://symfony.com/blog/encore-0-21-0-webpack-4-support-copy-files-support-webpackencorebundle
  .disableSingleRuntimeChunk()
  // .enableSingleRuntimeChunk()

  // create hashed filenames (e.g. app.abc123.css)
  // .enableVersioning()

  // allow scss files to be processed
  .enableSassLoader(function(sassOptions) {}, {
      
      resolveUrlLoader: false
  })

  // Loaders

  .addLoader({

    test: /\.riot$/,
    use: [
      {
        loader: 'babel-loader', 
        options: {
        
          presets: [
           
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: '3.6'
              }
            ]
          ]
        }
      },      
      {
        loader: '@riotjs/webpack-loader',
        options: {
        
          hot: false, 
        }
      },
    ]
  })

  .addLoader({ 

    test: /\.js$/, 
    exclude: /node_modules\/(?!riot)/,
    use: {

      loader: 'babel-loader', 
      options: {
      
        presets: [
         
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: '3.6'
            }
          ]
        ]
      }
    }
  })

  // https://symfony.com/doc/current/frontend/encore/postcss.html
  // https://github.com/browserslist/browserslist
  // https://github.com/postcss/autoprefixer
  .enablePostCssLoader()
;

const config = Encore.getWebpackConfig();

// Cf.:
// - https://github.com/symfony/webpack-encore/issues/200
// - https://stackoverflow.com/a/46615143
config.externals = {
  
  // Make Webpack use an externally bound jQuery whenever it meets a required/imported one
  jquery: 'jQuery'
};

// Export final config
module.exports = function (env, argv) {

  // Whether or not we're building for production
  const is_production = argv['mode'] && argv['mode'] == 'production';

  if (!is_production) {

    return config;
  }

  // Deliver a source map
  config.devtool = 'source-maps';

  return config;
};
