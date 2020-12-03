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
let dateDB

let nameUser = document.getElementsByClassName('name-user')
let fechaNow = document.getElementById('print-fecha')
let dayInWork = document.getElementsByClassName('day-in-work')
let tabla = document.getElementById('tabla')

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
  let turno = user.body.turno
  nameUser[0].insertAdjacentHTML('beforeend', `${name} - ${legajo}`)
  nameUser[1].insertAdjacentHTML('beforeend', name)
  fetch('http://127.0.0.1:3000/getDate', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      mes: '',
      anio: '',
      turno: turno,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      dateDB = data
      imprimirDatosDate(dateDB)
    })
}
const imprimirDatosDate = (date) => {
  let fecha = new Date(date.body.date)
  day = fecha.getDate()
  mes = fecha.getMonth()
  mes = listMesNombre[mes]
  fechaNow.insertAdjacentHTML('beforeend', `${day} de ${mes}`)
  comoTrabajo = date.body.inDayWork.turno
  diasParaFranco = date.body.inDayWork.diaEnTurno
  dayInWork[0].insertAdjacentHTML('beforeend', `${comoTrabajo}`)
  dayInWork[1].insertAdjacentHTML('beforeend', `${diasParaFranco}`)

  //Tabla
  for (let i = 0; i < date.body.listAllDaysOnMes.length; i++) {
    let fecha = new Date(date.body.listAllDaysOnMes[i])
    let dia = fecha.getDate()
    let mes = fecha.getMonth()
    let anio = fecha.getFullYear()
    let turnoManiana = date.body.listAllTurnos.maniana[i]
    let turnoTarde = date.body.listAllTurnos.tarde[i]
    let turnoNoche = date.body.listAllTurnos.noche[i]
    let turnoFranco = date.body.listAllTurnos.franco[i]

    tabla.insertAdjacentHTML(
      'beforeend',

      `<tr>
          <td>
              ${dia}/${mes + 1}/${anio}
          </td>
        <td>
        ${turnoManiana}
        </td>
        <td>
        ${turnoTarde}
        </td>
        <td>
        ${turnoNoche}
        </td>
        <td>
        ${turnoFranco}
        </td>
        </tr>`
    )
  }
}
