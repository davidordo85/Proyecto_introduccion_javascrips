import WorldCup from './classes/world.js';

import { worldCupPlayoffsTeams } from './team.js'

console.log('==============================================')
console.log('============= COMIENZA EL TORNEO =============')
console.log('==============================================')
const eighths = new WorldCup('OCTAVOS', worldCupPlayoffsTeams)
eighths.scheduleMatchDays()

console.log('================== OCTAVOS ===================')
console.log('====== EQUIPOS PARTICIPANTES ======')

for (const team of eighths.teams) {
    console.log(team.name)
}
console.log('=========== RESULTADOS =============')
eighths.start()

let i = 1
eighths.summaries.forEach(summary => {
    summary.result.forEach(result => {
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.teamWin} `)

    })
    i++

})

const quarterTeams = eighths.filteredTeamsWin

const quarter = new WorldCup('CUARTOS', quarterTeams)

quarter.scheduleMatchDays()
console.log('=================== CUARTOS ===================')
console.log('====== EQUIPOS PARTICIPANTES ======')
for (const team of quarter.teams) {
    console.log(team.name)
}

quarter.start()
console.log('========== RESULTADOS ============')
i = 1
quarter.summaries.forEach(summary => {
    summary.result.forEach(result => {
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.teamWin} `)

    })
    i++

})

const semifinalTeams = quarter.filteredTeamsWin

const semifinal = new WorldCup('SEMIFINAL', semifinalTeams)

semifinal.scheduleMatchDays()
console.log('================== SEMIFINAL ==================')
console.log('====== EQUIPOS PARTICIPANTES ======')
for (const team of semifinal.teams) {
    console.log(team.name)
}

semifinal.start()
console.log('========== RESULTADOS ============')
i = 1
semifinal.summaries.forEach(summary => {
    summary.result.forEach(result => {
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.teamWin} `)

    })
    i++

})

const thirdQuarteTeams = semifinal.filteredTeamsLoss

const thirdQuarte = new WorldCup('TERCER Y CUARTO PUESTO', thirdQuarteTeams)

thirdQuarte.scheduleMatchDays()
console.log('========= TERCER Y CUARTO PUESTO ===========')
thirdQuarte.start()
console.log('========== RESULTADO =============')
i = 1
thirdQuarte.summaries.forEach(summary => {
    summary.result.forEach(result => {
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.teamWin} `)

    })
    i++

})

const finalTeams = semifinal.filteredTeamsWin

const final = new WorldCup('FINAL', finalTeams)
final.scheduleMatchDays()
console.log('============ FINAL =============')
final.start()

i = 1
final.summaries.forEach(summary => {
    summary.result.forEach(result => {
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.teamWin} `)

    })
    i++

})

const champion = final.filteredTeamsWin
console.log(`¡ ${champion} campeón del mundo!`)

