<script setup>
import {computed,onMounted} from "vue";

onMounted(() => {
  //uiStore.setUiVars('debug', false);
  // uiStore.setNavBarStatus(true);
  // uiStore.setUiVars('menu', false);
  // uiStore.setHeaderVars('menu', false);
});

import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();
import { useUiStore } from '@/stores/uiStore.js';

const uiStore = useUiStore();

const isMenu = computed({
  get() {
    const value = uiStore.uiMainVars.menu;
    return value;
  },
  set(value) {
    uiStore.setUiVars('menu', value);
  },
});


const isDebug = computed({
  get() {
    const value = uiStore.uiMainVars.debug;
    return value;
  },
  set(value) {
    uiStore.setUiVars('debug', value);
  },
});

const isNavBar = computed({
  get() {
    const value = uiStore.uiMainVars.header.navbar;
    return value;
  },
  set(value) {
    uiStore.setNavBarStatus(value);
  },
});
</script>
<template>
  <div id="global" v-if="uiStore.uiMainVars.menu === true">
    <div class="container">
      <div class="row">
        <label class="switch">
          <input type="checkbox" v-model="isMenu"/>
          <span class="slider"></span>
        </label>

      </div>
      <div class="row">
        <label class="switch">
          <input type="checkbox" v-model="isDebug"/>
          <span class="slider"></span>
        </label>
      </div>
      <div class="row">
        <label class="switch">
          <input type="checkbox" v-model="isNavBar"/>
          <span class="slider"></span>
        </label>
      </div>
    </div>

  </div>
  <div v-if="uiStore.uiMainVars.debug===true" id="DebugPanel">
<!--    <div v-if="dataStore.isStrReady"><div>{{dataStore.getGlobalLoading}} </div></div>-->
    <div v-if="!uiStore.getGlobalLoading"><div>1{{uiStore.getGlobalLoading}} </div></div>
    <div v-if="dataStore.isStrReady"><div>2{{dataStore.structure}}</div></div>
  </div>
</template>

<style scoped>

</style>