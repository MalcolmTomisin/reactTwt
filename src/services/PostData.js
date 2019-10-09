export function PostData(postUrl = '', userData ) {

    return new Promise((resolve, reject) => {
        fetch(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson)
        })
        .catch((error) => {
            reject(error)
        })
    })
}