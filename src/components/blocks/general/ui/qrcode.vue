<script setup>
import QrcodeVue from 'qrcode.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({
  url: {
    type: String,
    required: true,
    default: 'https://www.wspro.xyz/vi/compred/ivorycoast'
  },
  size: {
    type: Number,
    default: 200
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  foregroundColor: {
    type: String,
    default: '#000000'
  }
})
</script>

<template>
  <div class="qr-container">
    <!-- render-as="svg" — ключевой параметр для вашего запроса -->
    <qrcode-vue
        :value="url"
        :size="size"
        level="H"
        render-as="svg"
        :background="backgroundColor"
        :foreground="foregroundColor"
    />
    <p v-if="showLabel" class="qr-label">{{ t('ui.qrdescr') }}</p>
  </div>
</template>

<style scoped>
.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.qr-label {
  margin-top: 12px;
  font-family: sans-serif;
  font-size: 14px;
  color: #666;
}
</style>