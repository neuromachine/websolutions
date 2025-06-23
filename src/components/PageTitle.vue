<script setup>
import { useDataStore } from '@/stores/dataStore'
const dataStore = useDataStore()
</script>
<template v-if="dataStore.strReady">
  <div class="page-title-area item-bg2">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="page-title-content">
            <!-- Заголовок последней крошки -->
            <h2 v-if="dataStore.breadcrumbs.length">{{ dataStore.breadcrumbs.at(-1)?.title }}</h2>

            <!-- Список хлебных крошек -->
            <ul>
              <li v-for="(crumb, index) in dataStore.breadcrumbs" :key="index">
                <RouterLink
                    v-if="crumb.link && index !== dataStore.breadcrumbs.length - 1"
                    :to="crumb.link"
                >
                  {{ crumb.title }}
                </RouterLink>
                <span v-else>{{ crumb.title }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
