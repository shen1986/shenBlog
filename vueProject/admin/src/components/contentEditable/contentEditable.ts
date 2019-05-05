import { Vue, Component, Prop } from 'vue-property-decorator';

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
            this.$emit('handleChange', content);
            this.lastContent = content;
        }
    }
}
