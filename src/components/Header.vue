<template>
  <header class="header">
    <img
      src="@/assets/logo-white.svg"
      style="width: 70px"
    >
    <h1 class="heading">
      {{ title }}
    </h1>
  </header>
</template>
<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
  header.header {
    display: flex;
    justify-content: center;
    background-color: #2D4263;
    padding: 5px 0;
  }
  .heading {
    color: #fff;
  }
</style>
