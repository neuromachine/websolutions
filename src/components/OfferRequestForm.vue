<template>
  <form class="newsletter-form" @submit.prevent="submitForm">
    <input
        type="text"
        class="input-newsletter"
        v-model="contact"
        name="email"
        placeholder="имя в мессенджере, телефон или e-mail"
        required
        autocomplete="off"
    />
    <button type="submit" :disabled="loading">
      {{ loading ? 'Отправка...' : 'Отправить' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import api from '@/utils/api.js'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  }
})

const uiStore = useUiStore()
const contact = ref('')
const loading = ref(false)

async function submitForm() {
  if (!contact.value.trim()) return
  try {
    loading.value = true
    uiStore.startGlobalLoading()

    await api.post('/offers/request', {
      id: props.id,
      contact: contact.value
    })

    contact.value = ''
    alert('Заявка успешно отправлена!')
  } catch (err) {
    console.error('Ошибка отправки заявки:', err)
    alert('Ошибка отправки заявки')
  } finally {
    loading.value = false
    uiStore.stopGlobalLoading()
  }
}
</script>

<style scoped>
.newsletter-form {
  display: flex;
  gap: 10px;
}
.input-newsletter {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
