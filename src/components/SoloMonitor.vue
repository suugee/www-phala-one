<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Solo Monitor</span>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Click me to add proxy in monitor"
          placement="bottom-start"
        >
          <span class="proxyip" v-if="proxyIp"
            >You have been set ProxyIp：{{ proxyIp }}
            <el-button type="primary" size="small" round @click="addProxy"
              >Change</el-button
            ></span
          >

          <el-button class="button" text @click="addProxy" v-else
            ><el-icon><Plus /></el-icon>Add Proxy</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Click me to add worker in monitor"
          placement="bottom-start"
        >
          <el-button class="button" text @click="addWorker"
            ><el-icon><Plus /></el-icon>Add Worker</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Click me to show the Usage"
          placement="bottom-start"
        >
          <el-button class="button" text @click="drawer = true"
            ><el-icon><Help /></el-icon>Help</el-button
          >
        </el-tooltip>
      </div>
    </template>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column fixed prop="ipAddr" label="IP Addr" width="128" />
      <el-table-column prop="khalaHeight" label="Khala Height" width="120" />
      <el-table-column prop="kusamaHeight" label="KSM Height" width="120" />
      <el-table-column prop="score" label="Local Score" width="110" />
      <el-table-column prop="publickey" label="Public Key" width="568" />
      <el-table-column prop="version" label="pRuntime Version" width="160" />
      <el-table-column prop="status" label="Status" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="updateWorkerIp(scope.row.ipAddr)"
            >Edit</el-button
          >
          <el-popconfirm
            title="Are you sure to delete this?"
            @confirm="deleteWorkerIp(scope.row.ipAddr)"
          >
            <template #reference>
              <el-button link type="primary" size="small">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 右边抽屉模块 -->
  <el-drawer title="Usage For SoloMonitor" direction="rtl" v-model="drawer">
    <template #default>
      <span
        >※ Tips：The IPs in Solo Monitor are stored in your browser
        localStorage. If the browser is cleared, the data will be lost~</span
      >
      <el-divider />
      <div style="height: 200px">
        <el-steps direction="vertical" :active="1">
          <el-step
            title="Step 1 Run a Proxy Docker container in the same
          network as your workers."
          />
          <el-step title="Step 2 Add ProxyIp on SoloMonitor." />
          <el-step title="Step 3 Add Your Workers IP." />
        </el-steps>
        <el-divider />
        <div class="docker-code">
          Copy this command to run a Proxy Docker container:
          <el-input
            value="sudo docker run -tid -p 8001:8001 --name phala-info suugee/phala-workerinfo:v1"
            autosize
            type="textarea"
            readonly
          />
        </div>
        <el-divider />
        <div class="help-video">Maybe a video guide</div>
      </div>
    </template>
  </el-drawer>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";

