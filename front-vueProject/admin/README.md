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
    - 这里为什么会有`undefined`,这可能是`vue-class-component`的另一个坑，就是`this`指向的问题，请参照官方文档。
    - 改造它之后就没有这个问题了
    ```typescript
    private form: any = null; // 参照官方的例子，这个设置成null就能响应了

    private created(): void {
        this.form = this.$form.createForm(this); // 在生命周期函数中再给它赋值
    }
    ```
    - 这个为什么不使用data的钩子来写呢，官方例子里面data钩子不是能够具有响应能力了么？
        + 在.vue文件里面写是可以的，为了实现代码分离把.ts单独分离出一个文件。这个时候如果你还用data钩子，那么下面所有用到这个变量的地方IDE都提示没有这个变量，应为IDE在.ts文件里面不懂什么是data钩子，以及一些只有vue具有的特性。所以.ts要借助`vue-class-component`来写才行。如果你不想实现ts与template的代码分离，把变量直接写在data钩子里面是最安全的做法。（IDE虽然提示报错，但是程序能正常运行，如果心里没有疙瘩，也可以使用data的写法）
    - 为什么要实现ts与template的代码分离？
        + 主要是感觉如果某个组件特别复杂，代码量特别多的时候，要在`template`和`script`之间来回滚动，会影响开发效率，如果分开，可以设置2个窗口并列，这样互相参照很方便。
        + 看《编写可维护的JavaScript》这本书，我的github对它有一点介绍，这本书的作者也认为，把分离做好能有利于维护
            * [MaintainableJavaScript](https://github.com/shen1986/MaintainableJavaScript)

2. this.$axios报错
    - 这个坑也很麻烦
    - 需要从type文件里面添加$axios但是又有了别的问题。
    - 所有我现在的项目有2个type文件，一个全局.vue用的，另一个是自定义组件用的。

3. 在.vue文件中引入 Message 不报错，在.ts 引入 Message 则报错。
    - 这个坑不容易被发现
    - 在.ts里面写，会自动验证types里面有没有这个定义，但是antd的type里面，没有这个定义，说明我在.vue里面的使用方法是错误的，messge直接导入就可以使用了，antd已经帮我们初始化好了。
    - .vue 里面虽然用法错误 但是为什么能正常使用？ 这可能是js不区分大小写的原因？ 我也不太懂。

4. 数字类型无法与 antd 的 form 进行绑定。
    - 用了:value="0",里面的值就变成数字类型了。不知道原因。
    - 直接value="0",这里面设置的东西都是string类型的。但是如果用:value感觉是不是会影响效率。因为牵涉到绑定了。先不管了以解决问题为优先。

5. Warning: You cannot set a form field before rendering a field associated with the value.
    - 通过google查了下，赋值的对象不能多于原来绑定的对象。我原来用的http返回多了一个content对象,使用 delete 又影响到了Vue的依赖收集的东西。vue里面又报错了。只好像下面一个一个赋值。
    - https://github.com/ant-design/ant-design/issues/12219
    ```javascript
    op.form.setFieldsValue({
        title: info.title,
        type: info.type,
        tag: info.tag,
        category: info.category,
        markdown: info.markdown,
    });
    ```

6. 同一个组件 updateXXX/:id -> addXXX 跳转的时候，画面没有重新加载。
    但是，不是同一个组件 文章列表 -> 文章添加 的时候， 画面会重新加载。
    好像路由就是这样的。但是这样的话，我从更新画面直接跳转到添加画面的时候，所有的数据感觉都留在了画面上面，现在能忍受吧，实在不行要么改布局，要么改成2个组件，一个添加，一个更新。感觉改布局比较好，现在这个布局我不太喜欢，用模态框来增删改查是我的最爱。

    - 最后还是做成2个组件吧，复制下改改，比改结构要快