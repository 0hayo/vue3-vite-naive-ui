<template>
  <div class="time-input">
    <p class="title">时间段查询</p>
    <n-date-picker type="datetimerange" size="small" clearable :on-update:value="updateTime" />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';

const updateTime = inject('updateTime')

</script>

<style lang="scss">
.time-input {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 10px 0;
  .title {
    margin: 0 10px 0 23px;
  }
}
</style>