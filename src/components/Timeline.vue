<template>
  <box-solt :style="style" titleIcon="close" moreIcon="close" RTName="查看更多" :RTHandle="RTHandle">
    <n-scrollbar style="max-height: 100%; padding: 10px 30px; box-sizing: border-box">
      <n-timeline>
        <n-timeline-item content="啊"></n-timeline-item>
        <n-timeline-item type="success" title="成功" content="哪里成功" time="2018-04-03 20:46"></n-timeline-item>
        <n-timeline-item type="error" content="哪里错误" time="2018-04-03 20:46"></n-timeline-item>
        <n-timeline-item type="warning" title="警告" content="哪里警告" time="2018-04-03 20:46"></n-timeline-item>
        <n-timeline-item type="info" title="信息" content="是的" time="2018-04-03 20:46" line-type="dashed">
        </n-timeline-item>
        <n-timeline-item content="啊"></n-timeline-item>
        <n-timeline-item content="啊"></n-timeline-item>
        <n-timeline-item content="啊"></n-timeline-item>
      </n-timeline>
    </n-scrollbar>
  </box-solt>
  <WarningLog :time="time"></WarningLog>
</template>
<script lang="ts" setup>
import { NTimeline, NTimelineItem, NScrollbar } from 'naive-ui';
import BoxSolt from '@/components/BoxSolt.vue';
import WarningLog from '@/components/WarningLog.vue';
import { provide, ref, reactive } from 'vue';

let time = reactive({
  value: []
});
let showCModal = ref(false);
provide('showCModal', showCModal);
provide('header', {
  title: '报警日志',
  iconClass: 'touxiang',
});

provide('close', () => {
  showCModal.value = false;
});

provide('updateTime', (v, f) => {
  time.value = v;
  console.log('更新数据', time);
});

const style = {
  width: '400px',
  height: '455px',
};

const RTHandle = () => {
  // 查看更多
  showCModal.value = true;
};
</script>
<style lang="scss" scoped>
</style>
