<template>
  <div class="page">
    <img v-if="getIsDarkSide" src="@/assets/darth-maul.svg" class="top-face" />
    <img v-if="!getIsDarkSide" src="@/assets/chewbacca.svg" class="top-face" />
    <PageTitle title="People" />
    <DataTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageTitle, DataTable } from '@/components'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'PeopleView',
  components: {
    PageTitle,
    DataTable,
  },
  computed: {
    ...mapGetters(['getIsDarkSide']),
  },
})
</script>

<style>
.page {
  padding-top: 10px;
}
.top-face {
  height: 170px;
}
</style>
