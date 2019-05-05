import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class ContentEditable extends Vue {
    @Prop() private parentContent!: string;

    private lastContent = '';
    private localConent = '';

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
