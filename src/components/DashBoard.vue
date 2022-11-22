<template>
  <div class="dashboard-container">
    <div class="item-panel p-center">
      🔥TotalDelegation：{{ allStakes }} PHA ┆ TotalFreeDelegation：{{
        allFree
      }}
      PHA ┆ 💎TotalReleasing：{{ allReleasingStakes }} PHA ┆
      TotalWithdrawing：{{ allWithdraw }} PHA
    </div>
    <div class="analytics-panel p-center">
      <iframe
        name="myiframe"
        id="myrame"
        src="https://mb.phala.network/public/dashboard/d3e95e99-dcd9-4469-ad32-7e5dbd388cc7#bordered=false"
        frameborder="0"
        width="88%"
        height="2000px"
        scrolling="no"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashBoard",
  components: {},
  data() {
    return {
      allStakes: 0,
      allFree: 0,
      allReleasingStakes: 0,
      allWithdraw: 0,
    };
  },

  mounted() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      axios
        .get("https://archive.phala.one/api/pool_info")
        .then((res) => {
          if (res.status === 200) {
            this.allStakes = res.data.allStakes;
            this.allFree = res.data.allFree;
            this.allReleasingStakes = res.data.allReleasingStakes;
            this.allWithdraw = res.data.allWithdraw;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.p-center {
  margin: 20px auto;
}

.item-panel {
  margin-top: 80px;
  width: 88%;
  min-height: 100px;
  line-height: 100px;
  background-color: #fff;
  text-align: center;
}

.analytics-panel {
  width: 88%;
  min-height: 350px;
  background-color: #fff;
}
</style>