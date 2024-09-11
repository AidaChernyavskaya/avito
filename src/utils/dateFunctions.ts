export const transformDateFormat = (date: string): string => {
    const parseDate = Date.parse(date)
    if (!isNaN(parseDate)) {
        return new Date(date).toLocaleDateString('ru-RU', {year: 'numeric', month: '2-digit', day: '2-digit'});
    }
    return '';
}

export default transformDateFormat;
