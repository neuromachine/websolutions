// src/utils/validationBuilder.js
import * as yup from 'yup'

/**
 * Простой маппер validation -> yup
 * Поддерживаемые ключи: required, min, max, email, matches (regex), url, length, minItems, maxItems, number|minNumber|maxNumber
 */
export function buildYupSchema(formSchema) {
    const shape = {}

    formSchema.fields.forEach(f => {
        const v = f.validation || {}
        // default base type
        let s = yup.mixed()

        // map by field type
        if (['text','textarea','select'].includes(f.type)) s = yup.string()
        else if (f.type === 'checkbox') s = yup.boolean()
        else if (f.type === 'number') s = yup.number()
        else s = yup.mixed()

        // common rules
        if (v.required) {
            s = s.required(v.requiredMessage || 'Обязательное поле')
        }
        if (v.min && (typeof v.min === 'number')) {
            // string length or number min
            if (s === yup.string()) s = s.min(v.min, v.minMessage || `Минимум ${v.min} символов`)
            else s = s.min ? s.min(v.min, v.minMessage || `Минимум ${v.min}`) : s
        }
        if (v.max && (typeof v.max === 'number')) {
            if (s === yup.string()) s = s.max(v.max, v.maxMessage || `Максимум ${v.max} символов`)
            else s = s.max ? s.max(v.max, v.maxMessage || `Максимум ${v.max}`) : s
        }
        if (v.email) {
            s = s.email(v.emailMessage || 'Некорректный email')
        }
        if (v.matches) {
            s = s.matches(new RegExp(v.matches.pattern), v.matches.message || 'Неверный формат')
        }
        // number specific
        if (v.minNumber !== undefined && s === yup.number()) s = s.min(v.minNumber, v.minNumberMessage || `Минимум ${v.minNumber}`)
        if (v.maxNumber !== undefined && s === yup.number()) s = s.max(v.maxNumber, v.maxNumberMessage || `Максимум ${v.maxNumber}`)

        // default to nullable string (so empty string fails required)
        if (s === yup.string()) s = s.nullable()

        shape[f.name] = s
    })

    return yup.object().shape(shape)
}
