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
          :placeholder="label"
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

<style scoped>
.base-input {
  color: #404040;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  height: 50px;
  display: block;
  padding-left: 25px;
  border-radius: 5px;
  background-color: #ffffff;
  border: none;
  outline: 0;
}

.base-input::-webkit-input-placeholder {
  color: #5f5f5f;
}
.base-input:-ms-input-placeholder {
  color: #5f5f5f;
}
.base-input::-ms-input-placeholder {
  color: #5f5f5f;
}
.base-input::placeholder {
  color: #5f5f5f;
}
/* TODO: переработать позиционирование и т.п. */
.field-error { position: absolute; top: 0; left: 10px; color: #ff4d15; font-size: 14px;}
.label { display: none}
.has-error { color: #2c0b0e !important;}
</style>