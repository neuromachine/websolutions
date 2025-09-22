<template>
  <div class="form-control">
    <label v-if="label" :for="selId" class="label">{{ label }}</label>

    <select
        :id="selId"
        :multiple="multiple"
        @change="onChange"
        v-bind="$attrs"
        :class="['base-select', { 'has-error': !!error }]"
        :aria-invalid="!!error"
        :aria-describedby="error ? selId + '-error' : null"
    >
      <option v-if="placeholder && !multiple" value="">{{ placeholder }}</option>
      <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :selected="isSelected(opt.value)"
      >{{ opt.label }}</option>
    </select>

    <p v-if="error" :id="selId + '-error'" class="field-error">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number, Array],
  options: { type: Array, default: () => [] }, // [{ label, value }]
  multiple: { type: Boolean, default: false },
  label: String,
  placeholder: { type: String, default: 'Выберите...' },
  error: [String, Array, null],
  id: { type: String, default: null },
});
const emit = defineEmits(['update:modelValue','blur']);
const selId = props.id || `select-${Math.random().toString(36).slice(2,9)}`;

function onChange(e){
  if (props.multiple) {
    const selected = Array.from(e.target.selectedOptions).map(o => o.value);
    emit('update:modelValue', selected);
  } else {
    emit('update:modelValue', e.target.value);
  }
}
function isSelected(val){
  if (props.multiple) return Array.isArray(props.modelValue) && props.modelValue.includes(val);
  return props.modelValue == val; // loose compare to allow number/string match
}
</script>

<style scoped>
.base-select { width:100%; padding:.45rem; border:1px solid #ccc; border-radius:6px; }
.has-error { border-color:#e53e3e; }
</style>
