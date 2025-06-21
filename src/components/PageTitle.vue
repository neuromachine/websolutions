<script setup>
import { useCalcStore } from '@/stores/calcStore'
const calcStore = useCalcStore()
</script>

<template>
  <div class="page-title-area item-bg2">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div v-if="calcStore.bread" class="page-title-content">
            <h2>{{calcStore.bread.name}}</h2>
            <ul>
              <li v-for="(crumb, index) in calcStore.getBreadcrumbs" :key="index">
                <RouterLink :to="crumb.link">
                  {{ crumb.title }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
