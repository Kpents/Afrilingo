const DB_NAME = "afrilingo-audio-studio";
const STORE = "takes";

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) return reject(new Error("This browser does not support local recording storage."));
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath:"itemId" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function transact(mode, operation) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE, mode);
    const request = operation(transaction.objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
  });
}

export const listAudioTakes = () => transact("readonly", store => store.getAll());
export const getAudioTake = itemId => transact("readonly", store => store.get(itemId));
export const saveAudioTake = take => transact("readwrite", store => store.put(take));
export const deleteAudioTake = itemId => transact("readwrite", store => store.delete(itemId));
