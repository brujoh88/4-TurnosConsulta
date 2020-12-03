let valueLegajo = document.getElementById('valorLegajo')
let buttonLogin = document.getElementById('botonLegajo')
let page1 = document.getElementById('page-1')
let page2 = document.getElementById('page-2')
let page3 = document.getElementById('page-3')
let page4 = document.getElementById('page-4')

const listMesNombre = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]
/*
Traer elementos del DOM para insertar datos del backend
*/
let userDb
<<<<<<< HEAD
let dateDB
=======
let dataDB
>>>>>>> 544105268d16407fb84bdb92f3b67ed419920698
let nameUser = document.getElementsByClassName('name-user')
let fechaNow = document.getElementById('print-fecha')

/*
========================
 Logica para pag 1
========================
*/
buttonLogin.addEventListener('click', () => {
  if (valueLegajo.value === '') {
    alert('Ingresa un valor')
  } else {
    fetch('http://127.0.0.1:3000/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        legajo: valueLegajo.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.body.name) {
          alert('Legajo no encontrado')
        } else {
          page1.classList.add('ocultar')
          page2.classList.remove('ocultar')
          userDb = data
          imprimirDatosUser(userDb)
          fetch('http://127.0.0.1:3000/getDate')
            .then((response) => response.json())
            .then((data) => {
              dateDB = data
              imprimirDatosDate(dateDB)
            })
        }
      })
      .catch((err) => console.log(err))
  }
})

/*
========================
 Logica para pag 2
========================
*/

const imprimirDatosUser = (user) => {
  let name = user.body.name
  let legajo = user.body.legajo
  nameUser[0].insertAdjacentHTML('beforeend', `${name} - ${legajo}`)
  nameUser[1].insertAdjacentHTML('beforeend', name)
}
const imprimirDatosDate = (date) => {
  let fecha = new Date(date.body.date)
  day = fecha.getDate()
  mes = fecha.getMonth()
  mes = listMesNombre[mes]
  fechaNow.insertAdjacentHTML('beforeend', `${day} de ${mes}`)
}
