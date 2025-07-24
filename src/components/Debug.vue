<script setup>
import {computed,onMounted} from "vue";

onMounted(() => {
  /*
  uiStore.setUiVars('debug', false);
   uiStore.setNavBarStatus(true);
   uiStore.setUiVars('menu', true);
   uiStore.setHeaderVars('menu', true);
   
*/
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

const isVersionFull = computed({
  get() {
    const value = uiStore.uiMainVars.page.version;
    return value === 'full';
  },
  set(value) {
    if(value === true)
    {
      console.log('value set FULL', value);
      uiStore.setVersionFull('full');
    }
    else
    {
      console.log('value set SHORT', value);
      uiStore.setVersionFull('short');
    }
  },
});
</script>
<template>
  <div class="bg-brand-aqua" id="global" v-if="uiStore.uiMainVars.menu === true">




    <div class="container">



      <div class="row">


        <div class="form-check bg-brand-aqua text-brand-alert">
          <input  v-model="isDebug" class="form-check-input" type="checkbox" value="" id="checkDefault">
          <label class="form-check-label" for="checkDefault">
            Debug
          </label>
        </div>

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
      <div class="row">
        <label class="switch">
          <input type="checkbox" v-model="isVersionFull"/>
          <span class="slider"></span>
        </label>
      </div>
    </div>

  </div>
  <div v-if="uiStore.uiMainVars.debug===true" id="DebugPanel" class="bg-brand-aqua text-brand-light">
    <pre>
    <div v-if="dataStore.isStrReady"><h1>{{ JSON.stringify(dataStore.getGlobalLoading, null, 2) }}<</h1></div>
    <div v-if="!uiStore.getGlobalLoading"><div>{{ JSON.stringify(uiStore.getGlobalLoading, null, 2) }}</div></div>
    <div v-if="dataStore.isStrReady">{{ JSON.stringify(dataStore.structure, null, 2) }}</div>
<!--    <div v-if="uiStore.isVersionFull">{{ JSON.stringify(uiStore.page.version, null, 2) }}</div>-->
      </pre>
  </div>
</template>

<style scoped>

</style>