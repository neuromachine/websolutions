<template>
  <div class="form-control">
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    <textarea
        :id="id"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event)"
        v-bind="$attrs"
        :class="['base-textarea', { 'has-error': !!error }]"
        :aria-invalid="!!error"
        :aria-describedby="error ? id + '-error' : null"
    />
    <p v-if="error" :id="id + '-error'" class="field-error">{{ error }}</p>
    <p v-else-if="hint" class="field-hint">{{ hint }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  value: String,
  label: String,
  hint: String,
  error: [String, Array, null],
  id: { type: String, default: () => `textarea-${Math.random().toString(36).slice(2,9)}` },
})
defineEmits(['input','blur'])
</script>
