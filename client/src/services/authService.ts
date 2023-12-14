export function login(
  username: string,
  password: string,
){
  try {
    fetch('http://localhost:3000/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
    .then((response) => {
      if (response.status === 401) {
        alert('Invalid credentials')
        throw new Error('Invalid credentials')
      }
      return response.json()
    })
    .then(data => {localStorage.setItem('token', data.access_token)})
  } catch (error) {
    console.log(error)
  }
}
export function logout(){
  localStorage.removeItem('token')
}
