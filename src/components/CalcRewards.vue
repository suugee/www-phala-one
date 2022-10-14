<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Calculate Rewards</span>
        <el-button class="button" text @click="drawer = true"
          >Onchain Parameters</el-button
        >
      </div>
    </template>

    <!-- 机器parames -->
    <el-card class="zi-box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>DEVICE PARAMS</span>
        </div>
      </template>

      <el-form
        label-width="200px"
        inline="true"
        class="demo-form-inline"
        label-position="top"
      >
        <el-form-item label="Pick From Know CPUs">
          <el-select
            placeholder="please select your CPU"
            @change="pickCPUchange"
            v-model="pickCPU"
          >
            <el-option label="Low-End Pentium (4 cores)" value="1" />
            <el-option label="Mid-End i5 10-Gen (6 cores)" value="2" />
            <el-option label="High-End i7 10-Gen (8 cores)" value="3" />
            <el-option label="High-End i9 10-Gen (10 cores)" value="4" />
          </el-select>
        </el-form-item>

        <el-form-item label="☆ Performance Score">
          <el-input size="middle" v-model="score" />
        </el-form-item>

        <el-form-item label="Intel RA Confidence Score">
          <el-select
            placeholder="please select Level"
            size="middle"
            v-model="level"
          >
            <el-option label="Level 1/2/3 <Best> = 1" value="1" />
            <el-option label="Level 4 = 0.8" value="0.8" />
            <el-option label="Level 5 <Worst> = 0.7" value="0.7" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 质押parames -->
    <el-card class="zi-box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>DELEGATE PARAMS</span>
        </div>
      </template>

      <el-form
        label-width="200px"
        inline="true"
        class="demo-form-inline"
        label-position="top"
      >
        <el-form-item label="Minimal Stake (PHA)">
          <el-input disabled size="middle" v-model="sMin" />
        </el-form-item>

        <el-form-item label="Maximal Stake (PHA)">
          <el-input disabled size="middle" v-model="sMax" />
        </el-form-item>

        <el-form-item label="☆ Your Stake (PHA)">
          <el-input size="middle" v-model="stake" />
        </el-form-item>

        <el-form-item label="Worker initial V">
          <el-input disabled size="middle" v-model="initV" />
        </el-form-item>
        <el-form-item label="Total Onchain V">
          <el-input disabled size="middle" v-model="totalV" />
          <input hidden size="middle" v-model="cost" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="zi-box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Results Preview</span>
        </div>
      </template>
      <table>
        <thead>
          <th class="w20">Time</th>
          <th>Rewards(PHA)</th>
          <th>Rewards(USDT)</th>
        </thead>
        <tbody>
          <tr>
            <td class="w20">Daily</td>
            <td>{{ dRewards }}</td>
            <td>{{ dRewardsUSDT }}</td>
          </tr>
          <tr>
            <td class="w20">Monthly</td>
            <td>{{ mRewards }}</td>
            <td>{{ mRewardsUSDT }}</td>
          </tr>
        </tbody>
      </table>
    </el-card>
  </el-card>

  <!-- 右边抽屉模块 -->
  <el-drawer title="Onchain Params" direction="rtl" v-model="drawer">
    <template #default>
      <el-card class="zi-box-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span>Tokenomics params</span>
          </div>
        </template>
        <ul>
          <li>vMax:{{ tokenomics.vMax }}</li>
          <li>budgetPerBlock:{{ tokenomics.budgetPerBlock }}</li>
          <li>k:{{ tokenomics.k }}</li>
          <li>kappa:{{ tokenomics.kappa }}</li>
          <li>phaRate:{{ tokenomics.phaRate }}</li>
          <li>slashRate:{{ tokenomics.slashRate }}</li>
          <li>treasuryRatio:{{ tokenomics.treasuryRatio }}</li>
          <li>re:{{ tokenomics.re }}</li>
          <li>rho:{{ tokenomics.rho }}</li>
          <li>rigB:{{ tokenomics.rigB }}</li>
          <li>rigK:{{ tokenomics.rigK }}</li>
          <li>costB:{{ tokenomics.costB }}</li>
          <li>costK:{{ tokenomics.costK }}</li>
          <li>heartbeatWindow:{{ tokenomics.heartbeatWindow }}</li>
        </ul>
      </el-card>

      <el-card class="zi-box-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span>Network params</span>
          </div>
        </template>
        <ul>
          <li>BlockTime:15s</li>
          <li>PHA Price:{{ phaPrice }}</li>
        </ul>
      </el-card>
    </template>
  </el-drawer>
</template>

<script>
import axios from "axios";

export default {
  name: "CalcRewards",
  data() {
    return {
      drawer: false,
      Vmax: 30000,
      phaRate: 0.27,
      Rekhala: 1.5,
      pickCPU: null,
      score: null,
      level: null,
      stake: null,
      totalV: null,
      rewards: null,
      phaPrice: null,
      tokenomics: {},
    };
  },

  mounted() {
    this.totalVe();
    this.getPrice();
    this.getTokenomics();
  },

  methods: {
    pickCPUchange(s) {
      let newS = Number(s);
      switch (newS) {
        case 1:
          this.score = 500;
          this.level = 1;
          break;
        case 2:
          this.score = 2000;
          this.level = 1;
          break;

        case 3:
          this.score = 2800;
          this.level = 0.8;
          break;

        case 4:
          this.score = 3600;
          this.level = 0.7;
          break;
      }
    },
    totalVe() {
      axios
        .get("https://archive.phala.one/api/totalv")
        .then((res) => {
          this.totalV = res.data.toFixed(2);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getPrice() {
      axios
        .get("https://archive.phala.one/api/price")
        .then((res) => {
          this.phaPrice = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getTokenomics() {
      axios
        .get("https://archive.phala.one/api/tokenomics")
        .then((res) => {
          this.tokenomics = res.data.result;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  watch: {},
  computed: {
    sMin() {
      let a = (Math.sqrt(this.score) * 50).toFixed(0);

      if (a == 0) {
        return (a = NaN);
      } else {
        this.stake = a;
        return a;
      }
    },
    cost() {
      let b = (0.3 * this.score) / this.phaRate;
      return b;
    },
    sMax() {
      let f = (0.3 * this.score) / this.phaRate;
      let c = (this.Vmax / (1 + this.level * (this.Rekhala - 1)) - f).toFixed(
        2
      );
      if (c == 30000) {
        return (c = NaN);
      } else {
        return c;
      }
    },

    initV() {
      let d = 0;
      let e = (0.3 * this.score) / this.phaRate;

      d = (1 + Number(this.level) * 0.5) * (Number(this.stake) + e);

      if (d == 0) {
        return (d = NaN);
      } else {
        return d.toFixed(2);
      }
    },

    dRewards() {
      let f = 0;
      f = 720000 * 0.8 * (this.initV / this.totalV);
      return f.toFixed(2);
    },
    dRewardsUSDT() {
      let dp = this.dRewards * this.phaPrice;
      return dp.toFixed(2);
    },
    mRewards() {
      let g = 0;
      g = 720000 * 0.8 * (this.initV / this.totalV) * 30;
      return g.toFixed(2);
    },
    mRewardsUSDT() {
      let mp = this.mRewards * this.phaPrice;
      return mp.toFixed(2);
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: 88px auto;
  width: 88%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.zi-box-card {
  margin: 5px auto;
  width: 100%;
}

table {
  width: 100%;
}

.w20 {
  width: 20%;
}

table tr td,
th {
  text-align: center;
}

table thead th {
  border-bottom: 1px solid rgb(231, 229, 229);
}
</style>