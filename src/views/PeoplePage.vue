<template>
  <div class="content">
    <div class="header">
      <HeadTitle title="People" />
      <SearchInput />
    </div>
    <DataTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HeadTitle, SearchInput, DataTable } from '@/components'

export default defineComponent({
  name: 'PeopleView',
  components: {
    HeadTitle,
    SearchInput,
    DataTable,
  },
})
</script>
