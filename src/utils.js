export function normalize(str) {
    return str.replace(/[^\w\s]/gi, '').toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
}

export function toast(str) {
    return window.M.toast({html: str, displayLength: 1000})
}