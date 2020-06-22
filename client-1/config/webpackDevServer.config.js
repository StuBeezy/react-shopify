const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const config = require('../webpack.config');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = (proxy, allowedHost) => {
    console.log('allowed Host: ', allowedHost, host);
    return {
        disableHostCheck:
            !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        compress: true,
        clientLogLevel: 'none',
        contentBase: paths.appPublic,
        watchContentBase: true,
        hot: true,
        publicPath: config.output.publicPath,
        quiet: true,
        watchOptions: {
            ignored: ignoredFiles(paths.appSrc)
        },
        https: protocol === 'https',
        host,
        overlay: false,
        historyApiFallback: {
            disableDotRule: true
        },
        public: allowedHost,
        proxy,
        before(app, server) {
            app.use(evalSourceMapMiddleware(server));
            app.use(errorOverlayMiddleware());
            app.use(noopServiceWorkerMiddleware())
        }
    };
};
