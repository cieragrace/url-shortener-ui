export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}


export const updateAPI = (newURL) => {
  const results = fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    body: JSON.stringify(newURL),
    headers: {
      'Content-Type': 'application/json'
    }
})
  .then((res) => {
    if(!res.ok) {
      throw new Error(res.status)
    }
    return res.json()
  })
  .catch(error => console.log(error))
  return results
} 