<script setup>
import { useCalcStore } from '@/stores/calcStore'
const calcStore = useCalcStore()
</script>
<template v-if="calcStore.strReady">
  <div class="page-title-area item-bg2">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="page-title-content">
            <!-- Заголовок последней крошки -->
            <h2 v-if="calcStore.breadcrumbs.length">{{ calcStore.breadcrumbs.at(-1)?.title }}</h2>

            <!-- Список хлебных крошек -->
            <ul>
              <li v-for="(crumb, index) in calcStore.breadcrumbs" :key="index">
                <RouterLink
                    v-if="crumb.link && index !== calcStore.breadcrumbs.length - 1"
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
