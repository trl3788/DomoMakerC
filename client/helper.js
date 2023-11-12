const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('domoMessage').classList.remove('hidden');
};

const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');

    if(result.redirect) {
        window.location = result.redirect;
    }

    if(result.error) {
        handleError(result.error);
    }

    if(handler) {
        handler(result);
    }
};
const sendDelete = async (url, data, handler) => {
    const newURL = `${url}?_id=${data}`
    const response = await fetch(newURL, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    });

    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');

    if(result.redirect) {
        window.location = result.redirect;
    }

    if(result.error) {
        handleError(result.error);
    }

    if(handler) {
        handler(result);
    }

}

const hideError = () => {
    document.getElementById('domoMessage').classList.add('hidden');
}

module.exports = {
    handleError, 
    sendPost,
    hideError,
    sendDelete,
}