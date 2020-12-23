const store = require('./store')
const jwt = require('jsonwebtoken')
const dayOnDayByMes = (contador, mes, anio) => {
  return new Date(anio, mes, contador + 1, 3)
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
  const fechaReferencia = new Date(2020, 00, 01, 3)
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
  let diferenciaDiaRefAndActual
  if (day - fechaReferencia < 0) {
    diferenciaDiaRefAndActual = (fechaReferencia - day) / 1000 / 60 / 60 / 24
    diferenciaDiaRefAndActual = parseInt(diferenciaDiaRefAndActual, 10)
    for (let i = 0; i < diferenciaDiaRefAndActual; i++) {
      referenciaTurno--
      if (referenciaTurno == -1) {
        referenciaTurno = 19
      }
    }
  } else {
    diferenciaDiaRefAndActual = (day - fechaReferencia) / 1000 / 60 / 60 / 24
    diferenciaDiaRefAndActual = parseInt(diferenciaDiaRefAndActual, 10)
    for (let i = 0; i < diferenciaDiaRefAndActual; i++) {
      referenciaTurno++
      if (referenciaTurno > 19) {
        referenciaTurno = 0
      }
    }
  }
  return allTurnos[referenciaTurno]
}

const listByMonthAllTurnos = (mesQuery, anioQuery, turnoQuery) => {
  return new Promise((resolve, reject) => {
    let dato
    dato = {
      date: new Date(),
      turnoOfUser: turnoQuery,
      inDayWork: queryTurnoByDay(turnoQuery, new Date()),
      listAllTurnos: {
        maniana: getListTurnoByMesForGroup('Mañana', mesQuery, anioQuery),
        tarde: getListTurnoByMesForGroup('Tarde', mesQuery, anioQuery),
        noche: getListTurnoByMesForGroup('Noche', mesQuery, anioQuery),
        franco: getListTurnoByMesForGroup('Franco', mesQuery, anioQuery),
        listAllDaysOnMes: getListNameDaysOnMes(mesQuery, anioQuery),
      },
    }
    resolve(dato)
  })
}
const listByYearAllTurnos = (anioQuery, turnoOfUser) => {
  let mes1, mes2, mes3, mes4, mes5, mes6, mes7, mes8, mes9, mes10, mes11, mes12

  mes1 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(0, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })
  mes2 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(1, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })

  mes3 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(2, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })
  mes4 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(3, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })
  mes5 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(4, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })
  mes6 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(5, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })
  mes7 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(6, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })
  mes8 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(7, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })
  mes9 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(8, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })
  mes10 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(9, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })
  mes11 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(10, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })
  mes12 = new Promise((resolve, reject) => {
    listByMonthAllTurnos(11, anioQuery, turnoOfUser).then((element) => {
      resolve(element)
    })
  })

  return Promise.all([
    mes1,
    mes2,
    mes3,
    mes4,
    mes5,
    mes6,
    mes7,
    mes8,
    mes9,
    mes10,
    mes11,
    mes12,
  ]).then((element) => element)
}
module.exports = {
  listByMonthAllTurnos,
  listByYearAllTurnos,
}
