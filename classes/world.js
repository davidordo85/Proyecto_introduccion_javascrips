Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

const LOCAL_TEAM = 0
const AWAY_TEAM = 1



export default class WorldCup {

    constructor(name, teams = [], config = {}) {
        this.name = name
        this.teams = []
        this.matchDaySchedule = []
        this.setup(config)
        this.setupTeams(teams)
        this.summaries = []
        this.filteredTeamsWin = []
        this.filteredTeamsLoss = []
    }

    setup(config) {
        const defaultConfig = { rounds: 1 }
        this.config = Object.assign(defaultConfig, config)
    }



    setupTeams(teamNames) {
        for (const teamName of teamNames) {
            const team = this.customizeTeam(teamName)
            this.teams.push(team)
        }
        if (this.teams.length > 8) {
            this.teams.shuffle()
        }
    }



    customizeTeam(teamName) {
        return {
            name: teamName,
            win: 0
        }
    }



    initWorld() {
        const matchDay = [] // jornada vacia
        const numberMatchPerRound = this.teams.length / 2
        for (let i = 0; i < numberMatchPerRound; i++) {
            const match = ['Equipo local', 'Equipo visitante']
            matchDay.push(match)
        }


        this.matchDaySchedule.push(matchDay)

    }

    getTeamNames() {
        return this.teams.map(team => team.name)
    }

    setLocalTeams() {
        const teamNames = this.getTeamNames()
        const maxHomeTeams = teamNames.length - 2
        let teamIndex = 0
        this.matchDaySchedule.forEach(matchDay => { // por cada jornada
            matchDay.forEach(match => { // por cada partido de cada jornada
                // establecer el equipo local
                match[LOCAL_TEAM] = teamNames[teamIndex]
                teamIndex++
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0
                }
            })
        })

    }

    setAwayTeams() {
        const teamNames = this.getTeamNames()
        const maxAwayTeams = teamNames.length - 1
        let teamIndex = maxAwayTeams
        this.matchDaySchedule.forEach(matchDay => {
            matchDay.forEach(match => {
                match[AWAY_TEAM] = teamNames[teamIndex]
                teamIndex--
                if (teamIndex < 0) {
                    teamIndex = maxAwayTeams
                }
            })
        })
    }

    scheduleMatchDays() {
        this.initWorld()
        this.setLocalTeams()
        this.setAwayTeams()

    }

    generateGoals() {
        return Math.round(Math.random() * 10)
    }

    play(match) {
        const homeGoals = this.generateGoals()
        const awayGoals = this.generateGoals()
        // no se permiten empates
        if (homeGoals > awayGoals) {
            return {
                homeTeam: match[LOCAL_TEAM],
                homeGoals,
                awayTeam: match[AWAY_TEAM],
                awayGoals,
                teamWin: match[LOCAL_TEAM],
                teamLose: match[AWAY_TEAM]

            }
        } else {
            if (homeGoals < awayGoals) {
                return {
                    homeTeam: match[LOCAL_TEAM],
                    homeGoals,
                    awayTeam: match[AWAY_TEAM],
                    awayGoals,
                    teamWin: match[AWAY_TEAM],
                    teamLose: match[LOCAL_TEAM]
                }
            } else {
                return this.play(match)
            }
        }

    }

    start() {
        for (const matchDay of this.matchDaySchedule) {
            const matchDaySummary = {
                result: [],
            }
            for (const match of matchDay) {
                const result = this.play(match)
                this.teamsChangeRound(result)
                matchDaySummary.result.push(result)
            }
            this.summaries.push(matchDaySummary)
        }
    }

    teamsChangeRound(result) {
        const teamPassRound = result.teamWin
        const teamPassThirdQuarter = result.teamLose
        this.filteredTeamsWin.push(teamPassRound)
        if (result.teamLose.length == 2) {
            this.filteredTeamsLoss.push(teamPassThirdQuarter)
        }

    }





}






