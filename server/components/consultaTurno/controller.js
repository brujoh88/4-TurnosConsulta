const store = require('./store')
const getDateNow = () => {
  let fecha = new Date()
  fecha =
    fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear()
  return fecha
}

const getDiaEnElMes = (mes, anio) => {
  return new Date(anio, mes, 0).getDate()
}

const getListTurnoByMesForGroup = (turnoOnDay) => {
  let listPlanillaTurnos = []
  listPlanillaTurnos.length = getDiaEnElMes(
    new Date().getMonth() + 1,
    new Date().getFullYear()
  )
  let listRotacionByGroupA,
    listRotacionByGroupB,
    listRotacionByGroupC,
    listRotacionByGroupD
  const dayOnDayByMes = (contador) => {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      contador + 1
    )
  }
  for (let i = 0; i < listPlanillaTurnos.length; i++) {
    listRotacionByGroupA = queryTurnoByDay('A', dayOnDayByMes(i))
    listRotacionByGroupB = queryTurnoByDay('B', dayOnDayByMes(i))
    listRotacionByGroupC = queryTurnoByDay('C', dayOnDayByMes(i))
    listRotacionByGroupD = queryTurnoByDay('D', dayOnDayByMes(i))
    if (listRotacionByGroupA.turno == turnoOnDay) {
      listPlanillaTurnos[i] = {
        grup: 'A',
      }
    }
    if (listRotacionByGroupB.turno == turnoOnDay) {
      listPlanillaTurnos[i] = {
        grup: 'B',
      }
    }
    if (listRotacionByGroupC.turno == turnoOnDay) {
      listPlanillaTurnos[i] = {
        grup: 'C',
      }
    }
    if (listRotacionByGroupD.turno == turnoOnDay) {
      listPlanillaTurnos[i] = {
        grup: 'D',
      }
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

const listByMonthAllTurnos = (mes, anio) => {
  return new Promise((resolve, reject) => {
    let dato
    if (!mes && !anio) {
      /* return reject('No envio ningun mes') */
      dato = {
        date: getDateNow(),
        listAllTurnos: {
          maniana: getListTurnoByMesForGroup('Mañana'),
          tarde: getListTurnoByMesForGroup('Tarde'),
          noche: getListTurnoByMesForGroup('Noche'),
          franco: getListTurnoByMesForGroup('Franco'),
        },
      }
    } else {
    }
    resolve(dato)
  })
}

module.exports = {
  listByMonthAllTurnos,
}
