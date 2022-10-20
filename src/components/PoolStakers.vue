<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Pool Stakers</span>
        <!-- <el-button class="button" text>Help</el-button> -->
      </div>
    </template>
    <!-- ----------------- -->
    <div class="search-box">
      <el-input
        placeholder="Please input pool PID or staker's Address"
        size="large"
        class="input-search"
        v-model="pid"
      />
      <el-button type="primary" size="large" @click="getPoolStakers(pid)"
        >Submit</el-button
      >
    </div>
    <!-- ----------------- -->
    <el-table :data="tableData" class="stakers-box" border>
      <el-table-column prop="pid" label="Pid" width="100px" />
      <el-table-column prop="user" label="User" />
      <el-table-column label="Explorer" width="220px">
        <template v-slot="scope">
          <span><a :href="'https://khala.polkaholic.io/account/'+scope.row.user" rel="noopener noreferrer" target="_blank" title="Polkaholic, https://polkaholic.io/"><el-icon><Link /></el-icon>Polkaholic</a></span>
          <span><a :href="'https://sub.id/'+scope.row.user" rel="noopener noreferrer" target="_blank" title="SubId, https://sub.id"><el-icon><Link /></el-icon>SubId</a></span>
          <span><a :href="'https://khala.subscan.io/account/'+scope.row.user" rel="noopener noreferrer" target="_blank" title="Subscan, https://subscan.io/"><el-icon><Link /></el-icon>Subscan</a></span>
        </template>
      </el-table-column>
      <el-table-column prop="locked" label="Locked" width="150px" />
    </el-table>
    <!-- ----------------- -->
    <div class="total-staker-box">
      ---
      <span class="TotalStaker">TotalResult: {{ TotalStaker }}</span>
      ---
      <span class="TotalLocked">TotalLocked: {{ TotalLocked }} PHA</span>
      ---
    </div>
  </el-card>

  <!-- 模态框展示计算结果 -->
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <span>No Data!</span><br />
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
import axios from "axios";

export default {
  name: "PoolStakers",

  data() {
    return {
      pid: "",
      tableData: [],
      dialogVisible: false, // 模态框是否显示
    };
  },

  mounted() {},

  methods: {
    getPoolStakers(pid) {
      axios
        .get("https://archive.phala.one/api/pool_stakers/" + pid)
        .then((res) => {
          if (res.data.status === 400) {
            this.dialogVisible = true;
          }
          if (res.data.status === 200) {
            res.data.data.sort((a, b) => b.locked - a.locked);
            this.tableData = res.data.data;
            console.log(res.data.data.length);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
    TotalStaker() {
      return this.tableData.length;
    },
    TotalLocked() {
      let total = 0;
      this.tableData.forEach((item) => {
        total += item.locked;
      });
      return total;
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
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.search-box {
  text-align: center;
}
.input-search {
  width: 60%;
  margin-right: 20px;
  margin-bottom: 20px;
}
.stakers-box {
  margin: 0 auto;
  width: 66%;
  margin-bottom: 20px;
}
.total-staker-box {
  margin: 0 auto;
  width: 66%;
  margin-bottom: 20px;
  text-align: center;
}
</style>