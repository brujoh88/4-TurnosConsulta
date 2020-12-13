'use strict'

var tituloHeader = document.getElementById('header-titulo')
var formContainer = document.getElementById('form-container')
var opcionLogin = document.getElementById('opcion-ingreso')
var valueEscuadra = document.getElementById('valorEscuadra')
var valueLegajo = document.getElementById('valorLegajo')
var valorPass = document.getElementById('value-pass')
var buttonLogin = document.getElementById('botonLegajo')
var page1 = document.getElementById('page-1')
var homeButton = document.getElementById('to-page2')
var searchButton = document.getElementById('to-page3')
var logOutButton = document.getElementById('to-page1')
var page2 = document.getElementById('page-2')
var buttonMesQuerry = document.getElementById('query-button')
var formContainerQuery = document.getElementById('form-container-query')
var loader = document.getElementById('loader')
var valueMesYearQuery = document.getElementById('value-mes-year')
var valueYearQuery = document.getElementById('value-year')
var opcionQuery = document.getElementById('opciones')
var page3 = document.getElementById('page-3')
var page4 = document.getElementById('page-4')
var emojis = ['vacio', '😭', '😫', '😓', '😒', '😌', '😁🎉']
var listMesNombre = [
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
var nombreDiasDeSemana = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
/*
==========================
On Load Page
==========================
*/

var tokenDecoded = function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

window.onload = function () {
  var cacheDate = localStorage.getItem('token')

  if (cacheDate) {
    var dato = tokenDecoded(cacheDate)
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
    var userCache = {
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

var userDb
var dateDB
var nameUser = document.getElementsByClassName('name-user')
var fechaNow = document.getElementById('print-fecha')
var dayInWork = document.getElementsByClassName('day-in-work')
var tabla = document.getElementsByClassName('tabla')
/*
====================================
Tabla
====================================
*/

var imprimirTablaAllYear = function imprimirTablaAllYear(date, fuente) {
  tabla[fuente].innerHTML = ''
  var dateFormateado0 = {
    body: date.body[0],
  }
  var dateFormateado1 = {
    body: date.body[1],
  }
  var dateFormateado2 = {
    body: date.body[2],
  }
  var dateFormateado3 = {
    body: date.body[3],
  }
  var dateFormateado4 = {
    body: date.body[4],
  }
  var dateFormateado5 = {
    body: date.body[5],
  }
  var dateFormateado6 = {
    body: date.body[6],
  }
  var dateFormateado7 = {
    body: date.body[7],
  }
  var dateFormateado8 = {
    body: date.body[8],
  }
  var dateFormateado9 = {
    body: date.body[9],
  }
  var dateFormateado10 = {
    body: date.body[10],
  }
  var dateFormateado11 = {
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

var imprimirTabla = function imprimirTabla(date, fuente) {
  var turnoUsuario = userDb.body.turno
  var tamanio = date.body.listAllTurnos.listAllDaysOnMes.length
  var fecha = new Date(date.body.listAllTurnos.listAllDaysOnMes[1])
  var mes = fecha.getMonth()
  var anio = fecha.getFullYear()
  mes = listMesNombre[mes]
  tabla[fuente].insertAdjacentHTML(
    'beforeend',
    '\n  <tr class="text-tabla">  \n    <td colspan = "6" class="titulo-mes">' +
      mes +
      ' - ' +
      anio +
      '</td>    \n  </tr>\n  <tr class="text-tabla">\n    <td class=" perseguir">D\xEDa</td>    \n    <td class=" perseguir">Fecha</td>\n    <td class=" perseguir">Ma\xF1ana</td>\n    <td class=" perseguir">Tarde</td>\n    <td class=" perseguir">Noche</td>\n    <td class=" perseguir">Franco</td>\n  </tr>'
  )
  var ancla = false

  for (var i = 0; i < tamanio; i++) {
    var nameDayFormatDate = new Date(
      date.body.listAllTurnos.listAllDaysOnMes[i]
    )
    var nameDay = nombreDiasDeSemana[nameDayFormatDate.getUTCDay()]

    var _fecha = new Date(date.body.listAllTurnos.listAllDaysOnMes[i])

    var dia = _fecha.getDate()

    var _mes = _fecha.getMonth()

    var _anio = _fecha.getFullYear()

    var turnoManiana = date.body.listAllTurnos.maniana[i]
    var turnoTarde = date.body.listAllTurnos.tarde[i]
    var turnoNoche = date.body.listAllTurnos.noche[i]
    var turnoFranco = date.body.listAllTurnos.franco[i]
    var resaltarHoy = void 0
    var esHoy =
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
          '<tr class="text-tabla ' +
            resaltarHoy +
            '">\n            <td>\n                ' +
            nameDay +
            '\n            </td>\n            <td>\n                ' +
            dia +
            '/' +
            (_mes + 1) +
            '/' +
            _anio +
            '\n            </td>\n            <td class="resaltar-turno">\n                ' +
            turnoManiana +
            '\n            </td>\n            <td>\n                ' +
            turnoTarde +
            '\n            </td>\n            <td>\n                ' +
            turnoNoche +
            '\n            </td>\n            <td>\n                ' +
            turnoFranco +
            '\n            </td>\n        </tr>'
        )
        break

      case turnoTarde:
        if (esHoy === 0 && ancla == false) {
          resaltarHoy = 'resaltar-hoy'
          ancla = true
        }

        tabla[fuente].insertAdjacentHTML(
          'beforeend',
          '<tr class="text-tabla ' +
            resaltarHoy +
            '">\n            <td>\n                ' +
            nameDay +
            '\n            </td>\n            <td>\n                ' +
            dia +
            '/' +
            (_mes + 1) +
            '/' +
            _anio +
            '\n            </td>\n            <td>\n                ' +
            turnoManiana +
            '\n            </td>\n            <td class="resaltar-turno">\n                ' +
            turnoTarde +
            '\n            </td>\n            <td>\n                ' +
            turnoNoche +
            '\n            </td>\n            <td>\n                ' +
            turnoFranco +
            '\n            </td>\n        </tr>'
        )
        break

      case turnoNoche:
        if (esHoy === 0 && ancla == false) {
          resaltarHoy = 'resaltar-hoy'
          ancla = true
        }

        tabla[fuente].insertAdjacentHTML(
          'beforeend',
          '<tr class="text-tabla ' +
            resaltarHoy +
            '">\n            <td>\n                ' +
            nameDay +
            '\n            </td>\n            <td>\n                ' +
            dia +
            '/' +
            (_mes + 1) +
            '/' +
            _anio +
            '\n            </td>\n            <td>\n                ' +
            turnoManiana +
            '\n            </td>\n            <td>\n                ' +
            turnoTarde +
            '\n            </td>\n            <td class="resaltar-turno">\n                ' +
            turnoNoche +
            '\n            </td>\n            <td>\n                ' +
            turnoFranco +
            '\n            </td>\n        </tr>'
        )
        break

      case turnoFranco:
        if (esHoy === 0 && ancla == false) {
          resaltarHoy = 'resaltar-hoy'
          ancla = true
        }

        tabla[fuente].insertAdjacentHTML(
          'beforeend',
          '<tr class="text-tabla ' +
            resaltarHoy +
            '">\n            <td>\n                ' +
            nameDay +
            '\n            </td>\n            <td>\n                ' +
            dia +
            '/' +
            (_mes + 1) +
            '/' +
            _anio +
            '\n            </td>\n            <td>\n                ' +
            turnoManiana +
            '\n            </td>\n            <td>\n                ' +
            turnoTarde +
            '\n            </td>\n            <td>\n                ' +
            turnoNoche +
            '\n            </td>\n            <td class="resaltar-turno">\n                ' +
            turnoFranco +
            '\n            </td>\n        </tr>'
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

opcionLogin.addEventListener('change', function () {
  var desicion = opcionLogin.value

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
buttonLogin.addEventListener('click', function () {
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

var url = window.location.origin

var imprimirDatosUser = function imprimirDatosUser(user) {
  var name = user.body.name
  var legajo = user.body.legajo
  var turno = user.body.turno
  nameUser[0].innerHTML = ''
  nameUser[1].innerHTML = ''
  nameUser[0].insertAdjacentHTML('beforeend', name + ' - ' + legajo)
  nameUser[1].insertAdjacentHTML('beforeend', name)
  fetch(url + '/getDate', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      mes: new Date().getMonth(),
      anio: new Date().getFullYear(),
      turno: turno,
    }),
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      dateDB = data
      imprimirDatosDate(dateDB)
    })
}

var imprimirDatosDate = function imprimirDatosDate(date) {
  var comoTrabajo = date.body.inDayWork.turno
  var fecha = new Date(date.body.date)
  var day = fecha.getDate()
  var mes = fecha.getMonth()
  mes = listMesNombre[mes]
  fechaNow.innerHTML = ''
  fechaNow.insertAdjacentHTML('beforeend', day + ' de ' + mes)
  var diasParaFranco = date.body.inDayWork.diaEnTurno
  dayInWork[0].innerHTML = ''
  dayInWork[1].innerHTML = ''
  dayInWork[0].insertAdjacentHTML('beforeend', '' + comoTrabajo)
  dayInWork[1].insertAdjacentHTML(
    'beforeend',
    6 - diasParaFranco + ' ' + emojis[diasParaFranco]
  ) //Tabla

  tabla[0].innerHTML = ''
  imprimirTabla(date, 0)
}

homeButton.addEventListener('click', function () {
  searchButton.classList.remove('marcador-seccion')
  homeButton.classList.add('marcador-seccion')
  page2.classList.add('bounceInLeft')
  page1.classList.add('ocultar')
  page2.classList.remove('ocultar')
  page3.classList.add('ocultar')
  page4.classList.add('ocultar')
})
searchButton.addEventListener('click', function () {
  page3.classList.add('bounceInRight')
  homeButton.classList.remove('marcador-seccion')
  searchButton.classList.add('marcador-seccion')
  page1.classList.add('ocultar')
  page2.classList.add('ocultar')
  page3.classList.remove('ocultar')
  page4.classList.add('ocultar')
})
logOutButton.addEventListener('click', function () {
  swal({
    title: 'Seguro que desea salir?',
    dangerMode: true,
    buttons: true,
  }).then(function (eleccion) {
    if (eleccion) {
      localStorage.clear()
      swal('Cerrado exitosamente', {
        icon: 'success',
      }).then(function (eleccion) {
        if (eleccion) {
          page2.classList.remove('bounceInLeft')
          page3.classList.remove('bounceInRight')
          page2.classList.add('bounceOut')
          page3.classList.add('bounceOut')
          page4.classList.add('bounceOut')
          setTimeout(pageXToPage1, 1000)
        }
      })
    }
  })
})
valueMesYearQuery.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    confirmarQuerry()
  }
})
buttonMesQuerry.addEventListener('click', function () {
  confirmarQuerry()
})
valueYearQuery.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    confirmarQuerry()
  }
})

var confirmarQuerry = function confirmarQuerry() {
  formContainerQuery.classList.remove('ocultar')

  if (opcionQuery.value == 'mes') {
    var valorMesYear = valueMesYearQuery.value

    if (valorMesYear == '') {
      swal('Faltan datos', 'Complete con el mes deseado', 'info')
    } else {
      var fecha = valorMesYear + '-1'
      fecha = new Date(fecha)
      fetch(url + '/getDate', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          mes: fecha.getMonth(),
          anio: fecha.getFullYear(),
          turno: userDb.body.turno,
        }),
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
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
    var valorYear = valueYearQuery.value

    if (valorYear == '') {
      swal('Faltan datos', 'Complete con el año deseado', 'info')
    } else {
      if (valorYear > 2100 || valorYear < 2000) {
        swal('Años validos', 'Min 2000 Max 2100 ', 'error')
      } else {
        fetch(url + '/getDate', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            mes: 'anioCompleto',
            anio: valorYear,
            turno: userDb.body.turno,
          }),
        })
          .then(function (response) {
            return response.json()
          })
          .then(function (data) {
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

opcionQuery.addEventListener('change', function () {
  var desicion = opcionQuery.value

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
valueLegajo.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    logeoLegajoAndPass()
  }
})
valorPass.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    logeoLegajoAndPass()
  }
})

var logeoLegajoAndPass = function logeoLegajoAndPass() {
  if (valueLegajo.value === '' || valorPass.value === '') {
    swal('Datos incompletos', 'Se requiere legajo y contraseña😬', 'warning')
  } else {
    fetch(url + '/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        legajo: valueLegajo.value,
        password: valorPass.value,
      }),
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
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
      .catch(function (err) {
        return console.log(err)
      })
  }
}

var logeoEscuadra = function logeoEscuadra() {
  if (valueEscuadra.value === '') {
    swal('Datos incompletos', 'Elegir A - B - C - D😬', 'warning')
  } else {
    fetch(url + '/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        legajo: valueEscuadra.value,
        password: 'noPass',
      }),
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
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
      .catch(function (err) {
        return console.log(err)
      })
  }
}

var page1ToPage2 = function page1ToPage2() {
  tituloHeader.classList.add('ocultar')
  page1.classList.add('ocultar')
  page2.classList.remove('ocultar')
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

var page3Topage4 = function page3Topage4() {
  page3.classList.add('ocultar')
  formContainerQuery.classList.remove('ocultar')
  loader.classList.remove('lds-spinner')
  page4.classList.remove('ocultar')
}

var pageXToPage1 = function pageXToPage1() {
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
