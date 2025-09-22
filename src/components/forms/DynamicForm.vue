<template>
  <form @submit.prevent="onSubmit">
    <component
        v-for="field in schema.fields"
        :key="field.name"
        :is="resolveComponent(field.type)"
        v-model="formData[field.name]"
        :label="field.label"
        v-bind="field.props"
    />
    <button type="submit">Отправить</button>
  </form>
</template>

<script setup>
import {reactive} from 'vue'
import {useFormStore} from '@/stores/formStore'
import BaseInput from './BaseInput.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseSelect from './BaseSelect.vue'
import BaseCheckbox from './BaseCheckbox.vue'

const props = defineProps({
  schema: {type: Object, required: true},
})

const store = useFormStore()

// реактивные данные формы
const formData = reactive({})
props.schema.fields.forEach(f => formData[f.name] = '')

// сопоставление type → компонент
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

async function onSubmit() {
  await store.submitForm(props.schema, {...formData})
}
</script>
