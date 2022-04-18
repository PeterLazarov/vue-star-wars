<template>
  <a-table
    :columns="columns"
    :data-source="people"
    rowKey="url"
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
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #expandedRowRender="{ record }">
      <a-table
        :columns="innerColumns"
        :data-source="[planetDict[record.homeworld]]"
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
import { PersonTableModel } from '@/models'
import { compareAsc } from 'date-fns'

const searchInput = ref()

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: {
      compare: (a: PersonTableModel, b: PersonTableModel) => a.name.localeCompare(b.name),
    },
    customFilterDropdown: true,
    onFilter: (value: string, record: PersonTableModel) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
    multiple: 3,
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    sorter: {
      compare: (a: PersonTableModel, b: PersonTableModel) =>
        (isNaN(Number(a.height)) ? -Infinity : Number(a.height)) -
        (isNaN(Number(b.height)) ? -Infinity : Number(b.height)),
      multiple: 5,
    },
  },
  {
    title: 'Mass',
    dataIndex: 'mass',
    key: 'mass',
    sorter: {
      compare: (a: PersonTableModel, b: PersonTableModel) =>
        (isNaN(Number(a.mass)) ? -Infinity : Number(a.mass)) -
        (isNaN(Number(b.mass)) ? -Infinity : Number(b.mass)),
      multiple: 4,
    },
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    sorter: {
      compare: (a: PersonTableModel, b: PersonTableModel) =>
        compareAsc(new Date(a.created), new Date(b.created)),
      multiple: 1,
    },
  },
  {
    title: 'Edited',
    dataIndex: 'edited',
    key: 'edited',
    sorter: {
      compare: (a: PersonTableModel, b: PersonTableModel) =>
        compareAsc(new Date(a.edited), new Date(b.edited)),
      multiple: 2,
    },
  },
  {
    title: 'Homeworld',
    dataIndex: 'homeworldName',
    key: 'homeworldName',
    sorter: {
      compare: (a: PersonTableModel, b: PersonTableModel) => a.homeworldName.localeCompare(b.homeworldName),
      multiple: 6,
    },
    customFilterDropdown: true,
    onFilter: (value: string, record: PersonTableModel) =>
      record.homeworldName.toString().toLowerCase().includes(value.toLowerCase()),
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
  { title: 'Diameter', dataIndex: 'diameter', key: 'diameter' },
  { title: 'Climate', dataIndex: 'climate', key: 'climate' },
  { title: 'Population', dataIndex: 'population', key: 'population' },
]

export default defineComponent({
  components: {
    DownOutlined,
    SearchOutlined,
  },
  setup() {
    const { people, planetDict } = useEnrichedPeopleTableData()

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
      planetDict,
      columns,
      innerColumns,
      handleSearch,
      handleReset,
    }
  },
})
</script>
