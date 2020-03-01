

function setSessionStorage(key,value) {
    sessionStorage.setItem(key,value);
}
function getSessionStorage(key) {
    return sessionStorage.getItem(key);
}
function deleteSessionStorage(key) {
    sessionStorage.removeItem(key);
}
function deleteAllSessionStorage() {
    sessionStorage.clear();
}

module.exports = {
    setSessionStorage,
    getSessionStorage,
    deleteAllSessionStorage,
    deleteSessionStorage
}