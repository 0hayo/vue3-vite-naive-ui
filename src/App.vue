<template>
  <n-message-provider>
    <MessageApi />
  </n-message-provider>
  <n-notification-provider>
    <router-view></router-view>
  </n-notification-provider>
</template>

<script lang="ts" setup>
import MessageApi from '@/components/MessageApi.vue';
</script>

<style>
</style>