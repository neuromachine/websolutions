<template>
  <div class="card shadow-sm border-0">
    <div class="card-header bg-dark text-white py-3">
      <h5 class="card-title mb-0">Калькулятор и Симулятор: Llama vs Gemini 3.5 Pro</h5>
    </div>
    <div class="card-body">
      <!-- Настройки модели -->
      <div class="row g-3 mb-4">
        <div class="col-md-6">
          <label class="form-label fw-bold">Уровень ИИ (Выбор модели):</label>
          <select v-model="selectedModel" class="form-select border-primary" @change="updateTokens">
            <option value="llama">Llama 3 8B (Дешево, сухо, по фактам)</option>
            <option value="geminiPro">Gemini 3.5 Pro (Дорого, эмпатия, активные продажи)</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Запросов от клиентов в день:</label>
          <div class="d-flex align-items-center">
            <input type="range" min="10" max="1000" step="10" v-model.number="dailyChats" class="form-range me-3">
            <span class="badge bg-secondary fs-6" style="width: 70px;">{{ dailyChats }}</span>
          </div>
        </div>
      </div>

      <!-- Расчет стоимости -->
      <div class="p-3 bg-light rounded mb-4">
        <div class="row text-center">
          <div class="col-md-4 mb-2 mb-md-0">
            <div class="text-muted small">Вход (RAG + Промпт)</div>
            <div class="fs-5 fw-semibold text-dark">{{ totalInputCost.toFixed(2) }} $ / мес</div>
          </div>
          <div class="col-md-4 mb-2 mb-md-0">
            <div class="text-muted small">Выход (Генерация ответа)</div>
            <div class="fs-5 fw-semibold text-dark">{{ totalOutputCost.toFixed(2) }} $ / мес</div>
          </div>
          <div class="col-md-4">
            <div class="text-muted small fw-bold text-primary">Итого API (в месяц)</div>
            <div class="fs-4 fw-bold text-primary">{{ totalMonthlyCost.toFixed(2) }} $</div>
          </div>
        </div>
      </div>

      <!-- Имитация ответа на типовой вопрос -->
      <div class="border rounded p-0 overflow-hidden">
        <div class="bg-light p-3 border-bottom">
          <div class="badge bg-danger mb-2">Контекст из CRM (Передано в ИИ)</div>
          <p class="small text-muted mb-2 font-monospace">
            ID: 47f272b1... | Тур: "Дананг и Ба На Хиллс из Нячанга". Тип: Под ключ (Трансфер, перелет/поезд, отель, билеты на канатную дорогу, Золотой мост). Цена: $185 с человека. Отправление: Ежедневно.
          </p>
          <div class="badge bg-info text-dark mb-1">Вопрос туриста</div>
          <p class="fst-italic text-dark fw-medium mb-0">
            "Здравствуйте мы завтра прилетаем в НяЧанг, хотим съездить на БаНаХилз в течении недели, сколько стоит? нас 3"
          </p>
        </div>

        <div class="p-4" :class="selectedModel === 'geminiPro' ? 'bg-white' : 'bg-light'">
          <div class="fw-bold mb-3 d-flex align-items-center">
            Ответ модели ({{ selectedModel === 'geminiPro' ? 'Менеджер по продажам' : 'Базовый автоответчик' }}):
          </div>
          <div style="white-space: pre-line;" class="text-dark">
            {{ simulatedResponse }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Полярные тарифы за 1 000 000 токенов
// Llama 3 (Open source на Vertex) - копейки
// Gemini 3.5 Pro - флагманские цены
const rates = {
  llama: { input: 0.15 / 1000000, output: 0.15 / 1000000 },
  geminiPro: { input: 1.25 / 1000000, output: 5.00 / 1000000 }
};

const selectedModel = ref('llama');
const dailyChats = ref(50);

// Llama отвечает коротко, Gemini Pro расписывает красиво
const inputTokens = ref(2000);
const outputTokens = ref(200);

const updateTokens = () => {
  if (selectedModel.value === 'geminiPro') {
    outputTokens.value = 800;
  } else {
    outputTokens.value = 200;
  }
};

const totalInputCost = computed(() => dailyChats.value * inputTokens.value * 30 * rates[selectedModel.value].input);
const totalOutputCost = computed(() => dailyChats.value * outputTokens.value * 30 * rates[selectedModel.value].output);
const totalMonthlyCost = computed(() => totalInputCost.value + totalOutputCost.value);

const simulatedResponse = computed(() => {
  if (selectedModel.value === 'llama') {
    return `Здравствуйте. Тур в Дананг и Ба На Хиллс из Нячанга доступен. Стоимость тура "под ключ" составляет $185 на одного человека. На 3 человек общая стоимость составит $555. В стоимость включены трансфер, транспорт, отель и билеты на канатную дорогу. Тур проводится ежедневно. Для бронирования укажите ваши даты.`;
  } else {
    return `Здравствуйте! Добро пожаловать во Вьетнам, отличный выбор маршрута! 🇻🇳\n\nДа, мы организуем полноценные туры из Нячанга в Дананг с посещением Ба На Хиллс и знаменитого Золотого моста. Вам не придется ни о чем беспокоиться — тур организован полностью «под ключ».\n\n💼 **Что включено:**\n• Все трансферы по маршруту\n• Транспорт (перелет или поезд из Нячанга в Дананг)\n• Проживание в отеле\n• Входные билеты на самую длинную канатную дорогу в мире (Ба На Хиллс)\n\n💰 **Стоимость:**\nЦена составляет $185 на человека. Для вашей компании из троих человек итоговая сумма будет $555 за весь пакет услуг.\n\n📅 Так как туры отправляются ежедневно, вы можете выбрать любой удобный день на следующей неделе. Подскажите, в каком отеле в Нячанге вы останавливаетесь и какие даты для вас предпочтительнее? Я проверю наличие мест и оформлю бронь!`;
  }
});
</script>