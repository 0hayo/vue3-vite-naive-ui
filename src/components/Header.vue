<template>
  <div class="header">
    <div class="time-data">
      <div class="time">{{ time }}</div>
      <div class="divider"></div>
      <div class="week-data">
        <div class="week">{{ week }}</div>
        <div class="data">{{ data }}</div>
      </div>
    </div>
    <div class="project-name">雷达水声探测周界安防系统</div>
    <div class="user-control">
      <svg-icon iconClass="touxiang" className="touxiang" />
      <div>
        <p class="name">{{ userInfo.nickname }}</p>
        <p class="no">编号：000001</p>
      </div>
      <div class="min-close">
        <n-button secondary strong @click="changeFullScreen">
          <template #icon>
            <n-icon>
              <svg-icon v-if="!fullScreen" iconClass="expandHorizontal" class="ctr-icon" className="ctr-icon" />
              <svg-icon v-if="fullScreen" iconClass="shrinkHorizontal" class="ctr-icon" className="ctr-icon" />
            </n-icon>
          </template>
        </n-button>
        <n-button secondary strong @click="launchFull">
          <template #icon>
            <n-icon>
              <svg-icon v-if="isFull" iconClass="expand" class="ctr-icon" className="ctr-icon" />
              <svg-icon v-else iconClass="shrink" class="ctr-icon" className="ctr-icon" />
            </n-icon>
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, Ref, ref } from 'vue';
import { FormatDate, launchFullscreen, TimeType } from '../utils';
import { NButton, NIcon } from 'naive-ui';
import { getUserInfo } from '@/utils/index';

const userInfo = getUserInfo();

const fullScreen = inject('fullScreen') as Ref<Boolean>;
const setFullScreen = inject('setFullScreen') as Function;

const changeFullScreen = () => {
  setFullScreen(!fullScreen.value)
}

let time = ref('');
let data = ref('');
let week = ref('');
onMounted(() => {
  getTimes();
  setInterval(() => {
    getTimes();
  }, 60000)
})
const getTimes = () => {
  const timeArr = FormatDate(new Date(), TimeType.all);
  data.value = timeArr[0];
  time.value = timeArr[1];
  week.value = timeArr[2];
}

const isFull = ref(true);
const launchFull = () => {
  launchFullscreen();
  isFull.value = document.fullscreenElement !== null;
}
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 74px;
  background: url('@/assets/headerbg.png') no-repeat;
  background-size: cover;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
}

.time-data {
  display: flex;
  align-items: center;
  padding: 20px;
  width: 230px;

  .time {
    line-height: 74px;
    font-weight: 400;
    font-size: 34px;
    background: linear-gradient(270deg, #FFFFFF 0%, #32C5FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    // text-fill-color: transparent;
  }

  .divider {
    width: 1px;
    height: 100%;
    background-color: #fff;
    margin: 0 20px;
  }

  .week-data {
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }
}

.project-name {
  font-weight: 500;
  font-size: 32px;
  line-height: 90px;
  background: linear-gradient(180deg, #FFFFFF 0%, #38C6FE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  // text-fill-color: transparent;
  // text-shadow: 0px 0px 2px #0D1B2A;
}

.user-control {
  display: flex;
  align-items: center;
  padding: 20px 0 20px 20px;
  width: 230px;

  .touxiang {
    border: 1px solid rgba(50, 197, 255, 0.7);
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 35px;
    margin-right: 10px;
    background: #D8D8D8;
  }

  .name {
    font-size: 14px;
    color: #32C4FE;
  }

  .min-close {
    height: 100%;
    margin-top: -20px;

    .ctr-icon {
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>
