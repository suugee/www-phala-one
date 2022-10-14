<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <router-link to="/"
      ><el-menu-item class="Titlelogo"> PHALA ONE </el-menu-item></router-link
    >
    <router-link to="/dashboard"
      ><el-menu-item index="2"
        ><el-icon><Menu /></el-icon> DashBoard
      </el-menu-item></router-link
    >
    <el-sub-menu index="3">
      <template #title
        ><el-icon><Eleme /></el-icon>Calculators</template
      >
      <router-link to="/delegates"
        ><el-menu-item index="3-1"
          ><el-icon><WalletFilled /></el-icon>Delegates</el-menu-item
        ></router-link
      >
      <router-link to="/rewards"
        ><el-menu-item index="3-2"
          ><el-icon><Trophy /></el-icon>Rewards</el-menu-item
        ></router-link
      >
    </el-sub-menu>
    <a href="http://solo.phala.one" target="_blank"
      ><el-menu-item index="4"
        ><el-icon><Monitor /></el-icon>Solo Monitor</el-menu-item
      ></a
    >
    <router-link to="/stakers"
      ><el-menu-item index="5"
        ><el-icon><MostlyCloudy /></el-icon>Pool Stakers</el-menu-item
      ></router-link
    >

    <el-sub-menu index="6">
      <template #title>
        <el-icon><Promotion /></el-icon>
        More</template
      >
      <a href="https://discord.com/invite/myBmQu5" target="_blank">
        <el-menu-item index="6-1"
          ><el-icon><User /></el-icon>Discord</el-menu-item
        >
      </a>
      <a href="https://t.me/phalaCN" target="_blank">
        <el-menu-item index="6-2"
          ><el-icon><Position /></el-icon>Telegram</el-menu-item
        >
      </a>
      <a href="https://github.com/Phala-Network/" target="_blank">
        <el-menu-item index="6-3"
          ><el-icon><School /></el-icon>Github</el-menu-item
        >
      </a>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: "MyHeader",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.el-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
}
a {
  text-decoration: none;
}
.Titlelogo {
  font-size: 18px;
  font-weight: 600;
}
</style>