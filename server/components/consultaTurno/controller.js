const store = require('./store')
const diaNow = new Date().getDate()
const mesNow = new Date().getMonth()
const anioNow = new Date().getFullYear()

const getDateNow = () => {
  return diaNow + '/' + (mesNow + 1) + '/' + anioNow
}
const getDiaEnElMes = (mes, anio) => {
  return new Date(anio, mes, 0).getDate()
}

const getListTurnoByMesForGroup = (turnoOnDay, mes, anio) => {
  let listPlanillaTurnos = []
  listPlanillaTurnos.length = getDiaEnElMes(mes, anio)
  let listRotacionByGroupA,
    listRotacionByGroupB,
    listRotacionByGroupC,
    listRotacionByGroupD
  const dayOnDayByMes = (contador, mes, anio) => {
    return new Date(anio, mes, contador + 1)
  }
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

const listByMonthAllTurnos = (mesQuery, anioQuery) => {
  return new Promise((resolve, reject) => {
    let dato
    if (!mesQuery && !anioQuery) {
      dato = {
        date: getDateNow(),
        listAllTurnos: {
          maniana: getListTurnoByMesForGroup('Mañana', mesNow, anioNow),
          tarde: getListTurnoByMesForGroup('Tarde', mesNow, anioNow),
          noche: getListTurnoByMesForGroup('Noche', mesNow, anioNow),
          franco: getListTurnoByMesForGroup('Franco', mesNow, anioNow),
        },
      }
    } else {
      dato = {
        date: getDateNow(),
        listAllTurnos: {
          maniana: getListTurnoByMesForGroup('Mañana', mesQuery, anioQuery),
          tarde: getListTurnoByMesForGroup('Tarde', mesQuery, anioQuery),
          noche: getListTurnoByMesForGroup('Noche', mesQuery, anioQuery),
          franco: getListTurnoByMesForGroup('Franco', mesQuery, anioQuery),
        },
      }
    }
    resolve(dato)
  })
}

module.exports = {
  listByMonthAllTurnos,
}
