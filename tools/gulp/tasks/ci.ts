import { task, src, dest } from 'gulp';
import { sequenceTask } from '../utils/sequence-task';
import { join } from 'path';
import { config } from '../utils/config';

const bump = require('gulp-bump');
const gutil = require('gulp-util');
const git = require('gulp-git');

const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');

const yargs = require('yargs');

task('commit', sequenceTask(
    'commit-changes',
    'push-changes'
));

task('release', sequenceTask(
    'build:demo',
    'bump-version',
    'changelog',
    'commit-changes',
    'create-new-tag'
));

task('bump-version', () => {
    let bumpType = 'patch';

    if (yargs.argv.major) {
        bumpType = 'major';
    }
    else if (yargs.argv.minor) {
        bumpType = 'minor';
    } else if (yargs.argv.prerelease) {
        bumpType = 'prerelease';
    }

    src('./package.json')
        .pipe(bump({type: bumpType})).on('error', gutil.log)
        .pipe(dest('./'));

    return src('./src/component/package.json')
        .pipe(bump({type: bumpType})).on('error', gutil.log)
        .pipe(dest('./src/component/'));
});

task('changelog', () => {
    return src('./CHANGELOG.md', {
            buffer: false
        })
        .pipe(conventionalChangelog({
            preset: 'angular'
        }))
        .pipe(dest('./'));
});

task('commit-changes', () => {
    const commitMsg = yargs.argv.m;
    const version = require(join(config.projectPath, 'package.json')).version;
    return src('.')
        .pipe(git.add())
        .pipe(git.commit(commitMsg || `chore(release): ${version}`));
});

task('push-changes', (cb: any) => {
    git.push('origin', cb);
});

task('create-new-tag', (cb: any) => {
    const version = require(join(config.projectPath, 'package.json')).version;
    git.tag(version, 'Created Tag for version: ' + version, (error: any) => {
        if (error) {
            cb(error);
        }
        git.push('origin', {args: '--tags'}, cb);
    });
});

task('github-release', (done: any) => {
    conventionalGithubReleaser({
        type: 'oauth',
        token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
    }, {
        preset: 'angular'
    }, done);
});
