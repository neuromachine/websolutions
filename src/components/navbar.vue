<script setup>
import { useUiStore } from '@/stores/uiStore'
import { useNavigationStore } from '@/stores/navigationStore'

const uiStore = useUiStore()
const navStore = useNavigationStore()
</script>

<template>
  <ul :class="uiStore.isOpen ? 'open' : 'close'" class="navbar-nav">
    <li
        v-for="item in navStore.nav"
        :key="item.path"
        class="nav-item"
    >
      <AppLink :to="item.path" class="nav-link">{{ item.anchor }}</AppLink>
    </li>
  </ul>
</template>