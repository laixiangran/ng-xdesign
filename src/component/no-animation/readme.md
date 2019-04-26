# no-animation

禁止当前元素的动画

## Usage

```html
<div 
    [nbNoAnimation]="[key: string] : Boolean"
    [@slideAnimation]="[key: string] : Boolean"
    ></div>
```

```typescript

// 第一种组件内部，禁止方法
@Component({
  animations: [slideAnimation],
});

// 第二种模块内部，禁止方法
// 在模块中使用 NoopAnimationsModule 替换 BrowserAnimationsModule
@NgModule({ imports : [ ..., NoopAnimationsModule ] })

```



