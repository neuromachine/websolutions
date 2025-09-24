export default {
    key: 'simplified',
    title: 'Связаться',
    fields: [
        { name: 'mix', type: 'text', label: 'имя в мессенджере, телефон или e-mail', validation: { required: true, min: 2, max: 50 } },
    ],
}
