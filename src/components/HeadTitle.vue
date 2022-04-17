<template>
  <div>
    <h1 class="text-2xl md:text-3xl text-primaryText font-bold">
      {{ title }} ✨
    </h1>
  </div>
</template>
<script>
export default {
  name: 'HeadTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
