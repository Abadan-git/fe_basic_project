async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export default fetchData;
