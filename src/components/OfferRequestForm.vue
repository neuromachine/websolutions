<script setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const props = defineProps({
  id: {
    type: Number,
    required: false,
  }
})

const contact = ref('')
const dataStore = useDataStore()

async function submitForm() {
  if (!contact.value.trim()) return
  await dataStore.sendOfferRequest(contact.value)
  contact.value = ''
}
</script>

<template>
  <form class="newsletter-form" @submit.prevent="submitForm">
    <input
        type="text"
        class="input-newsletter"
        v-model="contact"
        name="contact"
        placeholder="имя в мессенджере, телефон или e-mail"
        required
        autocomplete="off"
    />
    <button type="submit">Отправить</button>
  </form>
</template>
