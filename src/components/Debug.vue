<script setup>
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();
import { useUiStore } from '@/stores/uiStore.js';
const uiStore = useUiStore();
</script>
<template>
  <div v-if="uiStore.uiMainVars.debug===true" id="DebugPanel">
<!--    <div v-if="dataStore.isStrReady"><div>{{dataStore.getGlobalLoading}} </div></div>-->
    <div v-if="!uiStore.getGlobalLoading"><div>1{{uiStore.getGlobalLoading}} </div></div>
    <div v-if="dataStore.isStrReady"><div>2{{dataStore.structure}}</div></div>
  </div>
</template>

<style scoped>

</style>