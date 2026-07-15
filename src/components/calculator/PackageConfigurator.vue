<script setup>
import { useI18n } from 'vue-i18n';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update-quantity', 'update-notes', 'remove']);

const { t } = useI18n();

const handleQuantityChange = (event) => {
  const value = parseInt(event.target.value, 10);
  if (!isNaN(value) && value > 0) {
    emit('update-quantity', props.item.id, value);
  }
};

const handleNotesChange = (event) => {
  emit('update-notes', props.item.id, event.target.value);
};
</script>

<template>
  <div class="package-configurator">
    <div class="header">
      <h4>{{ item.title }}</h4>
      <button class="remove-btn" @click="emit('remove', item.id)">&times;</button>
    </div>

    <p class="description" v-if="item.description">{{ item.description }}</p>

    <div class="details">
      <div class="price-row" v-if="item.basePrice">
        <strong>{{ t('cp.packages.budget') }}:</strong> 
        {{ item.isPriceEstimated ? 'от ' : '' }}{{ item.basePrice }} {{ item.currency || t('cp.packages.currency') }}
      </div>
      <div class="timeline-row" v-if="item.timeline">
        <strong>{{ t('cp.packages.period') }}:</strong> 
        {{ Array.isArray(item.timeline) ? item.timeline.join(' - ') : item.timeline }} {{ item.timelineUnit || t('cp.packages.weeks') }}
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <label>Количество (Quantity)</label>
        <input type="number" min="1" :value="item.quantity" @input="handleQuantityChange" class="quantity-input" />
      </div>
    </div>

    <div class="options-list" v-if="item.options && item.options.length">
      <label>Включено (Included):</label>
      <ul>
        <li v-for="opt in item.options" :key="opt.id">
          <span class="check">✓</span> {{ opt.name }}
        </li>
      </ul>
    </div>

    <div class="notes-group">
      <label>Комментарий / Уточнения (Notes):</label>
      <textarea :value="item.notes" @input="handleNotesChange" rows="2" placeholder="Напишите ваши пожелания..."></textarea>
    </div>
  </div>
</template>

<style scoped>
.package-configurator {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: #fafafa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.header h4 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 20px;
  line-height: 1;
  color: #999;
  cursor: pointer;
}

.remove-btn:hover {
  color: #ff4d4f;
}

.description {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}

.details {
  font-size: 14px;
  margin-bottom: 16px;
}

.controls {
  margin-bottom: 16px;
}

.control-group label {
  display: block;
  font-size: 13px;
  color: #555;
  margin-bottom: 4px;
}

.quantity-input {
  width: 80px;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.options-list {
  margin-bottom: 16px;
}

.options-list label {
  font-size: 13px;
  font-weight: bold;
  color: #555;
}

.options-list ul {
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
}

.options-list li {
  font-size: 13px;
  color: #444;
  margin-bottom: 4px;
}

.check {
  color: #00D9EA;
  font-weight: bold;
  margin-right: 4px;
}

.notes-group label {
  display: block;
  font-size: 13px;
  color: #555;
  margin-bottom: 4px;
}

.notes-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 13px;
  resize: vertical;
}
</style>
