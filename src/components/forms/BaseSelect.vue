<template>
  <div class="form-control">
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    <select
        :id="id"
        :value="value"
        @change="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event)"
        v-bind="$attrs"
        :class="['base-select', { 'has-error': !!error }]"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  value: [String, Number],
  options: { type: Array, default: () => [] },
  label: String,
  placeholder: String,
  error: [String, Array, null],
  id: { type: String, default: () => `select-${Math.random().toString(36).slice(2,9)}` },
})
defineEmits(['input','blur'])
</script>
