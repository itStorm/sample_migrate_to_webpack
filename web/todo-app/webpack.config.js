'use strict';

const webpack = require('webpack');
const path = require('path');

const dev = 'dev';
const prod = 'prod';
const NODE_ENV = (process.env.NODE_ENV) || dev;

let config = {
    // Абсолютный путь, где webpack начинает искать входные файлы/модули
    context: path.resolve(__dirname, "frontend"),
    // Задаем входные модули для генерации скриптов
    // Общий принцип, в идеале должен быть таким: один URL => один скрипт
    entry: {
        home: "home",
        view: "view"
    },
    // Выходные файлы скомпилированных скриптов
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
        // Говорит о том что exports модуля должно стать доступным глобальной области видимости,
        // при этом будет доступно в переменной с именем этого модуля (var home=..., view=....)
        library: '[name]',
        // URL - откуда брать модули при использовании данимической загрузки
        publicPath: '/todo-app/dist/'
    },
    plugins: [
        // Позволяет создавать глобальные переменные,
        // т.е. внутри кода можно использвоать просто dev и prod
        // в момент компиляции кода эти переменные будут заменены на их реальное знаечение
        new webpack.DefinePlugin({
            dev: JSON.stringify(dev),
            prod: JSON.stringify(prod)
        }),
        // Принцип примерно как у DefinePlugin, но данные переменные будут взяты из Environment.
        // В конретном примере если process.env.NODE_ENV не будет определен,
        // то будет использовваться переменная NODE_ENV.
        // При компиляции эта перемена будет доступна как `process.env.NODE_ENV` внутри модулей
        new webpack.EnvironmentPlugin({
            NODE_ENV: NODE_ENV
        }),
        // Автоматически подключает соотвествующий модуль если натыкается на данные переменные при парсинге модулей
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // Общие модули для всех скриптов
        // Будет скомпилирован общий commons.js который надо подлючать на страницу перед кодом entries
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons"
        }),
        // Общие модули для всех скриптов vendors.js который надо подлючать на страницу перед остальными скриптами
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            minChunks: function (module, count) {
                return module.context && module.context.indexOf("frontend/vendors_common") !== -1;
            }
        })
    ],
    // Секция указывает, где искать модули, в частности относится к модулям entries
    resolve: {
        modules: [
            path.resolve(__dirname, "frontend"),
            path.resolve(__dirname, "frontend/vendors"),
            path.resolve(__dirname, "frontend/vendors_common"),
            "node_modules"
        ],
        extensions: [".js", ".json"]
    },
    // Аналогично секции resolve, но работает толькодля loaders
    // т.е. указывает откуда их загружать
    resolveLoader: {
        modules: ["node_modules"],
        extensions: [".js", ".json"],
        // Указывает в каких полях package.json модоля-лоадера искать пути к входным файлам
        mainFields: ["loader", "main"]
    },
    module: {
        rules: [
            {
                test: /db\/index\.js$/,
                use: [
                    {
                        // Поместить экспорт файла к глобальное пространство
                        loader: 'expose-loader',
                        options: 'db'
                    },
                    {
                        // Создать экспорт в файле для переменной, если работа идет со старым кодом
                        loader: 'exports-loader',
                        options: 'db'
                    }
                ]
            },
            {
                test: /jquery\/index\.js$/,
                use: [
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            },
            // Для файлов c расширением *.js, кроме исключенных путей подключаем транспайлер Babel JS
            // дает возможности использовать все плюшки ES-2015 (для интересующихся https://learn.javascript.ru/es-modern)
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            cacheDirectory: true,
                            plugins: [
                                'transform-runtime',
                                'syntax-dynamic-import'
                            ]
                        }
                    }
                ]
            }
        ],
        // Данным параметром можно задать регулярное выражение для файлов которые не надо парсить
        // Но такой файл не должен включать зависимостей
        //noParse: /some_script/
    },
    // Генерировать JS map для отладки,
    // dev - включать карты в скомпилированный js, для prod - делать отдельные js.map файлы
    // !!! При включенном UglifyJSPlugin map файлы НЕ БУДУТ СОЗДАВАТЬСЯ
    devtool: NODE_ENV == dev ? 'cheap-inline-module-source-map' : 'source-map',
    // Работать в режиме watch, отслеживая сборку
    watch: NODE_ENV == dev
};

// Используем в prod режиме UglifyJSPlugin для минификации JS
if (NODE_ENV == prod) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}

module.exports = config;