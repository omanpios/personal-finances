export async function postData(url = "", method = "POST", data = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

export async function getData(url = "", method = "GET") {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
export let currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
