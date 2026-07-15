export default {
    key: 'quote_quiz',
    fields: [
        { name: 'projectType', type: 'text', label: 'Тип бизнеса / проекта' },
        { name: 'goal', type: 'text', label: 'Основная цель (сайт, маркетинг, автоматизация...)' },
        { name: 'urgency', type: 'text', label: 'Срочность / Дедлайн' },
        { name: 'budgetRange', type: 'text', label: 'Ориентировочный бюджет' },
        { name: 'existingAssets', type: 'text', label: 'Существующие активы (CRM, дизайн, контент...)' },
        { name: 'contactName', type: 'text', label: 'Ваше имя', validation: { required: true } },
        { name: 'contactEmail', type: 'text', label: 'Email или Телефон', validation: { required: true } },
        { name: 'comment', type: 'textarea', label: 'Дополнительные комментарии' },
    ],
}
