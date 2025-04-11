export function extractTitle(text) {
    return text.replace(/^[0-9.]+\s*/, '') // убрать "1. ", "2.3. ", и т.п.
}