<template>
  <CModal :style="style">
    <n-data-table :columns="columns" :data="data" :loading="data.length <= 0" :bordered="false" :max-height="800"
      virtual-scroll :theme-overrides="tableThemeOverrides" />
  </CModal>
</template>

<script setup lang="ts">
import CModal from './CModal.vue';
import { TableProps } from 'naive-ui'
import { h, watch } from 'vue';
type TableThemeOverrides = NonNullable<TableProps['themeOverrides']>
const tableThemeOverrides: TableThemeOverrides = {
  tdColorModal: 'rgba(0,0,0,0)',
  thColorModal: 'rgba(0,0,0,0)',
  tdTextColor: 'rgba(255, 255, 255, 0.7)',
  thTextColor: '#38C6FE',
  borderColorModal: 'rgba(255, 255, 255, 0.1)'
}

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
  // {
  //   type: 'selection',
  //   fixed: 'left'
  // },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Age',
    key: 'age',
  },
  {
    title: 'address',
    key: 'address',
  },
  // {
  //   title: 'Row',
  //   key: 'row',
  //   render(row, index) {
  //     return h('span', ['row ', index])
  //   }
  // }
]
const data = Array.apply(null, { length: 50000 } as any).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: index,
  address: `London, Park Lane no. ${index}`
}))
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