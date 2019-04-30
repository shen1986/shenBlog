<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-29 17:33:10
 -->
<template>
        <!-- onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable = "true" -->
    <div class="content-editable"
        contentEditable = "true"
        @input="emitChange"
        @blur="emitChange"
        v-html="localConent" >
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ContentEditable extends Vue {
    @Prop() parentContent!: string;

    data() {
        return {
            lastContent: '',
            localConent: ''
        }
    }

    created() {
        this.localConent = this.content ? this.content : '';

		this.localConent = this.localConent.replace(/[<>&"]/g, function(c) {
			return {
				'<': '&lt;',
				'>': '&gt;',
				'&': '&amp;',
				'"': '&quot;'
			}[c];
		});
    }

    /**
     * @description: 触发父组件事件
     */
    private emitChange(e): void {
        let content = e.target.innerText;

        if (content !== this.lastContent) {
            this.$emit('handleChange', content);
            this.lastContent = content;
        }
	}
}
</script>


<style lang="less" scoped>
.content-editable {
	margin: 6px 0 12px;
	padding: 6px 10px;
	border: 1px solid #ddd;
	color: #111;
	min-height: 360px;
	outline: none;
	overflow: auto;
	font-size: 16px;
	border-radius: 3px;
	white-space: pre-wrap;
	transition: all 400ms;
	&:focus {
		border-color: #49a9ee;
		box-shadow: 0 0 0 3px rgba(16,142,233,.2);
	}
}
</style>

