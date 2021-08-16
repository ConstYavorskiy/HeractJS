var path = require('path');
const webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var LimitChunkCountPlugin = require('webpack/lib/optimize/LimitChunkCountPlugin');
var AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    entry: {
        'project': './scripts/project/Application.js'
    },
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname + '/wwwroot/js/'),
        filename: 'cmw.tracker.[name].bundle.js',
        chunkFilename: "[id].chunk.js",
        publicPath: path.resolve(__dirname + '/wwwroot/js/'),
        globalObject: 'this'
    },
    resolve: {
        modules: [
            path.resolve(__dirname + '/Scripts/'),
            path.resolve(__dirname + '/wwwroot/js/'),
            path.resolve(__dirname, "node_modules")
        ],
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.tsx'],
        alias: {
            coreui: path.resolve(__dirname + '/node_modules/comindware.core.ui/dist/core.js'),
            'comindware/core': path.resolve(__dirname + '/node_modules/comindware.core.ui/dist/core.js'),
            rootpath: path.resolve(__dirname + '/scripts/project'),
            recourcePath: path.resolve(__dirname + '/wwwroot/resources'),
            sharedpath: path.resolve(__dirname + '/scripts/project/shared'),
            prism: path.resolve(__dirname + '/scripts/lib/prism/prism.js'),
            shared: path.resolve(__dirname + '/scripts/project/shared/bootstrap.js'),
            demoPage: path.resolve(__dirname + '/scripts/project/demo/helpers'),
            demoInitializer: path.resolve(__dirname + '/scripts/project/demo/Initializer'),
            listInitializer: path.resolve(__dirname + '/scripts/project/list/Initializer'),
            ganttInitializer: path.resolve(__dirname + '/scripts/project/gantt/Initializer'),
            formInitializer: path.resolve(__dirname + '/scripts/project/form/Initializer'),
            profileAboutInitializer: path.resolve(__dirname + '/scripts/project/profile/aboutandextras/Initializer'),
            profileNotificationInitializer: path.resolve(__dirname + '/scripts/project/profile/notificationSettings/Initializer'),
            profileProfileInitializer: path.resolve(__dirname + '/scripts/project/profile/profile/Initializer'),
            navigation: path.resolve(__dirname + '/scripts/project/navigation/module.js'),
            LANGMAPEN: path.resolve(__dirname + '/wwwroot/js/compiled/localizationMap.en.js'),
            appMediator: path.resolve(__dirname + '/scripts/services/ApplicationMediator'),
            ganttView: path.resolve(__dirname + '/scripts/GanttChart/GanttViewInitializer'),
            form: path.resolve(__dirname + '/scripts/project/form')
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'ts-loader',
            options: {}
        }, {
            test: /\.hbs$/,
            loader: "handlebars-loader"
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /^text-loader!/,
            loader: "text-loader"
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 1,
                        import: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        sourceMap: true,
                        plugins: () => [autoprefixer()]
                    }
                }
            ]
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets:  [ "es2015"]
            }
        }]
    },
    plugins: [
        // new CommonsChunkPlugin({ name: 'commons', filename: 'commons.js' }),
        new LimitChunkCountPlugin({ maxChunks: 1 }),
        new AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin()
        //new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.optimize.UglifyJsPlugin()
    ],
    //eslint: { emitError: true },
};
