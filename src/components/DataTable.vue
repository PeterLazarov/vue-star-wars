<template>
  <a-table
    :columns="columns"
    :data-source="people"
    rowKey="url"
    class="components-table-demo-nested"
  >
    <template #expandedRowRender>
      <a-table
        :columns="innerColumns"
        :data-source="innerData"
        :pagination="false"
      >
      </a-table>
    </template>
  </a-table>
</template>
<script lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import { useEnrichedPeopleTableData } from '@/hooks'

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Height', dataIndex: 'height', key: 'height' },
  { title: 'Mass', dataIndex: 'mass', key: 'mass' },
  { title: 'Created', dataIndex: 'created', key: 'created' },
  { title: 'Edited', dataIndex: 'edited', key: 'edited' },
  { title: 'Homeworld', dataIndex: 'homeworld', key: 'homeworld' },
]

const innerColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Diameter', key: 'state' },
  { title: 'Climate', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Population', dataIndex: 'upgradeNum', key: 'upgradeNum' },
]

interface innerDataItem {
  key: number
  date: string
  name: string
  upgradeNum: string
}

const innerData: innerDataItem[] = []
for (let i = 0; i < 3; i = i + 1) {
  innerData.push({
    key: i,
    date: '2014-12-24 23:12:00',
    name: `This is production name ${i + 1}`,
    upgradeNum: 'Upgraded: 56',
  })
}

export default defineComponent({
  components: {
    DownOutlined,
  },
  setup() {
    const { people, planets } = useEnrichedPeopleTableData()

    // todo: other stuff wtf
    return {
      people,
      planets,
      columns,
      innerColumns,
      innerData,
    }
  },
})
</script>
