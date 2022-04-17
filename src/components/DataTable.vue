<template>
  <a-table
    :columns="columns"
    :data-source="people"
    rowKey="url"
    class="components-table-demo-nested"
  >
    <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>
    <template #bodyCell="{ text, column }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
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
import { DownOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref } from 'vue'
import { useEnrichedPeopleTableData } from '@/hooks'
import { Person } from '@/api'
import { compareAsc } from 'date-fns'

const searchInput = ref()

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: {
      compare: (a: Person, b: Person) => a.name.localeCompare(b.name),
    },
    customFilterDropdown: true,
    onFilter: (value: string, record: Person) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    sorter:  {
      compare: (a: Person, b: Person) =>
        (isNaN(Number(a.height)) ? -Infinity : Number(a.height)) -
        (isNaN(Number(b.height)) ? -Infinity : Number(b.height)),
    },
  },
  {
    title: 'Mass',
    dataIndex: 'mass',
    key: 'mass',
    sorter: {
      compare: (a: Person, b: Person) =>
        (isNaN(Number(a.mass)) ? -Infinity : Number(a.mass)) -
        (isNaN(Number(b.mass)) ? -Infinity : Number(b.mass)),
    },
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    sorter: {
      compare: (a: Person, b: Person) =>
        compareAsc(new Date(a.created), new Date(b.created)),
    },
  },
  {
    title: 'Edited',
    dataIndex: 'edited',
    key: 'edited',
    sorter: {
      compare: (a: Person, b: Person) =>
        compareAsc(new Date(a.edited), new Date(b.edited)),
    },
  },
  {
    title: 'Homeworld',
    dataIndex: 'homeworld',
    key: 'homeworld',
    sorter: {
      compare: (a: Person, b: Person) => a.homeworld.localeCompare(b.homeworld),
    },
    customFilterDropdown: true,
    onFilter: (value: string, record: Person) =>
      record.homeworld.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
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
    SearchOutlined,
  },
  setup() {
    const { people, planets } = useEnrichedPeopleTableData()

    const state = reactive({
      searchText: '',
      searchedColumn: '',
    })

    const handleSearch = (
      selectedKeys: string[],
      confirm: VoidFunction,
      dataIndex: string,
    ) => {
      confirm()
      state.searchText = selectedKeys[0]
      state.searchedColumn = dataIndex
    }

    const handleReset = (clearFilters: VoidFunction) => {
      clearFilters()
      state.searchText = ''
    }

    return {
      people,
      planets,
      columns,
      innerColumns,
      innerData,
      handleSearch,
      handleReset,
    }
  },
})
</script>
