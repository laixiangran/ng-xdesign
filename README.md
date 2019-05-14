# ng-xdesign-test

[![Build Status](https://travis-ci.com/laixiangran/ng-xdesign-test.svg?branch=develop)](https://travis-ci.com/laixiangran/ng-xdesign-test)
[![codecov](https://codecov.io/gh/laixiangran/ng-xdesign-test/branch/develop/graph/badge.svg)](https://codecov.io/gh/laixiangran/ng-xdesign-test)
[![GitHub Release Date](https://img.shields.io/github/release-date/laixiangran/ng-xdesign-test.svg)](https://github.com/laixiangran/ng-xdesign-test/releases)
[![npm package](https://img.shields.io/npm/v/ng-xdesign-test.svg)](https://www.npmjs.com/package/ng-xdesign-test)
[![npm downloads](https://img.shields.io/npm/dm/ng-xdesign-test.svg)](https://www.npmjs.com/package/ng-xdesign-test)
[![GitHub License](https://img.shields.io/github/license/laixiangran/ng-xdesign-test.svg)](https://github.com/laixiangran/ng-xdesign-test/blob/master/LICENSE)

## start

```base
npm install ng-xdesign-test@latest
```

```javascript
import { NbButtonModule } from "ng-xdesign-test";
@NgModule({
    imports: [
        NbButtonModule
    ]
})
```

```html
<button nb-button></button>
```

## develop

```bash
$ npm install

$ npm start
```

## commit

include `git commit` and `git push`

```bash
npm run commit -- -m 'type(scope): subject'
```

[AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)

## lint

```bash
$ npm run lint
```

## test

```bash
npm run test-once

or

npm run test-watch
```

## e2e

```bash
npm run e2e
```

## build

```bash
npm run build
```

## release workflow

### merge develop

```
git checkout master
git merge develop
```

### release

```
npm run release
```

发布之后，可以去 [travis](https://travis-ci.com/laixiangran/ng-xdesign) 查看最新的发布情况。

如果没有问题，过几分钟后，travis 任务会自动推送最新的版本到 npm

### merge master and push

```
git checkout develop
git merge master
npm run commit -- -m 'type(scope): subject'
```

## Compose a component

Component code are in `src/component`.

You can use `gulp generate:component` to quickly scafford a component.

```bash
$ gulp generate:component --name your-component
```

A `your-component` folder will be created in `src/component`, and the contents are:

```bash
your-component
├── index.ts
├── public.api.ts
├── your-component.config.ts
├── your-component.html
├── your-component.less
├── your-component.module.ts
└── your-component.ts
```

and it will add your component entry to `src/component/index.ts`.

## Write a demo for your component

You can then write a demo to test your component in `src/demo`.

When you use `gulp generate:component --name your-component`, a folder will be generated in `src/demo` too.

```bash
your-component
├── index.ts
├── your-component.html
├── your-component.less
└── your-component.ts
```

But you will still config the `src/demo/app.router.ts` and `src/demo/app.module.ts`.

