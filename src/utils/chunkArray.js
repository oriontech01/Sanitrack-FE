export const chunkArray = (array, chunkSize) => {
    return Array.from(
    { length: Math.ceil(array.length / chunkSize) },
    (_, index) => {
        const start = index * chunkSize;
        const end = start + chunkSize;
        return array.slice(start, end);
    }
    );
};