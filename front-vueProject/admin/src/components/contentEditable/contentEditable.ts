import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component
export default class ContentEditable extends Vue {

    private lastContent = '';
    private localContent = '';

    private created(): void {
        this.localContent = this.$store.state.mdContent;

        this.localContent = this.localContent.replace(/[<>&"]/g, (c: string) => {
            const condition: { [key: string]: string } = {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                '"': '&quot;',
            };

            const result: any = condition[c];
            return result;
        });

        // 反映到store公共仓库
        this.$store.commit('saveContent', this.localContent);
    }

    /**
     * @description: 触发父组件事件
     */
    private emitChange(e: any): void {
        this.localContent = e.target.innerText;

        if (this.localContent !== this.lastContent) {
            this.lastContent = this.localContent;
            // 反映到store公共仓库
            this.$store.commit('saveContent', this.localContent);
        }
    }
}
