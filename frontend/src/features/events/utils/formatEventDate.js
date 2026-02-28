export const formatEventDate = (date) => {
    const eventDate = new Date(date);

    return `${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    })}`;
}