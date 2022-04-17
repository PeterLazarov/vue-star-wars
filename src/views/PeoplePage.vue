<template>
  <div class="content">
    <div class="header">
      <HeadTitle title="People" />
    </div>
    <DataTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HeadTitle, DataTable } from '@/components'

export default defineComponent({
  name: 'PeopleView',
  components: {
    HeadTitle,
    DataTable,
  },
})
</script>
