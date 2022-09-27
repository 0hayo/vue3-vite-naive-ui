<template>
  <CModal :style="style">
    <n-data-table :columns="columns" :data="warningList" :bordered="false" :max-height="800" virtual-scroll
      :theme-overrides="tableThemeOverrides" />
  </CModal>
</template>

<script setup lang="ts">
import CModal from './CModal.vue';
import { TableProps } from 'naive-ui'
import { h, onMounted, provide, reactive, ref, watch } from 'vue';
import EquipmentApi from '@/api/equipment';
import { ResultList, WarningObj } from '@/typings/global'
import { eqType } from '@/utils';
type TableThemeOverrides = NonNullable<TableProps['themeOverrides']>
const tableThemeOverrides: TableThemeOverrides = {
  tdColorModal: 'rgba(0,0,0,0)',
  thColorModal: 'rgba(0,0,0,0)',
  tdTextColor: 'rgba(255, 255, 255, 0.7)',
  thTextColor: '#38C6FE',
  borderColorModal: 'rgba(255, 255, 255, 0.1)'
}

onMounted(() => {
  getWarningLog();
})

provide('updateTime', (v, f) => {
  // time.value = v;
  console.log('更新数据', v, f);
  params.beginDate = f[0];
  params.endDate = f[1];
  getWarningLog();
});

const { time } = defineProps({
  time: {
    required: true,
    type: Object
  }
})

watch(() => time.value, (v) => {
  console.log(v)
})

const style = {
  width: '620px',
  height: '910px'
}
const columns = [
  {
    title: '异常时间',
    key: 'beginTime',
  },
  {
    title: '异常设备',
    key: 'deviceId',
    render(row) {
      const text = eqType[row.type];
      const i = row.deviceId.split(row.type)[1];
      return h('span', `「${text}」${i}号设备`)
    }
  },
  {
    title: '设备状态',
    key: 'id',
    render(row) {
      return h('span', '离线')
    }
  }
]

const warningList = ref<Array<WarningObj>>([])
const params = reactive({
  pageNum: 0,
  pageSize: 0,
  beginDate: '',
  endDate: ''
});
const getWarningLog = async () => {
  try {
    const data = await EquipmentApi.exceptionLogs<ResultList<WarningObj>>(params);
    const list = data.result.list;
    warningList.value = list;
    console.log(warningList.value);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
.c-modal {
  .n-data-table .n-data-table-tr:not(.n-data-table-tr--summary):hover {
    background-color: rgba(18, 32, 51, 0)
  }

  .n-data-table .n-data-table-tr:not(.n-data-table-tr--summary):hover .n-data-table-td {
    background-color: rgba(18, 32, 51, 0)
  }
}
</style>