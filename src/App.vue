<template>
  <Header />
  <router-view />
</template>

<script>
import { ConfigProvider } from 'ant-design-vue'
import { Header } from '@/components'

ConfigProvider.config({
  theme: {
    primaryColor: '#2D4263',
  },
})

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f1edee;
  height: 100%;
}
</style>
