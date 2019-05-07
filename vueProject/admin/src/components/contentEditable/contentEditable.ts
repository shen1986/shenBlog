import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component
export default class ContentEditable extends Vue {
    @Prop() private parentContent!: string;

    private lastContent = '';
    private localConent = '';

    /**
     * @description: 监视pContent
     * @param {any} val - 变化后路由
     * @param {any} oldVal - 变化前路由
     */
    @Watch('parentContent')
    private onChildChanged(val: string, oldVal: string): void {
        // console.log('var', val);
        this.localConent = val;
    }

    private created(): void {
        // this.localConent = this.content ? this.content : '';
        this.localConent =
            this.localConent.replace(/[<>&"]/g, (c: string) => {
                const condition: { [key: string]: string } = {
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                    '"': '&quot;',
                };

                const result: any = condition[c];
                return result;
            });
    }

    /**
     * @description: 触发父组件事件
     */
    private emitChange(e: any): void {
        const content = e.target.innerText;

        if (content !== this.lastContent) {
            // 返回给父组件
            this.parentHandleChange(content);
        }
    }

    /**
     * @description: 调用父组件handleChange方法
     * @param {string} content - 输入的内容
     * @return: 输入的内容
     */
    @Emit('handleChange')
    private parentHandleChange(content: string): void {
        this.lastContent = content;
    }
}
