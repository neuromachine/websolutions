<template>
  <div class="form-control">
    <label v-if="label" :for="id" class="label">
      {{ label }}
      <span v-if="required" aria-hidden="true">*</span>
    </label>

    <div class="input-wrapper">
      <slot name="prepend" />
      <input
          :id="id"
          :type="type"
          :value="value"
          @input="$emit('input', $event.target.value)"
          @blur="$emit('blur', $event)"
          v-bind="$attrs"
          :class="['base-input', { 'has-error': !!error }]"
          :aria-invalid="!!error"
          :aria-describedby="error ? id + '-error' : null"
      />
      <slot name="append" />
    </div>

    <p v-if="error" :id="id + '-error'" class="field-error">{{ error }}</p>
    <p v-else-if="hint" class="field-hint">{{ hint }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  value: [String, Number], // теперь вместо modelValue
  type: { type: String, default: 'text' },
  label: String,
  hint: String,
  error: [String, Array, null],
  required: { type: Boolean, default: false },
  id: { type: String, default: () => `input-${Math.random().toString(36).slice(2,9)}` },
})
defineEmits(['input', 'blur'])
</script>