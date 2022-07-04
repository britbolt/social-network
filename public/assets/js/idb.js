let db;
const request = indexedDB.open('social-network', 1);

request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore('new_user', { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine) {
        uploadUsers()
;    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

function uploadUsers() {
    const transaction = db.transaction(['new_user'], 'readwrite');
    const userObjectStore = transaction.objectStore('new_user');
    const getAll = userObjectStore.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch('/api/user-routes', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }
                const transaction = db.transaction(['new_user'], 'readwrite');
                const userObjectStore = transaction.objectStore('new_user');
                userObjectStore.clear();
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
} 

window.addEventListener('online', uploadUsers)