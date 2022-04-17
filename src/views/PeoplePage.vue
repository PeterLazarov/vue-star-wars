<template>
  <div class="content">
    <div class="header">
      <HeadTitle title="People" />
      <SearchInput
        :value="search"
        placeholder="ex: Han Solo"
        @search="onSearch"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeadTitle from '@/components/HeadTitle.vue'
import SearchInput from '@/components/SearchInput.vue'
import { usePeopleFindInifite } from '@/api'

export default defineComponent({
  name: 'PeopleView',
  setup() {
    const {
      isLoading, isError, isFetching, data, error, refetch,
    } = usePeopleFindInifite()

    return {
      isLoading,
      isError,
      isFetching,
      data,
      error,
      refetch,
      HeadTitle,
      SearchInput,
    }
  },
})
</script>
