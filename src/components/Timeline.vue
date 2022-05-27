<template>
  <box-solt :style="style" titleIcon="light" moreIcon="close" RTName="查看更多" :RTHandle="RTHandle">
    <n-scrollbar class="c-scrollbar" style="max-height: 100%; padding: 10px; box-sizing: border-box">
      <n-timeline style="padding-left: 70px; width: auto;">
        <n-timeline-item v-for="warning in warningList" :key="warning.id">
          <div class="timeline-item">
            <div class="timeline-item_warning">
              <p>{{ splitEqName(warning.deviceId, warning.type) }}号设备 「{{ eqType(warning.type) }}」</p>
              <p>警告：发现入侵报警信号</p>
            </div>
            <div class="timeline-item_icon">
              <svg-icon iconClass="fieldTime" class="dingwei" />定位设备
            </div>
          </div>
          <div class="timeline-item_time">
            <p>{{ warningTime(warning.beginTime, 1) }}</p>
            <p>{{ warningTime(warning.beginTime, 0) }}</p>
          </div>
          <template #icon>
            <svg-icon iconClass="fieldTime" class="icon" />
          </template>
        </n-timeline-item>
        <!-- <n-timeline-item>
          <div class="timeline-item">
            <div class="timeline-item_warning">
              <p>1号设备 「雷达」</p>
              <p>警告：发现入侵报警信号</p>
            </div>
            <div class="timeline-item_icon">
              定位设备
            </div>
          </div>
          <div class="timeline-item_time">
            <p>20:46</p>
            <p>2018-04-03</p>
          </div>
          <template #icon>
            <svg-icon iconClass="fieldTime" class="icon" />
          </template>
        </n-timeline-item>
        <n-timeline-item>
          <div class="timeline-item">
            <div class="timeline-item_warning">
              <p>1号设备 「雷达」</p>
              <p>警告：发现入侵报警信号</p>
            </div>
            <div class="timeline-item_icon">
              定位设备
            </div>
          </div>
          <div class="timeline-item_time">
            <p>20:46</p>
            <p>2018-04-03</p>
          </div>
          <template #icon>
            <svg-icon iconClass="fieldTime" class="icon" />
          </template>
        </n-timeline-item>
        <n-timeline-item>
          <div class="timeline-item">
            <div class="timeline-item_warning">
              <p>1号设备 「雷达」</p>
              <p>警告：发现入侵报警信号</p>
            </div>
            <div class="timeline-item_icon">
              定位设备
            </div>
          </div>
          <div class="timeline-item_time">
            <p>20:46</p>
            <p>2018-04-03</p>
          </div>
          <template #icon>
            <svg-icon iconClass="fieldTime" class="icon" />
          </template>
        </n-timeline-item>
        <n-timeline-item>
          <div class="timeline-item">
            <div class="timeline-item_warning">
              <p>1号设备 「雷达」</p>
              <p>警告：发现入侵报警信号</p>
            </div>
            <div class="timeline-item_icon">
              定位设备
            </div>
          </div>
          <div class="timeline-item_time">
            <p>20:46</p>
            <p>2018-04-03</p>
          </div>
          <template #icon>
            <svg-icon iconClass="fieldTime" class="icon" />
          </template>
        </n-timeline-item>
        <n-timeline-item>
          <div class="timeline-item">
            <div class="timeline-item_warning">
              <p>1号设备 「雷达」</p>
              <p>警告：发现入侵报警信号</p>
            </div>
            <div class="timeline-item_icon">
              定位设备
            </div>
          </div>
          <div class="timeline-item_time">
            <p>20:46</p>
            <p>2018-04-03</p>
          </div>
          <template #icon>
            <svg-icon iconClass="fieldTime" class="icon" />
          </template>
        </n-timeline-item>
        <n-timeline-item>
          <div class="timeline-item">
            <div class="timeline-item_warning">
              <p>1号设备 「雷达」</p>
              <p>警告：发现入侵报警信号</p>
            </div>
            <div class="timeline-item_icon">
              定位设备
            </div>
          </div>
          <div class="timeline-item_time">
            <p>20:46</p>
            <p>2018-04-03</p>
          </div>
          <template #icon>
            <svg-icon iconClass="fieldTime" class="icon" />
          </template>
        </n-timeline-item>
        <n-timeline-item>
          <div class="timeline-item">
            <div class="timeline-item_warning">
              <p>1号设备 「雷达」</p>
              <p>警告：发现入侵报警信号</p>
            </div>
            <div class="timeline-item_icon">
              定位设备
            </div>
          </div>
          <div class="timeline-item_time">
            <p>20:46</p>
            <p>2018-04-03</p>
          </div>
          <template #icon>
            <svg-icon iconClass="fieldTime" class="icon" />
          </template>
        </n-timeline-item> -->
      </n-timeline>
    </n-scrollbar>
  </box-solt>
  <WarningLog :time="time"></WarningLog>
</template>
<script lang="ts" setup>
import { NTimeline, NTimelineItem, NScrollbar } from 'naive-ui';
import BoxSolt from '@/components/BoxSolt.vue';
import WarningLog from '@/components/WarningLog.vue';
import { provide, ref, reactive, onMounted } from 'vue';
import EquipmentApi from '@/api/equipment';
import { WarningObj, ResultList } from '@/typings/global';

onMounted(() => {
  getWarningLog();
})


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

// provide('updateTime', (v, f) => {
//   time.value = v;
//   console.log('更新数据', time);
// });

const style = {
  width: '400px',
  height: '455px',
};

const RTHandle = () => {
  // 查看更多
  showCModal.value = true;
};

const warningList = ref<Array<WarningObj>>([]);
const getWarningLog = async () => {
  try {
    const params = {
      pageNum: 1,
      pageSize: 20
    }
    const data = await EquipmentApi.alarmLogs<ResultList<WarningObj>>(params);
    const list = data.result.list;
    warningList.value = list;
  } catch (error) {
    console.log(error);
  }
};
const splitEqName = (name: string, type: string) => {
  let textArr: Array<string> = [];
  switch (type) {
    case 'radar':
      textArr = name.split('radar');
      break;
    case 'sonar':
      textArr = name.split('sonar');
      break;
    case 'dt':
      textArr = name.split('dt');
      break;
    default:
      break;
  }
  return textArr[1];
}
const eqType = (type: string) => {
  switch (type) {
    case 'radar':
      return '雷达';
    case 'sonar':
      return '声纳';
    case 'dt':
      return '地听';
    default:
      break;
  }
}
const warningTime = (time: string, i: number) => {
  const timeArr = time.split(' ');
  return timeArr[i];
}
</script>
<style lang="scss" scoped>
.timeline-item {
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  position: relative;
  min-height: 50PX;

  &_warning {
    margin-top: -10px;

    p {
      max-width: 160px;
    }

    p:last-child {
      margin-top: 8px;
    }
  }

  &_time {
    position: absolute;
    top: 0;
    left: -70px;
    color: #FFFFFF;
    font-size: 10px;
    text-align: center;
  }

  &_icon {
    display: none;
    margin-top: -10px;

    .dingwei {
      margin-right: 6px;
    }
  }

  &:hover {
    color: #FFFFFF;

    p:last-child {
      font-size: 14px;
      color: #F7B500;
    }

    .timeline-item_icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
<style lang="scss">
.c-scrollbar {
  .n-timeline .n-timeline-item .n-timeline-item-timeline .n-timeline-item-timeline__line {
    bottom: 5px;
    top: 20px;
    background-color: #32C5FF;
  }
}
</style>