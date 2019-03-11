function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }

  return Promise.reject(new Error(response.statusText));
}

function json(response) {
  return response.json();
}

export function getMessage() {
  return fetch('/api')
    .then(status)
    .then(json);
}
