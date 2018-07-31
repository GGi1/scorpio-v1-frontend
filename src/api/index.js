import AuthService from '../services/AuthService'

const BASE = 'http://localhost:3000'
const Auth = new AuthService()

let newCharge = function(charge){
  let newCharge = {charge: charge}
  return Auth.fetch(BASE+'/charges', {
      body: JSON.stringify(newCharge),
      headers: {
          'Content-Type': 'application/json'
      },
      method: "POST"
  }).then(res => {
    Auth.setToken(res.jwt)
    return Promise.resolve(res)
  })
}

let addCharge = function(movement){
  let newMovement = {movement: movement}
  return fetch(BASE+"/movements", {
    body: JSON.stringify(newMovement),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST"
  }).then( rawResponse => {
    let parsedResponse = rawResponse.json()
    return parsedResponse
  })
}



let handleErrors = function(response){
  if(!response.ok){
    throw Error(response.statusText)
  }
  return response
}

export {handleErrors, newCharge}