function formatDate(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);

    // Check if the date is today
    if (date.toDateString() === now.toDateString()) {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12) || 12;
        return `Today at ${formattedHours}:${minutes} ${ampm}`;
    }

    // Check if the date is yesterday
    const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1000));
    if (date.toDateString() === yesterday.toDateString()) {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12) || 12;
        return `Yesterday at ${formattedHours}:${minutes} ${ampm}`;
    }

    // Otherwise, format the date as desired
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${formattedHours}:${minutes} ${ampm}, ${day}/${month}/${year}`;
}


export default formatDate