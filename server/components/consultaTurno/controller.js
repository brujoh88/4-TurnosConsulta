const store = require('./store')
const diaNow = new Date().getDate()
const mesNow = new Date().getMonth()
const anioNow = new Date().getFullYear()
const dayOnDayByMes = (contador, mes, anio) => {
  return new Date(anio, mes, contador + 1)
}

//! Le sumo 1 al mes ya que al poner el dia 0 me da la cantidad de dias del mes anterior
const getDiaEnElMes = (mes, anio) => {
  return new Date(anio, mes + 1, 0).getDate()
}
const getListNameDaysOnMes = (mes, anio) => {
  let listNameDaysOnMes = []
  listNameDaysOnMes.length = getDiaEnElMes(mes, anio)
  for (let i = 0; i < listNameDaysOnMes.length; i++) {
    listNameDaysOnMes[i] = dayOnDayByMes(i, mes, anio)
  }
  return listNameDaysOnMes
}
const getListTurnoByMesForGroup = (turnoOnDay, mes, anio) => {
  let listPlanillaTurnos = []
  listPlanillaTurnos.length = getDiaEnElMes(mes, anio)
  let listRotacionByGroupA,
    listRotacionByGroupB,
    listRotacionByGroupC,
    listRotacionByGroupD

  for (let i = 0; i < listPlanillaTurnos.length; i++) {
    listRotacionByGroupA = queryTurnoByDay('A', dayOnDayByMes(i, mes, anio))
    listRotacionByGroupB = queryTurnoByDay('B', dayOnDayByMes(i, mes, anio))
    listRotacionByGroupC = queryTurnoByDay('C', dayOnDayByMes(i, mes, anio))
    listRotacionByGroupD = queryTurnoByDay('D', dayOnDayByMes(i, mes, anio))
    if (listRotacionByGroupA.turno == turnoOnDay) {
      listPlanillaTurnos[i] = 'A'
    }
    if (listRotacionByGroupB.turno == turnoOnDay) {
      listPlanillaTurnos[i] = 'B'
    }
    if (listRotacionByGroupC.turno == turnoOnDay) {
      listPlanillaTurnos[i] = 'C'
    }
    if (listRotacionByGroupD.turno == turnoOnDay) {
      listPlanillaTurnos[i] = 'D'
    }
  }
  return listPlanillaTurnos
}

const queryTurnoByDay = (turno, day) => {
  const { allTurnos } = store.getListTurno()
  const fechaReferencia = new Date(2020, 00, 01)
  let referenciaTurno
  switch (turno) {
    case 'A':
      referenciaTurno = 11
      break
    case 'B':
      referenciaTurno = 6
      break
    case 'C':
      referenciaTurno = 1
      break
    case 'D':
      referenciaTurno = 16
      break
  }
  let diferenciaDiaRefAndActual = (day - fechaReferencia) / 1000 / 60 / 60 / 24
  diferenciaDiaRefAndActual = parseInt(diferenciaDiaRefAndActual, 10)
  for (let i = 0; i < diferenciaDiaRefAndActual; i++) {
    referenciaTurno++
    if (referenciaTurno > 19) {
      referenciaTurno = 0
    }
  }
  return allTurnos[referenciaTurno]
}

const listByMonthAllTurnos = (mesQuery, anioQuery, turnoQuery) => {
  return new Promise((resolve, reject) => {
    let dato
    if (!mesQuery && !anioQuery) {
      dato = {
        date: new Date(),
        turnoOfUser: turnoQuery,
        inDayWork: queryTurnoByDay(turnoQuery, new Date()),
        listAllTurnos: {
          maniana: getListTurnoByMesForGroup('Mañana', mesNow, anioNow),
          tarde: getListTurnoByMesForGroup('Tarde', mesNow, anioNow),
          noche: getListTurnoByMesForGroup('Noche', mesNow, anioNow),
          franco: getListTurnoByMesForGroup('Franco', mesNow, anioNow),
        },
        listAllDaysOnMes: getListNameDaysOnMes(mesNow, anioNow),
      }
    } else {
      dato = {
        date: new Date(),
        turnoOfUser: turnoQuery,
        listAllTurnos: {
          maniana: getListTurnoByMesForGroup('Mañana', mesQuery, anioQuery),
          tarde: getListTurnoByMesForGroup('Tarde', mesQuery, anioQuery),
          noche: getListTurnoByMesForGroup('Noche', mesQuery, anioQuery),
          franco: getListTurnoByMesForGroup('Franco', mesQuery, anioQuery),
        },
        listAllDaysOnMes: getListNameDaysOnMes(mesQuery, anioQuery),
      }
    }
    resolve(dato)
  })
}

module.exports = {
  listByMonthAllTurnos,
}
