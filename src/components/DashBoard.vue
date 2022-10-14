<template>
  <div class="dashboard-container">
    <div class="item-panel p-center">Comming soon</div>
    <div class="analytics-panel p-center">
      <iframe
        name="myiframe"
        id="myrame"
        src="https://mb.phala.network/public/dashboard/d3e95e99-dcd9-4469-ad32-7e5dbd388cc7#bordered=false"
        frameborder="0"
        align="center"
        width="88%"
        height="1680px"
        scrolling="no"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  components: {},
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.p-center {
  margin: 20px auto;
}

.item-panel {
  margin-top: 80px;
  width: 88%;
  min-height: 120px;
  line-height: 120px;
  background-color: #fff;
  text-align: center;
}

.analytics-panel {
  width: 88%;
  min-height: 350px;
  background-color: #fff;
}
</style>