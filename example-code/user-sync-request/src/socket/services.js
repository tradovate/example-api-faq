import { URL } from '../data'
import { getUserData } from './storage'


export const tvGet = async (endpoint, query = null) => {
    const { accessToken } = getUserData()
    try {
        let q = ''
        if(query) {
            q = Object.keys(query).reduce((acc, next, i, arr) => {
                acc += next + '=' + query[next]
                if(i !== arr.length - 1) acc += '&'
                return acc
            }, '?')
        }

        console.log(q.toString())
        let url = query !== null
            ? URL + endpoint + q
            : URL + endpoint

        console.log(url)

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const js = await res.json()

        // console.log(js)

        return js

    } catch(err) {
        console.error(err)
    }
}

export const tvPost = async (endpoint, data, _usetoken = true) => {
    const { accessToken } = getUserData()
    const bearer = _usetoken ? { Authorization: `Bearer ${accessToken}` } : {} 
    try {
        const res = await fetch(DEMO_URL + endpoint, {
            method: 'POST',
            headers: {
                ...bearer,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const js = await res.json()

        // console.log(js)

        return js

    } catch(err) {
        console.error(err)
    }
}

