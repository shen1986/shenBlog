/**
 * @Description: markdown主编辑js
 * @Author: shenxf
 * @Date: 2019-05-07 19:49:12
 */
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component
export default class ContentEditable extends Vue {

    private lastContent = '';
    private localContent = '';

    private created(): void {
        this.lastContent = this.localContent = this.$store.state.mdContent;

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
        const content = e.target.innerText;

        if (content !== this.lastContent) {
            this.lastContent = content;
            // 反映到store公共仓库
            this.$store.commit('saveContent', content);
        }
    }
}
