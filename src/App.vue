<template>
  <div id="app">
    <my-header></my-header>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "MyApp",
  data() {
    return {
      
    }
  },
  components: {
    MyHeader,
    MyFooter,
  },
  methods: {

  },
  computed: {},
};
</script>

<style scoped>
:root {
  font-size: 12px;
}
</style>
