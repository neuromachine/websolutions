<template>
  <div class="form-control">
    <label v-if="label" :for="inputId" class="label">
      {{ label }}
      <span v-if="required" aria-hidden="true">*</span>
    </label>

    <div class="input-wrapper">
      <slot name="prepend" />
      <input
          :id="inputId"
          :type="type"
          :value="modelValue"
          @input="onInput"
          @blur="onBlur"
          v-bind="$attrs"
          :class="['base-input', { 'has-error': !!error }]"
          :aria-invalid="!!error"
          :aria-describedby="error ? inputId + '-error' : null"
      />
      <slot name="append" />
    </div>

    <p v-if="error" :id="inputId + '-error'" class="field-error">{{ error }}</p>
    <p v-else-if="hint" class="field-hint">{{ hint }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  label: String,
  hint: String,
  error: [String, Array, null],
  required: { type: Boolean, default: false },
  id: { type: String, default: null },
});
const emit = defineEmits(['update:modelValue', 'blur']);

const inputId = props.id || `input-${Math.random().toString(36).slice(2,9)}`;

function onInput(e) { emit('update:modelValue', e.target.value); }
function onBlur(e) { emit('blur', e); }
</script>

<style scoped>
/* простые классы — заменить на проектные */
.base-input { width:100%; padding: .5rem; border:1px solid #ccc; border-radius:6px; }
.has-error { border-color: #e53e3e; }
.field-error { color:#e53e3e; font-size:.875rem; margin-top:.25rem; }
.field-hint { color:#6b7280; font-size:.875rem; margin-top:.25rem; }
</style>
