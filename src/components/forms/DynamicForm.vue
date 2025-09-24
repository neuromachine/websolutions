<template>
  <Form v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <div v-for="fieldDef in schema.fields" :key="fieldDef.name" class="form-field">
        <Field :name="fieldDef.name" v-slot="{ field: slotField, meta, errors }">
          <component
              :is="resolveComponent(fieldDef.type)"
              :modelValue="slotField.value"
              @update:modelValue="val => setFieldValue(slotField, val)"
              :label="fieldDef.label"
              :error="errors?.[0] || null"
              v-bind="fieldDef.props || {}"
          />
        </Field>
      </div>

      <div class="form-actions">
        <button :disabled="isLoading" type="submit">
          <span v-if="isLoading">Отправка...</span>
          <span v-else>Отправить</span>
        </button>
      </div>

      <div v-if="lastResponse && lastResponse.success" class="form-success" role="status" aria-live="polite">
        Спасибо — заявка принята. №{{ lastResponse.id }}, статус: {{ lastResponse.status || '—' }}
      </div>

      <div v-if="globalError" class="form-error" role="alert">
        {{ globalError }}
      </div>
    </form>
  </Form>
</template>

<script setup>
import {computed} from 'vue'
import {Form, Field, useForm} from 'vee-validate'
import {buildYupSchema} from '@/utils/validationBuilder'
import {useFormStore} from '@/stores/formStore'
import BaseInput from './BaseInput.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseSelect from './BaseSelect.vue'
import BaseCheckbox from './BaseCheckbox.vue'

const props = defineProps({
  schema: {type: Object, required: true},
})

/* build validation schema */
const validationSchema = buildYupSchema(props.schema)
const { handleSubmit, setErrors } = useForm({ validationSchema })

const formStore = useFormStore()

function resolveComponent(type) {
  switch (type) {
    case 'text':
      return BaseInput
    case 'textarea':
      return BaseTextarea
    case 'select':
      return BaseSelect
    case 'checkbox':
      return BaseCheckbox
    default:
      return BaseInput
  }
}

const isLoading = computed(() => (formStore.forms[props.schema.key]?.status === 'loading'))
const lastResponse = computed(() => formStore.forms[props.schema.key]?.response)
const storeErrors = computed(() => formStore.forms[props.schema.key]?.errors)
const globalError = computed(() => {
  const f = formStore.forms[props.schema.key]
  if (!f) return null
  // если есть non-field server error message:
  if (f.status === 'error' && f.response && f.response.message) return f.response.message
  return null
})

/* normalize server errors: { field: [msgs] } -> { field: 'first msg' } */
function normalizeServerErrors(errorsObj = {}) {
  const out = {}
  Object.keys(errorsObj).forEach(k => {
    const v = errorsObj[k]
    out[k] = Array.isArray(v) ? v[0] : String(v)
  })
  return out
}

function setFieldValue(slotField, val) {
  console.log('setFieldValue', slotField?.name, val, slotField?.value)
  if (!slotField) return

  // если slotField.value — ref (обычный случай)
  try {
    if (slotField.value && Object.prototype.hasOwnProperty.call(slotField.value, 'value')) {
      slotField.value.value = val
      return
    }
  } catch (e) { /* fallback */ }

  // если есть handler onChange — попробуем его
  if (typeof slotField.onChange === 'function') {
    try {
      slotField.onChange(val)
      return
    } catch (e) { /* fallback */ }
  }

  // последний вариант — напрямую записать (не идеально, но fallback)
  slotField.value = val
}

async function onSubmit(values) {
  console.log('onSubmit values:', values)
  try {
    await formStore.submitForm(props.schema.key, values)
    // success handled by store; optionally emit event
  } catch (err) {
    // validation errors from backend
    if (err.type === 'validation' && err.errors) {
      setErrors(normalizeServerErrors(err.errors))
      // focus first invalid field (optional)
      const first = Object.keys(err.errors)[0]
      if (first) {
        const el = document.querySelector(`[name="${first}"]`)
        if (el && typeof el.focus === 'function') el.focus()
      }
      return
    }

    // other errors -> show in UI: store has set response.message
    // nothing else needed here; globalError computed provides message
  }
}
</script>

<style scoped>
.form-field {
  margin-bottom: 1rem;
}

.form-actions {
  margin-top: 1rem;
}

/* minimal styling; replace with project styles */
.form-success {
  color: green;
  margin-top: .75rem;
}

.form-error {
  color: #b91c1c;
  margin-top: .75rem;
}

button[disabled] {
  opacity: .6;
  cursor: not-allowed;
}
</style>
