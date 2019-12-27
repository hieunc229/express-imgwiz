export function lastModifiedFormat(date: Date) {
    return `${date.toLocaleString("en-us", { weekday: 'short' })}, ${date.getDate()} ${date.toLocaleString("en-us", { month: 'short' })} ${date.getFullYear()} ${date.toLocaleString("en-us", { hour: '2-digit', minute: '2-digit', hour12: false, second: '2-digit' })} GTM`;
}
