<template>
  <DynamicForm :schema="schema" />
</template>

<script setup>
import DynamicForm from '@/components/forms/DynamicForm.vue'
import schema from '@/schemas/simplifiedForm.js'
</script>
