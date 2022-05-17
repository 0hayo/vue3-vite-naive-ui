<template>
  <n-message-provider>
    <MessageApi />
  </n-message-provider>
  <n-notification-provider>
    <n-config-provider :locale="locale" :date-locale="dateLocale">
      <router-view></router-view>
    </n-config-provider>
  </n-notification-provider>
</template>

<script lang="ts" setup>
import MessageApi from '@/components/MessageApi.vue';
import { zhCN, dateZhCN } from 'naive-ui';
import type { NLocale, NDateLocale } from 'naive-ui';
import { onMounted, ref } from 'vue';
import EquipmentApi from '@/api/equipment';
import { useStore } from 'vuex';

const store = useStore();

const locale = ref<NLocale>(zhCN);
const dateLocale = ref<NDateLocale>(dateZhCN);

onMounted(() => {
  getDeviceList();
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

<style>
</style>
