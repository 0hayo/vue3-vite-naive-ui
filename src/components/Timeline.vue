<template>
	<BoxSolt :style="style" titleIcon="close" moreIcon="close">
		<n-scrollbar style="max-height: 100%; padding: 10px 30px; box-sizing: border-box;">
			<n-timeline>
				<n-timeline-item content="啊" />
				<n-timeline-item
					type="success"
					title="成功"
					content="哪里成功"
					time="2018-04-03 20:46"
				/>
				<n-timeline-item type="error" content="哪里错误" time="2018-04-03 20:46" />
				<n-timeline-item
					type="warning"
					title="警告"
					content="哪里警告"
					time="2018-04-03 20:46"
				/>
				<n-timeline-item
					type="info"
					title="信息"
					content="是的"
					time="2018-04-03 20:46"
					line-type="dashed"
				/>
				<n-timeline-item content="啊" />
			</n-timeline>
		</n-scrollbar>
	</BoxSolt>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { NTimeline, NTimelineItem, NScrollbar } from 'naive-ui';
import BoxSolt from '@/components/BoxSolt.vue';
export default defineComponent({
	name: 'Timeline',
	components: {
		NTimeline,
		NTimelineItem,
		NScrollbar,
		BoxSolt
	},
	setup() {
		const style = {
				width: '400px',
				height: '435px'
		}
		return {
			style
		}
	}
})
</script>
<style lang="scss" scoped>
</style>