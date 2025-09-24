<template>
  <div class="form-control-checkbox">
    <label :for="id" class="checkbox-label">
      <input
          :id="id"
          type="checkbox"
          :checked="value"
          @change="$emit('input', $event.target.checked)"
          @blur="$emit('blur', $event)"
          v-bind="$attrs"
      />
      <span class="checkbox-text">{{ label }}</span>
    </label>
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  value: Boolean,
  label: String,
  error: [String, null],
  id: { type: String, default: () => `cb-${Math.random().toString(36).slice(2,9)}` },
})
defineEmits(['input','blur'])
</script>
