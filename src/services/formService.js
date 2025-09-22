import api from '@/utils/api.js'

export default {
    async sendForm({ formKey, data, meta }) {
        const { data: res } = await api.post('/forms/submit', {
            form_key: formKey,
            data,
            meta,
        })
        return res // { success: true, id: 5, status: "pending" }
    },
}
