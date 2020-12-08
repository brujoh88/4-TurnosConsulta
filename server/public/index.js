let tituloHeader = document.getElementById('header-titulo')
let valueLegajo = document.getElementById('valorLegajo')
let buttonLogin = document.getElementById('botonLegajo')
let page1 = document.getElementById('page-1')
let homeButton = document.getElementById('to-page2')
let searchButton = document.getElementById('to-page3')
let logOutButton = document.getElementById('to-page1')
let page2 = document.getElementById('page-2')
let buttonMesQuerry = document.getElementById('query-button')
let valueMesYearQuery = document.getElementById('value-mes-year')
let valueYearQuery = document.getElementById('value-year')
let opcionQuery = document.getElementById('opciones')
let page3 = document.getElementById('page-3')
let page4 = document.getElementById('page-4')
let backButtonTopage4 = document.getElementById('back-page4')
let tituloMes = document.getElementById('titulo-mes')
const emojis = ['vacio', '😭', '😫', '😓', '😒', '😌', '😁🎉']

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

const nombreDiasDeSemana = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

/*
==========================
On Load Page
==========================
*/
const tokenDecoded = function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}
window.onload = () => {
  let cacheDate = localStorage.getItem('token')
  if (cacheDate) {
    let dato = tokenDecoded(cacheDate)
    userDb = {
      error: '',
      body: dato,
    }
    tituloHeader.classList.add('ocultar')
    page1.classList.add('ocultar')
    page2.classList.remove('ocultar')
    homeButton.classList.remove('ocultar')
    searchButton.classList.remove('ocultar')
    logOutButton.classList.remove('ocultar')
    let userCache = {
      error: '',
      body: {
        legajo: dato.legajo,
        name: dato.name,
        turno: dato.turno,
      },
    }
    nameUser[0].classList.remove('ocultar')
    imprimirDatosUser(userCache)
  } else {
    page1.classList.remove('ocultar')
    nameUser[0].classList.add('ocultar')
  }
}
/*
Traer elementos del DOM para insertar datos del backend
*/
let userDb
let dateDB

