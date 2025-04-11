const translitMap = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
    з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts',
    ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
}

function translit(text) {
    return text
        .split('')
        .map(char => {
            const lower = char.toLowerCase()
            return translitMap[lower] !== undefined ? translitMap[lower] : lower
        })
        .join('')
}

export function slugify(text) {
    return translit(text)
        .replace(/^[0-9.]+\s*/g, '')        // удалить порядковые префиксы (1., 1.2. и т.п.)
        .replace(/[^a-z0-9]+/gi, '-')       // заменить всё, кроме латиницы и цифр, на "-"
        .replace(/^-+|-+$/g, '')            // убрать начальные и конечные "-"
        .toLowerCase()
}
