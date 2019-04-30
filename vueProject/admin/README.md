<!--
 * @Description: 后台管理系统说明
 * @Author: shenxf
 * @Date: 2018-03-24 23:04:44
 -->
# 个人博客后台管理系统使用指南

- 调试阶段
```shell
npm run dev
```

- 编译
```shell
npm run build
```

## 备忘
- 之前忘记安装tslint 导致 tslint.json文件失效。

## 踩过的坑
1. antd 的 form 不起作用或则所有的Form控件都无法输入值。
    - 原因是因为要用 TypeScript 而引入了`vue-property-decorator`,而它内部引用了了`vue-class-component`，它是我用来实现ts和template代码分离的根本。
    - [vue-class-component](https://github.com/vuejs/vue-class-component)
        + 在他的使用说明里面写着这么一句话 `undefined will not be reactive`将它的例子复制过来
        ```javascript
        @Component
        class MyComp extends Vue {
            // Will not be reactive <- 这句话太重要了，如果一个变量一开始是undefined那么他将不会解析成为 data() {}这样的形式
            foo = undefined

            // Will be reactive
            bar = null

            data () {
                return {
                    // Will be reactive
                    baz: undefined
                }
            }
        }
        ```
    - antd官网提供的Form例子里面是这样写的
    ```javascript
    data () {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this),
        };
    },
    ```
    - 我把它翻译成typeScript 之后
    ```javascript
    // 直接在类里面声明就行了
    formLayout = 'horizontal';
    form = this.$form.createForm(this); // <- 问题出在这句话，这个东西可能在一开始的时候返回的是undefined
    ```
    - 改造它之后就没有这个问题了
    ```typescript
    private form: any = null; // 参照官方的例子，这个设置成null就能响应了

    private created(): void {
        this.form = this.$form.createForm(this); // 在生命周期函数中再给它赋值
    }
    ```

2. this.$axios报错
    - 这个坑也很麻烦

3. 在.vue文件中引入 Message 不报错，在.ts 引入 Message 则报错。
    - 这个坑不容易被发现

4. 