<template>
  <div class="page">
    <PageTitle title="People" />
    <DataTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageTitle, DataTable } from '@/components'

export default defineComponent({
  name: 'PeopleView',
  components: {
    PageTitle,
    DataTable,
  },
})
</script>

<style>
  .page {
    padding-top: 10px;
  }
</style>
