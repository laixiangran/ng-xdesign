import { task, src, dest } from 'gulp';
import { join } from 'path';
import { sequenceTask } from '../utils/sequence-task';
import { inlineAssetForDirectory } from '../utils/inline-asset';
import { copyTask } from '../utils/task_helpers';
import { config } from '../utils/config';
import { readFileSync, writeFileSync } from 'fs';
import { sync as glob } from 'glob';

const helper = require('../../../config/helper');
const webpack = require('webpack');
const devConfigPath = join(config.webpackConfigPath, 'webpack.dev');
const prodConfigPath = join(config.webpackConfigPath, 'webpack.prod');
const less = require('gulp-less');
const lessAutoprefix = require('less-plugin-autoprefix');
const autoprefixPlugin = new lessAutoprefix({ browsers: ['last 2 versions'] });
const gulpCleanCss = require('gulp-clean-css');

/**
 * default build task
 */
task('build', sequenceTask(
    'build:inline-assets',
    'build:assets',
    'copy-readme',
));

task('copy-readme', () => {
    const readmeFilePath = join(config.componentPath, '../../README.md');
    return src(readmeFilePath).pipe(dest(config.dist));
});

/**
 * process static assets, including html、less(css)、font and so on
 */
task('build:assets', sequenceTask([
    'build:copy:assetless',
    'build:copy:font',
    'build:copy:componentless',
    'build:compile:less',
], 'build:less:replacepath'));

/**
 * replace aot-compiled component's templateUrl to template, and styleUrls to styles
 */
task('build:inline-assets', () => {
    inlineAssetForDirectory(config.dist);
});

/**
 * copy asset less files to dist asset folder
 */
task('build:copy:assetless', copyTask(
    join(config.componentPath, '../asset/**/*.less'),
    join(config.dist, 'asset')
));

/**
 * copy component less files to dist component folder
 */
task('build:copy:componentless', copyTask(
    join(config.componentPath, '**/*.less'),
    join(config.dist, 'asset/less/component')
));

/**
 * fix some relative urls problem
 */
task('build:less:replacepath', (cb?: Function) => {

    // replace relative urls in component.less
    const componentLessFile = join(config.componentPath, '../asset/less/component.less');
    let content = readFileSync(componentLessFile, 'utf-8');
    content = content.replace(/\.\.\/\.\./g, '.');
    writeFileSync(join(config.dist, 'asset/less/component.less'), content, 'utf-8');

    // replace some font relative urls in built theme css files
    glob(join(config.dist, 'asset/css/theme/**/index.css')).forEach(filePath => {
        let cssContent = readFileSync(filePath, 'utf-8');
        cssContent = cssContent.replace(/theme\/font/g, '../../../font');
        writeFileSync(filePath, cssContent, 'utf-8');
    });

    if (cb) {
        cb();
    }
});

/**
 * copy fonts from src to dist
 */
task('build:copy:font', copyTask(
    join(config.componentPath, '../asset/font/**'),
    join(config.dist, 'asset/font')
));

/**
 * using gulp-less to compile less files to dist asset/css folder
 */
task('build:compile:less', () => {
    return src(join(config.componentPath, '../asset/less/**/*.less'))
        .pipe(less({
            plugins: [autoprefixPlugin]
        }))
        .pipe(gulpCleanCss())
        .pipe(dest(join(config.dist, 'asset/css')));
});

task('build:demo', sequenceTask('docs', 'build:demo:webpack', 'build:replace:basehref'));

task('build:demo:webpack', (cb?: Function) => {
    let buildConfig = require(prodConfigPath);

    if (helper.isDev()) {
        buildConfig = require(devConfigPath);
    }

    webpack(buildConfig, (err: any, stats: any) => {
        if (err) {
            console.log('webpack', err);
        }

        console.log('[webpack]', stats.toString({
            chunks: false,
            errorDetails: true
        }));

        if (cb) {
            cb();
        }
    });
});

task('build:replace:basehref', () => {
    const docsIndex = join(config.appPath, '../docs/index.html');
    let indexContent = readFileSync(docsIndex, 'utf-8');
    indexContent = indexContent.replace('base href="/"', 'base href="/ng-xdesign-test/"');
    writeFileSync(docsIndex, indexContent, 'utf-8');
});
