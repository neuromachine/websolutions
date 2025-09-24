// src/services/formService.js
import api from '@/utils/api.js' // твой axios instance

function buildClientMeta() {
    try {
        return {
            ua: navigator.userAgent,
            tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
            ref: document.referrer || null,
        }
    } catch (e) {
        return {}
    }
}

export default {
    /**
     * payload: { formKey, data, meta? }
     * Возвращает: normalised response (data from server)
     * В случае server-side validation errors — выкидывает ошибку { type: 'validation', errors: {...} }
     * В случае других ошибок — выбрасывает { type: 'server', ... }
     */
    async sendForm({ formKey, data, meta = {} }) {
        const payload = {
            form_key: formKey,
            data,
            meta: { ...buildClientMeta(), ...meta },
        }

        try {
            const { data: res } = await api.post('/forms/submit', payload)

            // Ожидаемый успешный ответ: { success: true, id: 5, status: 'pending' }
            // Ожидаемая ошибка валидации: { success: false, errors: { name: ['msg'] } }
            if (res && res.success === false && res.errors) {
                // нормализуем и пробрасываем
                throw { type: 'validation', errors: res.errors, raw: res }
            }

            return res
        } catch (err) {
            // axios network / 5xx / other
            if (err.type === 'validation') throw err

            if (err.response && err.response.data) {
                const server = err.response.data
                if (server.errors) {
                    throw { type: 'validation', errors: server.errors, raw: server }
                }
                throw { type: 'server', raw: server, message: server.message || 'Server error' }
            }
            // fallback
            throw { type: 'network', message: err.message || 'Network error', raw: err }
        }
    },
}
