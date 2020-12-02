const store = require('./store')

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
    resolve(user)
  })
}
module.exports = {
  getUserByLegajo,
}
