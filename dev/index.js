let tituloHeader = document.getElementById('header-titulo')
let formContainer = document.getElementById('form-container')
let opcionLogin = document.getElementById('opcion-ingreso')
let valueEscuadra = document.getElementById('valorEscuadra')
let valueLegajo = document.getElementById('valorLegajo')
let valorPass = document.getElementById('value-pass')
let buttonLogin = document.getElementById('botonLegajo')
let page1 = document.getElementById('page-1')
let homeButton = document.getElementById('to-page2')
let searchButton = document.getElementById('to-page3')
let logOutButton = document.getElementById('to-page1')
let page2 = document.getElementById('page-2')
let buttonQuerry = document.getElementById('query-button')
let formContainerQuery = document.getElementById('form-container-query')
let loader = document.getElementById('loader')
let valueMesYearQuery = document.getElementById('value-mes-year')
let valueYearQuery = document.getElementById('value-year')
let opcionQuery = document.getElementById('opciones')
let page3 = document.getElementById('page-3')
let page4 = document.getElementById('page-4')
let NewQuery = document.getElementById('nueva-consulta')
let tieneTablaConsulta = false

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
    searchButton.classList.remove('marcador-seccion')
    homeButton.classList.add('marcador-seccion')
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

const imprimirTablaAllYear = (date, fuente) => {
  tabla[fuente].innerHTML = ''
  let dateFormateado0 = {
    body: date.body[0],
  }
  let dateFormateado1 = {
    body: date.body[1],
  }
  let dateFormateado2 = {
    body: date.body[2],
  }
  let dateFormateado3 = {
    body: date.body[3],
  }
  let dateFormateado4 = {
    body: date.body[4],
  }
  let dateFormateado5 = {
    body: date.body[5],
  }
  let dateFormateado6 = {
    body: date.body[6],
  }
  let dateFormateado7 = {
    body: date.body[7],
  }
  let dateFormateado8 = {
    body: date.body[8],
  }
  let dateFormateado9 = {
    body: date.body[9],
  }
  let dateFormateado10 = {
    body: date.body[10],
  }
  let dateFormateado11 = {
    body: date.body[11],
  }

  imprimirTabla(dateFormateado0, fuente)
  imprimirTabla(dateFormateado1, fuente)
  imprimirTabla(dateFormateado2, fuente)
  imprimirTabla(dateFormateado3, fuente)
  imprimirTabla(dateFormateado4, fuente)
  imprimirTabla(dateFormateado5, fuente)
  imprimirTabla(dateFormateado6, fuente)
  imprimirTabla(dateFormateado7, fuente)
  imprimirTabla(dateFormateado8, fuente)
  imprimirTabla(dateFormateado9, fuente)
  imprimirTabla(dateFormateado10, fuente)
  imprimirTabla(dateFormateado11, fuente)
}
const imprimirTabla = (date, fuente) => {
  let turnoUsuario = userDb.body.turno
  let tamanio = date.body.listAllTurnos.listAllDaysOnMes.length

  let fecha = new Date(date.body.listAllTurnos.listAllDaysOnMes[1])
  let mes = fecha.getMonth()
  let anio = fecha.getFullYear()
  mes = listMesNombre[mes]
  tabla[fuente].insertAdjacentHTML(
    'beforeend',
    `
  <tr class="text-tabla">  
    <td colspan = "6" class="titulo-mes">${mes} - ${anio}</td>    
  </tr>
  <tr class="text-tabla">
    <td class=" perseguir">Día</td>    
    <td class=" perseguir">Fecha</td>
    <td class=" perseguir">Mañana</td>
    <td class=" perseguir">Tarde</td>
    <td class=" perseguir">Noche</td>
    <td class=" perseguir">Franco</td>
  </tr>`
  )
  let ancla = false
  for (let i = 0; i < tamanio; i++) {
    let nameDayFormatDate = new Date(
      date.body.listAllTurnos.listAllDaysOnMes[i]
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
      (new Date(date.body.date) - nameDayFormatDate) / 1000 / 60 / 60 / 24
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

opcionLogin.addEventListener('change', () => {
  let desicion = opcionLogin.value
  if (desicion == 'legajo-password') {
    formContainer.classList.remove('ocultar')
    valueEscuadra.classList.add('ocultar')
    valueEscuadra.classList.remove('resaltar-opcion')
    valueEscuadra.value = ''
    valorLegajo.classList.remove('ocultar')
    valorLegajo.classList.add('resaltar-opcion')
    valorPass.classList.remove('ocultar')
    valorPass.classList.add('resaltar-opcion')
  } else if (desicion == 'escuadra') {
    formContainer.classList.remove('ocultar')
    valorLegajo.classList.add('ocultar')
    valorLegajo.value = ''
    valueEscuadra.classList.remove('ocultar')
    valueEscuadra.classList.add('resaltar-opcion')
    valorLegajo.classList.remove('resaltar-opcion')
    valorPass.classList.add('ocultar')
    valorPass.classList.remove('resaltar-opcion')
  } else {
    formContainer.classList.add('ocultar')
    valorLegajo.classList.add('ocultar')
    valorLegajo.classList.remove('resaltar-opcion')
    valorLegajo.value = ''
    valueEscuadra.classList.remove('resaltar-opcion')
    valueEscuadra.classList.add('ocultar')
    valueEscuadra.value = ''
    valorPass.classList.remove('resaltar-opcion')
    valorPass.classList.add('ocultar')
  }
})

buttonLogin.addEventListener('click', () => {
  if (opcionLogin.value == 'legajo-password') {
    logeoLegajoAndPass()
  } else if (opcionLogin.value == 'escuadra') {
    logeoEscuadra()
  }
})

/*
========================
 Logica para pag 2
========================
*/
const url = window.location.origin
const imprimirDatosUser = (user) => {
  let name = user.body.name
  let legajo = user.body.legajo
  let turno = user.body.turno
  nameUser[0].innerHTML = ''
  nameUser[1].innerHTML = ''
  nameUser[0].insertAdjacentHTML('beforeend', `${name} - ${legajo}`)
  nameUser[1].insertAdjacentHTML('beforeend', name)
  fetch(`${url}/getDate`, {
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
  tabla[0].innerHTML = ''
  imprimirTabla(date, 0)
}
homeButton.addEventListener('click', () => {
  searchButton.classList.remove('marcador-seccion')
  homeButton.classList.add('marcador-seccion')
  page2.classList.add('bounceInLeft')
  page1.classList.add('ocultar')
  page2.classList.remove('ocultar')
  page3.classList.add('ocultar')
  page4.classList.add('ocultar')
})
searchButton.addEventListener('click', () => {
  if(tieneTablaConsulta == true){
    page4.classList.add('bounceInRight')
    page3Topage4()
  }else{
    page3.classList.add('bounceInRight')
    homeButton.classList.remove('marcador-seccion')
    searchButton.classList.add('marcador-seccion')
    page1.classList.add('ocultar')
    page2.classList.add('ocultar')
    page3.classList.remove('ocultar')
    page4.classList.add('ocultar')
  }
})
NewQuery.addEventListener('click', ()=>{
  swal({
    title: 'Seguro que desea hacer una nueva consulta?',
    dangerMode: true,
    buttons: true,
  }).then((eleccion)=>{
    if(eleccion){
      tieneTablaConsulta = false;
      page3.classList.remove('ocultar')
      page4.classList.add('ocultar')
      formContainerQuery.classList.remove('ocultar')
      loader.classList.remove('lds-spinner')
    }
  })
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
      }).then((eleccion) => {
        if (eleccion) {
          page2.classList.remove('bounceInLeft')
          page3.classList.remove('bounceInRight')
          page2.classList.add('bounceOut')
          page3.classList.add('bounceOut')
          page4.classList.add('bounceOut')
          searchButton.classList.remove('marcador-seccion')
          setTimeout(pageXToPage1, 1000)
        }
      })
    }
  })
})