let nameUser = document.getElementsByClassName('name-user')
let fechaNow = document.getElementById('print-fecha')
let dayInWork = document.getElementsByClassName('day-in-work')
let tabla = document.getElementsByClassName('tabla')
/*
====================================
Tabla
====================================
*/
const imprimirTabla = (date, fuente, tamanio) => {
  let turnoUsuario = userDb.body.turno
  tabla[fuente].innerHTML = ''
  tituloMes.innerHTML = ''

  let fecha = new Date(date.body.listAllTurnos.listAllDaysOnMes[1])
  let mes = fecha.getMonth()
  let anio = fecha.getFullYear()
  mes = listMesNombre[mes]
  tituloMes.insertAdjacentHTML('beforeend', `${mes} - ${anio}`)
  tabla[fuente].insertAdjacentHTML(
    'beforeend',
    `
  <tr class="text-tabla">
    <th>Día</th>    
    <th>Fecha</th>
    <th>Mañana</th>
    <th>Tarde</th>
    <th>Noche</th>
    <th>Franco</th>
  </tr>`
  )
  let ancla = false
  for (let i = 0; i < tamanio; i++) {
    let nameDayFormatDate = new Date(
      dateDB.body.listAllTurnos.listAllDaysOnMes[i]
    )
    nameDay = nombreDiasDeSemana[nameDayFormatDate.getUTCDay()]
    let fecha = new Date(date.body.listAllTurnos.listAllDaysOnMes[i])
    let dia = fecha.getDate()
    let mes = fecha.getMonth()
    let anio = fecha.getFullYear()
    let turnoManiana = date.body.listAllTurnos.maniana[i]
    let turnoTarde = date.body.listAllTurnos.tarde[i]
    let turnoNoche = date.body.listAllTurnos.noche[i]
    let turnoFranco = date.body.listAllTurnos.franco[i]
    let resaltarHoy
    let esHoy =
      (new Date(dateDB.body.date) - nameDayFormatDate) / 1000 / 60 / 60 / 24
    esHoy = parseInt(esHoy, 10)
    switch (turnoUsuario) {
      case turnoManiana:
        if (esHoy === 0 && ancla == false) {
          resaltarHoy = 'resaltar-hoy'
          ancla = true
        }
        tabla[fuente].insertAdjacentHTML(
          'beforeend',

          `<tr class="text-tabla ${resaltarHoy}">
            <td>
                ${nameDay}
            </td>
            <td>
                ${dia}/${mes + 1}/${anio}
            </td>
            <td class="resaltar-turno">
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
        break

      case turnoTarde:
        if (esHoy === 0 && ancla == false) {
          resaltarHoy = 'resaltar-hoy'
          ancla = true
        }
        tabla[fuente].insertAdjacentHTML(
          'beforeend',

          `<tr class="text-tabla ${resaltarHoy}">
            <td>
                ${nameDay}
            </td>
            <td>
                ${dia}/${mes + 1}/${anio}
            </td>
            <td>
                ${turnoManiana}
            </td>
            <td class="resaltar-turno">
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

        break
      case turnoNoche:
        if (esHoy === 0 && ancla == false) {
          resaltarHoy = 'resaltar-hoy'
          ancla = true
        }
        tabla[fuente].insertAdjacentHTML(
          'beforeend',

          `<tr class="text-tabla ${resaltarHoy}">
            <td>
                ${nameDay}
            </td>
            <td>
                ${dia}/${mes + 1}/${anio}
            </td>
            <td>
                ${turnoManiana}
            </td>
            <td>
                ${turnoTarde}
            </td>
            <td class="resaltar-turno">
                ${turnoNoche}
            </td>
            <td>
                ${turnoFranco}
            </td>
        </tr>`
        )

        break
      case turnoFranco:
        if (esHoy === 0 && ancla == false) {
          resaltarHoy = 'resaltar-hoy'
          ancla = true
        }
        tabla[fuente].insertAdjacentHTML(
          'beforeend',

          `<tr class="text-tabla ${resaltarHoy}">
            <td>
                ${nameDay}
            </td>
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
            <td class="resaltar-turno">
                ${turnoFranco}
            </td>
        </tr>`
        )

        break
    }
  }
}
/*
========================
 Logica para pag 1
========================
*/
buttonLogin.addEventListener('click', () => {
  if (valueLegajo.value === '') {
    swal('Ingresa un valor', 'Se requiere legajo 😬', 'warning')
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
          swal('Legajo no encontrado', '😟', 'error')
        } else {
          tituloHeader.classList.add('ocultar')
          page1.classList.add('ocultar')
          page2.classList.remove('ocultar')
          homeButton.classList.remove('ocultar')
          searchButton.classList.remove('ocultar')
          logOutButton.classList.remove('ocultar')
          nameUser[0].classList.remove('ocultar')
          userDb = data
          localStorage.setItem('token', userDb.body.token)
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
  nameUser[0].innerHTML = ''
  nameUser[1].innerHTML = ''
  nameUser[0].insertAdjacentHTML('beforeend', `${name} - ${legajo}`)
  nameUser[1].insertAdjacentHTML('beforeend', name)
  fetch('http://127.0.0.1:3000/getDate', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      mes: new Date().getMonth(),
      anio: new Date().getFullYear(),
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
  comoTrabajo = date.body.inDayWork.turno
  let fecha = new Date(date.body.date)
  day = fecha.getDate()
  mes = fecha.getMonth()
  mes = listMesNombre[mes]
  fechaNow.innerHTML = ''
  fechaNow.insertAdjacentHTML('beforeend', `${day} de ${mes}`)
  diasParaFranco = date.body.inDayWork.diaEnTurno
  dayInWork[0].innerHTML = ''
  dayInWork[1].innerHTML = ''
  dayInWork[0].insertAdjacentHTML('beforeend', `${comoTrabajo}`)
  dayInWork[1].insertAdjacentHTML(
    'beforeend',
    `${6 - diasParaFranco} ${emojis[diasParaFranco]}`
  )

  //Tabla
  imprimirTabla(date, 0, date.body.listAllTurnos.listAllDaysOnMes.length)
}
homeButton.addEventListener('click', () => {
  page1.classList.add('ocultar')
  page2.classList.remove('ocultar')
  page3.classList.add('ocultar')
  page4.classList.add('ocultar')
})
searchButton.addEventListener('click', () => {
  page1.classList.add('ocultar')
  page2.classList.add('ocultar')
  page3.classList.remove('ocultar')
  page4.classList.add('ocultar')
})
logOutButton.addEventListener('click', () => {
  swal({
    title: 'Seguro que desea salir?',
    dangerMode: true,
    buttons: true,
  }).then((eleccion) => {
    if (eleccion) {
      localStorage.clear()
      swal('Cerrado exitosamente', {
        icon: 'success',
      })
      tituloHeader.classList.remove('ocultar')
      page1.classList.remove('ocultar')
      page2.classList.add('ocultar')
      page3.classList.add('ocultar')
      page4.classList.add('ocultar')
      nameUser[0].classList.add('ocultar')
      homeButton.classList.add('ocultar')
      searchButton.classList.add('ocultar')
      logOutButton.classList.add('ocultar')
      valueLegajo.value = ''
    }
  })
})

backButtonTopage4.addEventListener('click', () => {
  page4.classList.add('ocultar')
  page3.classList.remove('ocultar')
})

buttonMesQuerry.addEventListener('click', () => {
  if (opcionQuery.value == 'mes') {
    valorMesYear = valueMesYearQuery.value
    if (valorMesYear == '') {
      swal('Faltan datos', 'Complete con el mes deseado', 'info')
    } else {
      fecha = valorMesYear + '-1'
      fecha = new Date(fecha)
      fetch('http://127.0.0.1:3000/getDate', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          mes: fecha.getMonth(),
          anio: fecha.getFullYear(),
          turno: userDb.body.turno,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          dateDB = data
          page3.classList.add('ocultar')
          page4.classList.remove('ocultar')
          imprimirTabla(
            data,
            1,
            dateDB.body.listAllTurnos.listAllDaysOnMes.length
          )
        })
    }
  }
  if (opcionQuery.value == 'anio') {
    valorYear = valueYearQuery.value
    if (valorYear == '') {
      swal('Faltan datos', 'Complete con el año deseado', 'info')
    } else {
      if (!/\d{4}/.test(valorYear)) {
        swal('Años validos', 'Min 2000 Max 2100 ', 'error')
      } else {
        /* fetch('http://127.0.0.1:3000/getDate', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            mes: '',
            anio: valorYear,
            turno: userDb.body.turno,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
          }) */
      }
    }
  }
  if (opcionQuery.value == '') {
    swal('Elija una opcion', 'Mes o Año', 'warning')
  }
})
/*
========================
 Logica para pag 3 (parte)
========================
*/

opcionQuery.addEventListener('change', () => {
  let desicion = opcionQuery.value
  if (desicion == 'mes') {
    valueYearQuery.classList.add('ocultar')
    valueYearQuery.value = ''
    valueMesYearQuery.classList.remove('ocultar')
    valueMesYearQuery.classList.add('resaltar-opcion')
    valueYearQuery.classList.remove('resaltar-opcion')
  } else if (desicion == 'anio') {
    valueMesYearQuery.classList.add('ocultar')
    valueMesYearQuery.value = ''
    valueYearQuery.classList.remove('ocultar')
    valueYearQuery.classList.add('resaltar-opcion')
    valueMesYearQuery.classList.remove('resaltar-opcion')
  } else {
    valueMesYearQuery.classList.add('ocultar')
    valueMesYearQuery.classList.remove('resaltar-opcion')
    valueMesYearQuery.value = ''
    valueYearQuery.classList.remove('resaltar-opcion')
    valueYearQuery.classList.add('ocultar')
    valueYearQuery.value = ''
  }
})
