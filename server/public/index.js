let valueLegajo = document.getElementById('valorLegajo')
let buttonLogin = document.getElementById('botonLegajo')
let page1 = document.getElementById('page-1')
let page2 = document.getElementById('page-2')
let consultaToPage3 = document.getElementById('to-page3')
let buttonMesQuerry = document.getElementById('query-button')
let valueMesYearQuery = document.getElementById('value-mes-year')
let valueYearQuery = document.getElementById('value-year')
let opcionQuery = document.getElementById('opciones')
let page3 = document.getElementById('page-3')
let backButtonTopage3 = document.getElementById('back-page3')
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
  let fecha = new Date(date.body.listAllDaysOnMes[1])
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
  for (let i = 0; i < tamanio; i++) {
    let nameDay = new Date(dateDB.body.listAllDaysOnMes[i])
    nameDay = nombreDiasDeSemana[nameDay.getUTCDay()]
    let fecha = new Date(date.body.listAllDaysOnMes[i])
    let dia = fecha.getDate()
    let mes = fecha.getMonth()
    let anio = fecha.getFullYear()
    let turnoManiana = date.body.listAllTurnos.maniana[i]
    let turnoTarde = date.body.listAllTurnos.tarde[i]
    let turnoNoche = date.body.listAllTurnos.noche[i]
    let turnoFranco = date.body.listAllTurnos.franco[i]
    switch (turnoUsuario) {
      case turnoManiana:
        tabla[fuente].insertAdjacentHTML(
          'beforeend',

          `<tr class="text-tabla">
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
        tabla[fuente].insertAdjacentHTML(
          'beforeend',

          `<tr class="text-tabla">
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
        tabla[fuente].insertAdjacentHTML(
          'beforeend',

          `<tr class="text-tabla">
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
        tabla[fuente].insertAdjacentHTML(
          'beforeend',

          `<tr class="text-tabla">
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
  comoTrabajo = date.body.inDayWork.turno
  let fecha = new Date(date.body.date)
  day = fecha.getDate()
  mes = fecha.getMonth()
  mes = listMesNombre[mes]
  fechaNow.insertAdjacentHTML('beforeend', `${day} de ${mes}`)
  diasParaFranco = date.body.inDayWork.diaEnTurno
  dayInWork[0].insertAdjacentHTML('beforeend', `${comoTrabajo}`)
  dayInWork[1].insertAdjacentHTML(
    'beforeend',
    `${6 - diasParaFranco} ${emojis[diasParaFranco]}`
  )

  //Tabla
  imprimirTabla(date, 0, date.body.listAllDaysOnMes.length)
}
consultaToPage3.addEventListener('click', () => {
  page2.classList.add('ocultar')
  page3.classList.remove('ocultar')
})

backButtonTopage3.addEventListener('click', () => {
  page3.classList.add('ocultar')
  page2.classList.remove('ocultar')
})
backButtonTopage4.addEventListener('click', () => {
  page4.classList.add('ocultar')
  page3.classList.remove('ocultar')
})

buttonMesQuerry.addEventListener('click', () => {
  valorMesYear = valueMesYearQuery.value
  if (valorMesYear == '') {
    alert('Debe completar un dato')
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
        imprimirTabla(data, 1, dateDB.body.listAllDaysOnMes.length)
      })
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
    valueYearQuery.setAttribute('disabled', 'false')
    valueYearQuery.value = ''
    valueMesYearQuery.removeAttribute('disabled')
  } else if (desicion == 'anio') {
    valueMesYearQuery.setAttribute('disabled', 'false')
    valueMesYearQuery.value = ''
    valueYearQuery.removeAttribute('disabled')
  }
})
