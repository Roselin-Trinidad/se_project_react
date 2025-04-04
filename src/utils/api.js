const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      throw err;
    });
}

function addItem({ name, imageUrl, selectedWeather }) {
    return fetch(`${baseUrl}/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        imageUrl,
        selectedWeather,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
}

function deleteItem(id) {
    return fetch(`${baseUrl}/items/:${id}`, {
    method: "DELETE",
  })
  .then((res) => {
    console.log(`${baseUrl}/items/:${id}`);
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
  });
}


export { getItems, deleteItem, addItem };