valueMesYearQuery.addEventListener('keyup', (event) => {
  if (event.key == 'Enter') {
    confirmarQuerry()
  }
})

buttonQuerry.addEventListener('click', () => {
  confirmarQuerry()
})
valueYearQuery.addEventListener('keyup', (event) => {
  if (event.key == 'Enter') {
    confirmarQuerry()
  }
})
const confirmarQuerry = () => {
  formContainerQuery.classList.remove('ocultar')
  if (opcionQuery.value == 'mes') {
    valorMesYear = valueMesYearQuery.value
    if (valorMesYear == '') {
      swal('Faltan datos', 'Complete con el mes deseado', 'warning')
    } else {
      fecha = valorMesYear + '-1'
      fecha = new Date(fecha)
      fetch(`${url}/getDate`, {
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
          tabla[1].innerHTML = ''
          formContainerQuery.classList.add('ocultar')
          loader.classList.add('lds-spinner')
          setTimeout(page3Topage4, 2000)
          imprimirTabla(data, 1)
        })
    }
  }
  if (opcionQuery.value == 'anio') {
    valorYear = valueYearQuery.value
    if (valorYear == '') {
      swal('Faltan datos', 'Complete con el año deseado', 'warning')
    } else {
      if (valorYear > 2100 || valorYear < 2000) {
        swal('Años validos', 'Min 2000 Max 2100 ', 'error')
      } else {
        fetch(`${url}/getDate`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            mes: 'anioCompleto',
            anio: valorYear,
            turno: userDb.body.turno,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            formContainerQuery.classList.add('ocultar')
            loader.classList.add('lds-spinner')
            setTimeout(page3Topage4, 2000)
            imprimirTablaAllYear(data, 1)
          })
      }
    }
  }
  if (opcionQuery.value == '') {
    swal('Elija una opcion', 'Mes o Año', 'warning')
  }
}
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
valueLegajo.addEventListener('keyup', (event) => {
  if (event.key == 'Enter') {
    logeoLegajoAndPass()
  }
})
valorPass.addEventListener('keyup', (event) => {
  if (event.key == 'Enter') {
    logeoLegajoAndPass()
  }
})
const logeoLegajoAndPass = () => {
  if (valueLegajo.value === '' || valorPass.value === '') {
    swal('Datos incompletos', 'Se requiere legajo y contraseña😬', 'warning')
  } else {
    fetch(`${url}/login`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        legajo: valueLegajo.value,
        password: valorPass.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.body.name) {
          swal('Datos incorrectos', '😟', 'error')
        } else {
          opcionLogin.classList.add('ocultar')
          formContainer.classList.add('slide-rotate-hor-t-bck')
          setTimeout(page1ToPage2, 400)
          userDb = data
          localStorage.setItem('token', userDb.body.token)
          imprimirDatosUser(userDb)
        }
      })
      .catch((err) => console.log(err))
  }
}

