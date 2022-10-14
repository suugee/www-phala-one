<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Calculate Delegates</span>
        <a
          href="https://wiki.phala.network/en-us/learn/tokenomics/tokenomics/#initial-v"
          target="_blank"
          ><el-button class="button" text>Phala Tokenomics</el-button></a
        >
      </div>
    </template>

    <el-form label-width="150px" label-position="top">
      <el-form-item label="Performance Score">
        <el-input v-model="pScore" placeholder="please input Score" />
        <span class="right-tips"
          >※ CPU i5 10-GEN ≈ 2000 / i7 10-GEN ≈ 2800 / i9 10-GEN ≈ 3600</span
        >
      </el-form-item>

      <el-form-item label="Physical Cores">
        <el-select v-model="pCores" placeholder="please select Cores">
          <el-option label="4" value="4" />
          <el-option label="6" value="6" />
          <el-option label="8" value="8" />
          <el-option label="10" value="10" />
        </el-select>
        <span class="right-tips"
          >※ CPU i5 10-GEN = 6 / i7 10-GEN = 8 / i9 10-GEN = 10</span
        >
      </el-form-item>

      <el-form-item label="Intel RA Confidence level">
        <el-select
          v-model="pLevel"
          placeholder="please select Confidence level"
        >
          <el-option label="1/2/3" value="1" />
          <el-option label="4" value="0.8" />
          <el-option label="5" value="0.7" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="calcDele">Calculate</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <!-- 模态框展示计算结果 -->
  <el-dialog v-model="dialogVisible" title="Results" width="30%" draggable>
    <span>Smin：{{ sMin }} PHA</span><br />
    <span>Smax：{{ sMax }} PHA</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "CalcDelegates",
  props: {
    // phaRate: {
    //   type: Number,
    //   required: true
    // },
    // Rekhala: {
    //   type: Number,
    //   required: true
    // },
    // Vmax: {
    //   type: Number,
    //   required: true
    // }
  },
  data() {
    return {
      phaRate: 0.27,
      Rekhala: 1.5,
      Vmax: 30000,
      pScore: null, // 性能分
      pCores: null, // 核心数量
      pLevel: null, // 信任等级
      cost: 0, // Cost
      sMax: 0, // 最小质押
      sMin: 0, // 最大质押

      dialogVisible: false, // 模态框是否显示
    };
  },
  methods: {
    calcDele() {
      this.sMin = (Math.sqrt(this.pScore) * 50).toFixed(0);
      this.cost = (0.3 * this.pScore) / this.phaRate;
      this.sMax = (
        this.Vmax / (1 + this.pLevel * (this.Rekhala - 1)) -
        this.cost
      ).toFixed(2);

      this.dialogVisible = true;
      console.log(this.sMin);
      console.log(this.sMax);
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
.card-header a {
  text-decoration: none;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.el-input {
  width: 214px;
}

.right-tips {
  padding-left: 20px;
  color: #606266;
}
</style>