<template>
  <Form v-slot="{ handleSubmit }" :validation-schema="validationSchema">
    <form @submit.prevent="handleSubmit(onSubmit)" class="dynamic-form">

      <!-- Поля -->
      <div v-for="fieldDef in schema.fields" :key="fieldDef.name" class="form-field">
        <Field :name="fieldDef.name" v-slot="{ field, errors }">
          <component
              :is="resolveComponent(fieldDef.type)"
              v-bind="mergeBindings(field, fieldDef)"
              :error="errors?.[0] || null"
          />
        </Field>
      </div>

      <!-- Кнопка -->
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
      </button>

      <!-- Сообщения -->
      <div v-if="submitStatus === 'success'" class="success-msg" role="status" aria-live="polite">
        Спасибо! Ваша заявка принята (ID: {{ lastResponse?.id }})
      </div>
      <div v-if="submitStatus === 'error'" class="error-msg" role="alert">
        Ошибка отправки: {{ lastResponse?.message || 'Попробуйте позже' }}
      </div>
    </form>
  </Form>
</template>

<script setup>
import { computed } from 'vue'
import { Form, Field, useForm } from 'vee-validate'
import { buildYupSchema } from '@/utils/validationBuilder' // если у тебя есть утилита
import { useFormStore } from '@/stores/formStore'

// Base components (импортируем реальные компоненты)
import BaseInput from './BaseInput.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseSelect from './BaseSelect.vue'
import BaseCheckbox from './BaseCheckbox.vue'

// props
const props = defineProps({
  schema: { type: Object, required: true },
})

// store
const store = useFormStore()

// валидация: генерация yup-схемы из схемы формы (использует твою утилиту)
const validationSchema = computed(() => {
  // если у тебя есть buildYupSchema — используй её
  if (typeof buildYupSchema === 'function') return buildYupSchema(props.schema)
  // fallback: простая схема (не строгая)
  const shape = {}
  props.schema.fields.forEach(f => {
    if (f.validation?.required) shape[f.name] = (v) => v // placeholder
  })
  return null
})

// доступ к setErrors (взято из контекста Form)
const { setErrors } = useForm()

// статус/ответ из store
const submitStatus = computed(() => store.forms[props.schema.key]?.status || null)
const lastResponse = computed(() => store.forms[props.schema.key]?.response || null)
const isSubmitting = computed(() => submitStatus.value === 'loading')

// резолвер компонента (возвращает сам компонент)
function resolveComponent(type) {
  switch (type) {
    case 'textarea': return BaseTextarea
    case 'select': return BaseSelect
    case 'checkbox': return BaseCheckbox
    case 'text':
    default: return BaseInput
  }
}

/**
 * Объединяет пропсы, приходящие из Field (value, onInput, name и т.д.)
 * с дополнительными props из схемы и с label.
 * Важно: spread order таков, что handlers из `field` имеют приоритет.
 */
function mergeBindings(field, fieldDef) {
  return {
    // сначала все кастомные props (placeholder, id, class и т.д.)
    ...(fieldDef.props || {}),
    // передаём label как обычный проп (если указан)
    ...(fieldDef.label ? { label: fieldDef.label } : {}),
    // затем привязки vee-validate (value, name, onInput и пр.)
    ...field
  }
}

/* нормализуем server errors: { field: [msgs] } -> { field: 'first msg' } */
function normalizeServerErrors(errorsObj = {}) {
  const out = {}
  Object.keys(errorsObj).forEach(k => {
    const v = errorsObj[k]
    out[k] = Array.isArray(v) ? v[0] : String(v)
  })
  return out
}

/* submit */
async function onSubmit(values) {
  try {
    await store.submitForm(props.schema.key, values)
    // success — store обновит статус/response
  } catch (err) {
    // ожидаем err.type === 'validation' от formService/formStore
    if (err?.type === 'validation' && err.errors) {
      const normalized = normalizeServerErrors(err.errors)
      // проставляем ошибки в vee-validate
      try { setErrors(normalized) } catch (e) { /* noop */ }
      // ставим фокус на первое поле с ошибкой
      const first = Object.keys(normalized)[0]
      if (first) {
        const el = document.querySelector(`[name="${first}"]`)
        if (el && typeof el.focus === 'function') el.focus()
      }
      return
    }
    // иначе — глобальная ошибка (store уже содержит response.message)
    // можно показать toast или полагаться на computed submitStatus/lastResponse
  }
}
</script>

<style scoped>
.dynamic-form { display:flex; flex-direction:column; gap:1rem; }
.success-msg { color:green; }
.error-msg { color:#b91c1c; }
button[disabled] { opacity:.6; cursor:not-allowed; }
</style>
