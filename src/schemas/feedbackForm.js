// src/schemas/feedbackForm.js
export default {
    key: 'feedback',
    // (опционально) human title
    title: 'Обратная связь',
    fields: [
        { name: 'name', type: 'text', label: 'Имя', validation: { required: true, min: 2, max: 50 } },
        { name: 'message', type: 'textarea', label: 'Сообщение', validation: { required: true, min: 5 } },
    ],
}
