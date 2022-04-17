<template>
  <div class="content">
    <div class="header">
      <HeadTitle title="People" />
        
    <div>
    
      <DataTable v-if="data" :data="data" :formattedData="formattedData"/>
      {{ data }}
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { HeadTitle, SearchInput, DataTable } from '@/components'
import { usePeopleFindInifite, Person } from '@/api'

export default defineComponent({
  name: 'PeopleView',
  components: {

    HeadTitle,
    SearchInput,
    DataTable,
  },
  setup() {
    const {
      isLoading, isError, isFetching, data, error, refetch,
    } = usePeopleFindInifite()

    const value = ref<string>('');

    const formattedData = computed(() => {
      return data.value
        ? data.value.pages
          .reduce((arr, page) => arr.concat(...page.results), [] as Person[] )
        : []
    })

    return {
      isLoading,
      isError,
      isFetching,
      data: formattedData,
      error,
      refetch,
      value
    }
  },
})
</script>
