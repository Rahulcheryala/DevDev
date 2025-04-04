export const formatDate = (dateInput: string | number | Date) => {
    const date = new Date(dateInput);
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return formatter.format(date);
}

