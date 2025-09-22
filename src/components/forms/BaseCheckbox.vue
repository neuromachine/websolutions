<template>
  <div class="form-control-checkbox">
    <label :for="cbId" class="checkbox-label">
      <input
          :id="cbId"
          type="checkbox"
          :checked="!!modelValue"
          @change="onChange"
          v-bind="$attrs"
      />
      <span class="checkbox-text">{{ label }}</span>
    </label>

    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [Boolean, String],
  label: String,
  error: [String, null],
  id: { type: String, default: null },
});
const emit = defineEmits(['update:modelValue']);
const cbId = props.id || `cb-${Math.random().toString(36).slice(2,9)}`;

function onChange(e){ emit('update:modelValue', e.target.checked); }
</script>

<style scoped>
.form-control-checkbox { display:flex; align-items:center; gap:.5rem; }
.checkbox-label { display:flex; align-items:center; gap:.5rem; cursor:pointer; }
</style>
