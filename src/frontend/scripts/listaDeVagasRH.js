const uri = "http://localhost:8081/vagas"

async function getItems() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

 const data = await fetch(uri, {
    method: "GET",
    headers: headers,
  }).then((response) => {return response.json()});

  console.log(data);
}