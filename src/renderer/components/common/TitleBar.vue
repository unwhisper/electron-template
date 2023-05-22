<template>
  <div class="window-title" v-if="!IsUseSysTitle && isNotMac && !IsWeb">
    <!-- 软件logo预留位置 -->
    <div style="-webkit-app-region: drag" class="logo">
      <img
        src="@renderer/assets/icons/svg/electron-logo.svg"
        class="icon-logo"
      />
    </div>
    <!-- 菜单栏位置 -->
    <div></div>
    <!-- 中间标题位置 -->
    <div style="-webkit-app-region: drag" class="title">{{title}}</div>
    <div class="controls-container">
      <div class="windows-icon-bg" @click="Mini">
        <img src="@renderer/assets/icons/svg/mini.svg" class="icon-size" />
      </div>
      <div class="windows-icon-bg" @click="MixOrReduction">
        <img
          v-if="mix"
          src="@renderer/assets/icons/svg/reduction.svg"
          class="icon-size"
        />
        <img
          v-else
          src="@renderer/assets/icons/svg/mix.svg"
          class="icon-size"
        />
      </div>
      <div class="windows-icon-bg close-icon" @click="Close">
        <img src="@renderer/assets/icons/svg/close.svg" class="icon-size" />
      </div>
    </div>
  </div>
  <div v-else-if="!IsUseSysTitle && !isNotMac" class="window-title">
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const { ipcRenderer } = require("electron");

const IsUseSysTitle = ref(false);
const mix = ref(false);
const isNotMac = ref(process.platform !== "darwin");
const IsWeb = ref(process.env.BUILD_TARGET);
const title = ref('title')
ipcRenderer.invoke("IsUseSysTitle").then((res) => {
  IsUseSysTitle.value = res;
});
ipcRenderer.on('isMax', (event, arg) => {
  // console.log(arg)
  mix.value = arg
})

const Mini = () => {
  ipcRenderer.invoke("windows-mini");
};
const MixOrReduction = () => {
  ipcRenderer.invoke("window-max").then((res) => {
    mix.value = res.status;
  });
};
const Close = () => {
  ipcRenderer.invoke("window-close");
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@font-face{
  font-family: 'zhulang';
  src: url('../../assets/font/zhulang.ttf');
}
.window-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #1A324C;
  display: flex;
  -webkit-app-region: drag;
  position: fixed;
  top: 0;
  z-index: 99999;
  .icon-logo {
    width: 25px;
    height: 25px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .title {
    text-align: center;
    color: #555555;
    font-size: 22px;
    padding-left: 5px;
    font-family: 'zhulang';
    font-weight: bold;
    color: #eef7f2; //#373737
    user-select: none;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: justify;
    margin-left: 7px;
  }
  .controls-container {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: center;
    position: relative;
    z-index: 3000;
    -webkit-app-region: no-drag;
    height: 100%;
    width: 138px;
    margin-left: auto;
    .windows-icon-bg {
      display: inline-block;
      -webkit-app-region: no-drag;
      height: 100%;
      width: 33.34%;
      color: rgba(129, 129, 129, 0.6);
      user-select: none;
      .icon-size {
        height: 15px;
        vertical-align: -0.15em;
        fill: currentColor;
        color: #ffffff;
        overflow: hidden;
      }
    }
    .windows-icon-bg:hover {
      background-color: rgba(182, 182, 182, 0.2);
      color: #333;
    }
    .close-icon:hover {
      background-color: rgba(232, 17, 35, 0.9);
      color: #fff;
    }
  }
}
</style>
