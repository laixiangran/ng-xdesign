import { resolve } from 'path';

export const config = {
    projectPath: resolve('.'),
    appPath: resolve('./src'),
    moduleName: 'ng-xdesign-test',
    dist: resolve('./dist/ng-xdesign-test'),
    componentPath: resolve('./src/component'),
    demoPath: resolve('./src/demo'),
    umdPath: resolve('./dist/packages/bundle'),
    entry: resolve('./dist/packages/index.js'),
    tsconfigPath: resolve('./src/component/tsconfig.json'),
    scaffordPath: resolve('./scafford/component/**/*.**'),
    scaffordDemoPath: resolve('./scafford/demo/**/*.**'),
    devAppOutPath: resolve('./dist/devapp'),
    webpackConfigPath: resolve('./config')
};
