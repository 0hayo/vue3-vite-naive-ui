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
import { zhCN, dateZhCN } from 'naive-ui'
import type { NLocale, NDateLocale } from 'naive-ui'
import { ref } from 'vue';
// import { GlobalThemeOverrides } from 'naive-ui';

// const themeOverrides: GlobalThemeOverrides = {
//   common: {
//     primaryColor: '#FF0000'
//   },
//   Button: {
//     textColor: '#FF0000'
//   },
//   Table: {
//     tdColorModal: 'rgba(0, 0, 0, 0)'
//   }
// }

const locale = ref<NLocale>(zhCN)
const dateLocale = ref<NDateLocale>(dateZhCN)
</script>

<style>
</style>