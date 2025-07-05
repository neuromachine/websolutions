<script setup>
import { useUiStore } from '@/stores/uiStore';
const uiStore = useUiStore();
</script>
<template v-if="dataStore.strReady">
  <div v-if="uiStore.uiMainVars.head" class="page-title-area item-bg2">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="page-title-content">
            <h2>{{uiStore.uiMainVars.page.title}}</h2>
<!--            <div>{{dataStore.uiMainVars.page.breadcrumbs}}</div>-->
<!--
            <ul>
              <li v-for="(item, index) in dataStore.uiMainVars.page.breadcrumbs" :key="index">
                <RouterLink :to="{ path: '/group/' + item.key }">{{ item.title }} {{item.key}}</RouterLink>
              </li>
              <li>{{dataStore.uiMainVars.page.title}}</li>
            </ul>
-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="page_head" class="page-title-area item-bg2">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="page-title-content">
            <h2>{{uiStore.uiMainVars.page.title}}</h2>
            <!--            <div>{{dataStore.uiMainVars.page.breadcrumbs}}</div>-->
            <!--
                        <ul>
                          <li v-for="(item, index) in dataStore.uiMainVars.page.breadcrumbs" :key="index">
                            <RouterLink :to="{ path: '/group/' + item.key }">{{ item.title }} {{item.key}}</RouterLink>
                          </li>
                          <li>{{dataStore.uiMainVars.page.title}}</li>
                        </ul>
            -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