export default {
  name: "SoloMonitor",

  data() {
    return {
      proxyIp: "",
      workerIp: [],
      tableData: [],
      loading: true,
      drawer: false,
    };
  },
  created() {
    // 获取 proxy+worker的ip数据
    this.getProxyIp();
    this.getWorkerIp();
  },
  mounted() {
    // 组件被挂载后每隔多久自动获取WorkerInfo

    // 当代理Ip不存在时销毁定时器
    if (this.proxyIp == null || this.workerIp.length < 1) {
      return;
    } else {
      setInterval(() => {
        (this.loading = true), this.getWorkerInfo();
      }, 60000);
    }
  },
  methods: {
    // 获取本地代理IP
    getProxyIp() {
      const proxyIp = localStorage.getItem("proxyIp");
      this.proxyIp = JSON.parse(proxyIp);
      console.log("localProxyIp:" + proxyIp);
      this.loading = false;
    },
    // 获取本地机器IP
    getWorkerIp() {
      // 获取localStorage内的IP数据
      const workerIp = JSON.parse(localStorage.getItem("workerIp"));

      if (workerIp != null) {
        // 将获取到的IP添加数组中
        console.log("localWorkerIp:" + workerIp);
        this.workerIp = workerIp;
        if (this.workerIp.length > 0 && this.proxyIp !== null) {
          this.getWorkerInfo();
        } else {
          return;
        }
      } else {
        let initWorkerIp = [];
        localStorage.setItem("workerIp", initWorkerIp);
        console.log("初始化localWorkerIp完成");
        this.loading = false;
      }
    },
    // 添加代理IP弹窗
    addProxy() {
      ElMessageBox.prompt("Please input your proxy ip", "Tip", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputPattern:
          /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
        inputErrorMessage: "Invalid IP Address",
      })
        .then(({ value }) => {
          ElMessage({
            type: "success",
            message: `Add proxy ip:${value}`,
          });
          this.saveProxyIp(value);
          this.getProxyIp();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Input canceled",
          });
        });
    },
    // 添加机器IP弹窗
    addWorker() {
      ElMessageBox.prompt("Please input your worker ip", "Tip", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputPattern:
          /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
        inputErrorMessage: "Invalid IP Address",
      })
        .then(({ value }) => {
          ElMessage({
            type: "success",
            message: `Add worker ip:${value}`,
          });

          this.workerIp.push(value);
          this.saveWorkerIp();
          this.getWorkerIp();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Input canceled",
          });
        });
    },
    // 保存代理IP方法
    saveProxyIp(value) {
      localStorage.setItem("proxyIp", JSON.stringify(value));
    },
    // 保存机器IP方法
    saveWorkerIp() {
      localStorage.setItem("workerIp", JSON.stringify(this.workerIp));
    },
    // 网络获取机器状态方法
    getWorkerInfo() {
      // 先清空table
      this.tableData = [];
      // 再获取信息
      const proxyApi = "http://" + this.proxyIp + ":8001/api/";
      this.workerIp.forEach((wip) => {
        const curl = proxyApi + wip;
        axios
          .get(curl)
          .then((res) => {
            const payload = JSON.parse(res.data.payload);
            // console.log(payload);
            const data = {
              ipAddr: wip,
              khalaHeight: payload.blocknum,
              kusamaHeight: payload.headernum,
              score: payload.score,
              publickey: "0x" + payload.ecdh_public_key,
              version: payload.version,
              status: res.data.status,
            };
            // console.log(data);
            this.tableData.push(data);
          })
          .catch((err) => {
            console.log(err);
          });

        // 关闭loading效果
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      });
    },
    // 修改worker ip
    updateWorkerIp(ip) {
      ElMessageBox.prompt("Please update your worker ip", "Tip", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputPattern:
          /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
        inputErrorMessage: "Invalid IP Address",
      })
        .then(({ value }) => {
          ElMessage({
            type: "success",
            message: `Update worker ip:${value}`,
          });
          this.updateIp(ip, value); // 把这个ip在数组中替换成value
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Input canceled",
          });
        });

      // 判断ip是否存在
      // 更新vue data
      // 更新localStorage
      console.log(ip);
    },
    // 单独写方法
    updateIp(ip, value) {
      const ipIndex = this.workerIp.findIndex((item) => {
        if (item == ip) {
          return true;
        }
      });
      this.workerIp.splice(ipIndex, 1, value);
      this.saveWorkerIp();
      this.getWorkerInfo();
    },
    // 删除worker ip
    deleteWorkerIp(ip) {
      const arrIndexInWorkerIp = this.workerIp.findIndex((item) => {
        if (item == ip) {
          return true;
        }
      });
      console.log("arrIndexInWorkerIp：" + arrIndexInWorkerIp);

      if (arrIndexInWorkerIp || arrIndexInWorkerIp == 0) {
        // 通过index删除workerIp中的元素
        this.workerIp.splice(arrIndexInWorkerIp, 1);
        // 更新localStorage数据
        this.saveWorkerIp();
        // 重新获取workerip和workerinfo
        this.getWorkerInfo();
      } else {
        console.log("不存在ip：" + ip);
      }
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

.proxyip {
  padding-right: 300px;
}
.docker-code {
  line-height: 38px;
}
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>