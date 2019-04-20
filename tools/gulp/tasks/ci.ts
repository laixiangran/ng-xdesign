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

const masterBranch = 'master';
const developBranch = 'develop';

task('commit-dev', sequenceTask(
    'commit-dev-changes',
    'push-dev-changes'
));

task('release', sequenceTask(
    'bump-version',
    'changelog',
    'release-commit-changes',
    'create-new-tag',
    'github-release'
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

    return src('./package.json')
        .pipe(bump({type: bumpType})).on('error', gutil.log)
        .pipe(dest('./'));
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

task('commit-dev-changes', () => {
    const commitMsg = yargs.argv.m;
    return src('.')
        .pipe(git.add())
        .pipe(git.commit(commitMsg || '【Prerelease】Bumped version number'));
});

task('push-dev-changes', (cb: any) => {
    git.push('origin', developBranch, cb);
});

task('release-commit-changes', () => {
    const version = require(join(config.projectPath, 'package.json')).version;
    return src('.')
        .pipe(git.add())
        .pipe(git.commit(`chore(release): ${version}`));
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
        token: '5fb29c6995a00211e0ec7c0595803cf5143d7ab2'
    }, {
        preset: 'angular'
    }, done);
});
