
// import components here
import { mainUrl } from '../url';


// REGISTER A USER
export const registerAuser = async (username, full_name, password) => {
    const response = await fetch(`${mainUrl.url}create-user`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        }, body: JSON.stringify({
          "full_name":full_name,
          "username":username,
          "password":password,
        })
    })
    
    const data = await response.json();
    console.log(data)

}

// LOGIN A USER
export const loginUser = async ( username, password ) => {
    // window.localStorage.removeItem('username')
    
    const response = await fetch(`${mainUrl.url}login-user`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        }, body: JSON.stringify({
          "username":username,
          "password":password,
        })
      })
  
    const data = await response.json()
    console.log('data: ', data.id)
    if(data === "Username dont'found") {
        // console.log('not here')
        return "Username dont'found"
       
    } else if(data === "invalid password"){
        // console.log('invalid pwd')
        return "invalid password"
    } 
    else {
        console.log('logged in: ', data)
        window.localStorage.setItem('username', username)
        window.localStorage.setItem('id', data.id)
        window.localStorage.setItem('token', data.token)
        
        // const user = window.localStorage.getItem('username')
        return username
    }
}

// LOGOUT A USER 
export const loggoutUser = async () => {
    const token = window.localStorage.getItem('token');
    await fetch(`${mainUrl.url}logout-user`, {
      headers:{'Authorization':`Token ${token}`}
    })
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('token')
}

// CHECK A USER LOGGED IN
export const checkLogged = async () => {
   const user = window.localStorage.getItem('username');
   return user;
}
