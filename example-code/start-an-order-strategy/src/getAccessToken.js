import { setUserData } from "./socket/storage"


export async function getAccessToken(URL, credentials) {

    const authResponse = await fetch(URL + '/auth/accesstokenrequest', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    
    const userData = await authResponse.json()
    
    console.log(userData)

    setUserData(userData)

    return userData
}