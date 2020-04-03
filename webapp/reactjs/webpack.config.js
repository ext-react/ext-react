const Path = require('path');
const PortFinder = require('portfinder');

module.exports = async function (env) {
    const get = (it, val) => {
        return env === undefined || env[it] === undefined ? val : env[it];
    };

    const rules = [
        {
            test: /.(js)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: Path.resolve(__dirname, './class-loader.js'),
                    options: {
                        namespace: 'React',
                        output: {
                            name: 'ExtRequires',
                            path: Path.resolve(__dirname, '../extjs/app/')
                        }
                    }
                },
                {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        "plugins": [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            ]
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
    ];

    const entry = {
        main: [
            "@babel/polyfill",
            Path.resolve(__dirname, './main.js')
        ]
    };

    const output = {
        path: Path.resolve(__dirname, '../extjs/resources/js'),
        filename: 'bundle.js'
    };

    const resolve = {
        alias: {
            src: Path.resolve(__dirname, './src'),
            lib: Path.resolve(__dirname, './lib'),
            css: Path.resolve(__dirname, './css')
        }
    };

    const plugins = [];

    const environment = get('environment', 'development');

    PortFinder.basePort = (env && env.port) || 3000;
    return PortFinder.getPortPromise().then(port => {
        return {
            devtool: (environment === 'development') ? 'inline-source-map' : 'source-map',
            entry: entry,
            output: output,
            plugins: plugins,
            module: { rules: rules },
            resolve: resolve,
            performance: { hints: false },
            stats: 'none',
            optimization: { noEmitOnErrors: true },
            node: false,
            devServer: {
                contentBase: Path.join(__dirname, '../extjs'),
                port: port,
                writeToDisk: true
            }
        };
    });
};
