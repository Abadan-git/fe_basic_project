async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (response.ok){
            return await response.json();
        }
        throw new Error(`${url} response failed`);
    } catch (error) {
        throw error;
    }
}

export default fetchData;
