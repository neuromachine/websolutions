<template>
  <div class="form-control">
    <label v-if="label" :for="taId" class="label">{{ label }}</label>
    <textarea
        :id="taId"
        :value="modelValue"
        @input="onInput"
        @blur="onBlur"
        v-bind="$attrs"
        :class="['base-textarea', { 'has-error': !!error }]"
        :aria-invalid="!!error"
        :aria-describedby="error ? taId + '-error' : null"
    />
    <p v-if="error" :id="taId + '-error'" class="field-error">{{ error }}</p>
    <p v-else-if="hint" class="field-hint">{{ hint }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  hint: String,
  error: [String, Array, null],
  id: { type: String, default: null },
});
const emit = defineEmits(['update:modelValue','blur']);
const taId = props.id || `textarea-${Math.random().toString(36).slice(2,9)}`;
function onInput(e){ emit('update:modelValue', e.target.value); }
function onBlur(e){ emit('blur', e); }
</script>

<style scoped>
.base-textarea { width:100%; min-height:120px; padding:.5rem; border:1px solid #ccc; border-radius:6px; }
.has-error { border-color:#e53e3e; }
</style>