const logeoEscuadra = () => {
  if (valueEscuadra.value === '') {
    swal('Datos incompletos', 'Elegir A - B - C - D😬', 'warning')
  } else {
    fetch(`${url}/login`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        legajo: valueEscuadra.value,
        password: 'noPass',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.body.name) {
          swal('Datos incorrectos', '😟', 'error')
        } else {
          opcionLogin.classList.add('ocultar')
          formContainer.classList.add('slide-rotate-hor-t-bck')
          setTimeout(page1ToPage2, 400)
          userDb = data
          localStorage.setItem('token', userDb.body.token)
          imprimirDatosUser(userDb)
        }
      })
      .catch((err) => console.log(err))
  }
}
const page1ToPage2 = () => {
  tituloHeader.classList.add('ocultar')
  page1.classList.add('ocultar')
  page2.classList.remove('ocultar')
  page3.classList.add('ocultar')
  page4.classList.add('ocultar')
  page2.classList.add('bounceInUp')
  homeButton.classList.remove('ocultar')
  homeButton.classList.add('marcador-seccion')
  searchButton.classList.remove('ocultar')
  logOutButton.classList.remove('ocultar')
  homeButton.classList.add('zoomInLeft')
  searchButton.classList.add('zoomInDown')
  logOutButton.classList.add('zoomInRight')
  nameUser[0].classList.remove('ocultar')
}
const page3Topage4 = () => {
  tieneTablaConsulta = true;
  homeButton.classList.remove('marcador-seccion')
  searchButton.classList.add('marcador-seccion')
  page2.classList.add('ocultar')
  page3.classList.add('ocultar')
  formContainerQuery.classList.remove('ocultar')
  loader.classList.remove('lds-spinner')
  page4.classList.remove('ocultar')
}

const pageXToPage1 = () => {
  page2.classList.remove('bounceOut')
  page3.classList.remove('bounceOut')
  page4.classList.remove('bounceOut')
  tituloHeader.classList.remove('ocultar')
  page1.classList.remove('ocultar')
  opcionLogin.classList.remove('ocultar')
  formContainer.classList.remove('slide-rotate-hor-t-bck')
  page2.classList.add('ocultar')
  page3.classList.add('ocultar')
  page4.classList.add('ocultar')
  nameUser[0].classList.add('ocultar')
  homeButton.classList.add('ocultar')
  searchButton.classList.add('ocultar')
  logOutButton.classList.add('ocultar')
  homeButton.classList.remove('zoomInLeft')
  searchButton.classList.remove('zoomInDown')
  logOutButton.classList.remove('zoomInRight')
  page2.classList.remove('bounceInUp')
  valueLegajo.value = ''
  valorPass.value = ''
}
