<template>
  <BoxSolt :style="style" title="设备状态" titleIcon="deploymentUnit" RTName="查看更多" moreIcon="close" :RTHandle="RTHandle">
    <div class="eq-box">
      <div class="eq" v-for="item in equipments" :key="item.name">
        <p class="name">{{ item.name }}</p>
        <svg-icon :iconClass="item.icon" className="icon" />
        <p class="num">{{ item.num }}个</p>
        <p class="state">{{ item.state }}</p>
      </div>
    </div>
  </BoxSolt>
  <AllEqStates :time="time"></AllEqStates>
</template>

<script lang="ts" setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';
import BoxSolt from "@/components/BoxSolt.vue";
import AllEqStates from '@/components/AllEqStates.vue';
import { useStore } from 'vuex'

const store = useStore();
const radarList = computed(() => store.getters.radarList);
const sonarList = computed(() => store.getters.sonarList);
const dtList = computed(() => store.getters.dtList);
let time = reactive({
  value: []
});
let showCModal = ref(false)
provide('showCModal', showCModal)
provide('header', {
  title: '设备异常日志',
  iconClass: 'touxiang'
})

provide('close', () => {
  showCModal.value = false;
})

provide('updateTime', (v, f) => {
  time.value = v;
  console.log('更新数据', v, f);
})

const style = {
  width: "400px",
  height: "220px",
  marginTop: "20px",
};
const equipments = computed(() => [
  {
    name: '雷达',
    icon: 'subtract',
    num: radarList.value.length,
    state: '全部在线'
  },
  {
    name: '地听器',
    icon: 'frame',
    num: dtList.value.length,
    state: '全部在线'
  },
  {
    name: '声纳',
    icon: 'vector',
    num: sonarList.value.length,
    state: '全部在线'
  }
])

const RTHandle = () => {
  // 查看更多
  showCModal.value = true;
}
</script>
<style lang="scss" scoped>
.eq-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .eq {
    text-align: center;
    font-size: 14px;

    .name,
    .num {
      background: linear-gradient(270deg, #FFFFFF 0%, #32C5FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }

    .state {
      color: #ECFFFB;
    }

    .icon {
      font-size: 32px;
    }
  }
}
</style>