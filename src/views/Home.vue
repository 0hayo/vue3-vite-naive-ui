<template>
  <div class="content">
    <Map></Map>
    <Header></Header>
    <div class="left" :class="fullScreen ? 'left_yc' : ''">
      <Timeline />
      <LineChart />
      <EquipmentState />
    </div>
    <div class="right" :class="fullScreen ? 'right_yc' : ''">
      <MinVideo v-show="!loading" />
      <RadarChart />
      <SonarChart />
    </div>
  </div>
  <div v-if="loading" class="loading">
    <img src="../assets/loading.gif" alt="">
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue';
import Map from '@/components/Map.vue';
import Header from '@/components/Header.vue';
import Timeline from '@/components/Timeline.vue';
import LineChart from '@/components/LineChart.vue';
import EquipmentState from '@/components/EquipmentState.vue';
import MinVideo from '@/components/video/MinVideo.vue';
import RadarChart from '@/components/radar/RadarChart.vue';
import SonarChart from '@/components/SonarChart.vue';
import EquipmentApi from '@/api/equipment';
import { useStore } from 'vuex';

const store = useStore();

const loading = ref(true);
let fullScreen = ref(false);

provide('fullScreen', fullScreen)
provide('setFullScreen', (value: boolean) => {
  fullScreen.value = value
})

onMounted(() => {
  getDeviceList();
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});

const getDeviceList = async () => {
  try {
    const data = await EquipmentApi.getDeviceList();
    const list = data.result;
    console.log(list);
    const radar = list.filter((v) => v.type === 'radar');
    const sonar = list.filter((v) => v.type === 'sonar');
    const dt = list.filter((v) => v.type === 'dt');
    store.dispatch('updateRadar', radar);
    store.dispatch('updateSonar', sonar);
    store.dispatch('updateDt', dt);
  } catch (error) {
    console.log(error);
  }
};

</script>

<style lang="scss" scoped>
.content {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  // pointer-events: none;
  .left {
    position: absolute;
    top: 94px;
    left: 20px;
    width: 400px;
    height: calc(100vh - 150px);
    transition: 1s left ease;
    // background: linear-gradient(270deg, #060C16 0%, rgba(9, 28, 45, 0.9) 50.06%, #11182D 101.04%);
    // box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
  }

  .right {
    position: absolute;
    top: 94px;
    right: 20px;
    width: 400px;
    height: calc(100vh - 150px);
    transition: 1s right ease;
    // background: linear-gradient(270deg, #060C16 0%, rgba(9, 28, 45, 0.9) 50.06%, #11182D 101.04%);
    // box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
  }

  .left_yc {
    left: -400px;
  }

  .right_yc {
    right: -400px;
  }
}

.loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>