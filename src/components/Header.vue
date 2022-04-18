<template>
  <header class="header">
    <img src="@/assets/logo-white.svg" style="width: 70px" />
    <div>
      <img src="@/assets/jedi.svg" class="side-icon" />
      <a-switch
        :checked="getIsDarkSide"
        @change="changeSide(getIsDarkSide ? 'light' : 'dark')"
      />
      <img src="@/assets/sith-empire.svg" class="side-icon" />
    </div>
  </header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['getIsDarkSide']),
  },
  methods: {
    ...mapActions(['changeSide']),
  },
}
</script>

<style>
header.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d4263;
  padding: 5px;
}
.heading {
  color: #fff;
}
.side-icon {
  height: 30px;
  padding: 0 5px;
}
</style>
