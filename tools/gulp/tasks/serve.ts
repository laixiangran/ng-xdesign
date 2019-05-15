import { task } from 'gulp';
import { join } from 'path';
import { config } from '../utils/config';
import { sequenceTask } from '../utils/sequence-task';

const serve = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddelware = require('webpack-dev-middleware');
const webpackHotMiddelware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');
const helper = require('../../../config/helper');
const interceptor = require('../../../config/interceptor');
const devConfigPath = join(config.webpackConfigPath, 'webpack.dev');

task('serve', sequenceTask('clean', 'docs', ':serve'));

task(':serve', () => {
    const devConfig = require(devConfigPath);
    const appEntry = devConfig.entry.app;
    devConfig.entry.app = [
        'webpack-hot-middleware/client?noInfo=true&reload=true',
        ...appEntry
    ];
    const proxyConfig = helper.getProxyConfig();

    let target = proxyConfig.host;
    if (proxyConfig.port) {
        target = target += ':' + proxyConfig.port + '/';
    }

    if (proxyConfig.path) {
        target = target + proxyConfig.path;
    }

    const compiler = webpack(devConfig);

    serve({
        port: process.env.PORT || 9009,
        open: true,
        server: { baseDir: config.appPath },
        middleware: [
            helper.isProxy()
                ? proxyMiddleware(proxyConfig.prefix, { target })
                : interceptor,
            webpackDevMiddelware(compiler, {
                stats: {
                    chunks: false,
                    modules: false
                },
                publicPath: devConfig.output.publicPath
            }),
            webpackHotMiddelware(compiler)
        ]
    });

    // 监听模拟数据改变，自动刷新
    // serve.watch(root + '/mock/**/*.js').on('change', serve.reload);
    // serve.watch(root + '/index.html').on('change', serve.reload);
});
