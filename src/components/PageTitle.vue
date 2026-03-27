<script setup>
import { useUiStore } from '@/stores/uiStore';
import AppLink from "@/components/AppLink.vue";
const uiStore = useUiStore();
</script>
<template v-if="uiStore.isStrReady">
<!--  <div v-if="uiStore.uiMainVars.head" class="page-title-area item-bg2">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="page-title-content">
            <h2>{{uiStore.uiMainVars.page.title}}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>-->
  <div id="page_head" class="page-title-area item-bg2">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="page-title-content">
            <h2>{{uiStore.uiMainVars.page.title}}</h2>
<!--              <ul>
                <li v-for="(item, index) in uiStore.uiMainVars.page.breadcrumbs" :key="index">
                  <AppLink :to="'/'+item.key">{{ item.title }}</AppLink>
                </li>
                <li>{{uiStore.uiMainVars.page.title}}</li>
              </ul>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
