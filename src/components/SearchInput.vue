<template>
  <div class="search-container">
    <input
      class="search-input"
      type="search"
      :placeholder="placeholder"
      :value="value"
      @input="onInput"
    />
    <button class="search-button" type="submit" aria-label="Search">
      <Fa icon="search" class="search-icon" />
    </button>
  </div>
</template>
<script>
export default {
  name: 'SearchInput',
  props: {
    placeholder: {
      type: String,
      required: false,
      default: () => '',
    },
    value: {
      type: String,
      required: false,
      default: () => '',
    },
  },
  emits: ['search'],
  methods: {
    onInput(event) {
      setTimeout(() => {
        this.$emit('search', event.target.value)
      }, 100)
    },
  },
}
</script>
