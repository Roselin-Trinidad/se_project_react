const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json(); 
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`)
    .catch((err) => {
      console.error("Fetch error:", err);
      throw err;
    });
}

function addItem(token, { name, imageUrl, weather: selectedWeather }) {
    return request(`${baseUrl}/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        imageUrl,
        weather: selectedWeather,
      }),
    });
}

function deleteItem(token, id) {
    return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
        id,
    }),
  });
}


export { getItems, deleteItem, addItem };
