const store = require('./store')
const jwt = require('jsonwebtoken')
const getUserByLegajo = (legajo) => {
  const { allUsuarios } = store.getUsers()
  const user = allUsuarios.find((element) => {
    return element.legajo == legajo
  })
  return new Promise((resolve, reject) => {
    if (!user) {
      console.error('[CONTROLLER LOGIN - NO USER]')
      return reject('Legajo no encontrado')
    }
    let token = jwt.sign(
      {
        legajo: user.legajo,
        name: user.name,
        turno: user.turno,
      },
      'semilla-secret'
    )
    user.token = token
    resolve(user)
  })
}
module.exports = {
  getUserByLegajo,
}
