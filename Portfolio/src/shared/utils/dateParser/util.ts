export const dateParser = (date: Date | string | null) => {
    if (typeof date !== 'string') {
        console.error('Invalid date format. Expected a string.');
        return ''; // Return an empty string or handle the error as needed
    }

    // Proceed if date is a valid string
    const parsedDate = date.split('T')[0].split('-').reverse().join('/');
    console.log(parsedDate);
    return parsedDate;
}
