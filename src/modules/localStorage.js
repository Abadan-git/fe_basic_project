export function saveToLocalStorage(key, value) {
    try {
        const stringifyValue = JSON.stringify(value);
        localStorage.setItem(key, stringifyValue);
    } catch (error) {
        console.error(`Error saving to localStorage: ${error.message}`);
    }
}

export function getFromLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    } catch (error) {
        console.error(`Error reading from localStorage: ${error.message}`);
    }
}
