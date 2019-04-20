# ng-xdesign

[![Build Status](https://travis-ci.com/laixiangran/ng-xdesign.svg?branch=develop)](https://travis-ci.com/laixiangran/ng-xdesign)
[![codecov](https://codecov.io/gh/laixiangran/ng-xdesign/branch/develop/graph/badge.svg)](https://codecov.io/gh/laixiangran/ng-xdesign)
[![GitHub Release Date](https://img.shields.io/github/release-date/laixiangran/ng-xdesign.svg)](https://github.com/laixiangran/ng-xdesign/releases)
[![npm package](https://img.shields.io/npm/v/ng-xdesign-test.svg)](https://www.npmjs.com/package/ng-xdesign-test)
[![npm downloads](https://img.shields.io/npm/dm/ng-xdesign-test.svg)](https://www.npmjs.com/package/ng-xdesign-test)
[![GitHub License](https://img.shields.io/github/license/laixiangran/ng-xdesign.svg)](https://github.com/laixiangran/ng-xdesign/blob/master/LICENSE)


## start

```bash
$ npm install
```

## dev

```bash
$ npm run dev
```

### Compose a component

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

### Write a demo for your component

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

## build


### build component

to build your component:

```bash
$ npm run build
```

### build dev demo app

to build your demo app with aot:

```bash
$ npm run build:demo:aot
```

## lint

to lint your code:

```bash
$ npm run lint
```

## docs

to generate api docs and guide docs:

```bash
$ npm run docs
```

api docs will be in `docs/dist`.

guide docs will be in `docs/dist/guides`;

