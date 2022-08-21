export default class Draw {
  constructor(competitors) {
    console.log(competitors)
    this.matchboard = [];
    this.teams = [...competitors]
    this.teamsLeft = [...competitors.map(competitor => competitor.name)]
    this.drawInProgress = false;
    this.matchAmount = competitors.length / 2;
    this.tournamentProgress = []
    if(!competitors || this.matchAmount % 2 !== 0) {
      throw new Error('Amount of competitors and amount of matches has to be even')
    }
    
    this.startDraw();
  }

  getTeamByName(name) {
    return this.teams.find(team => team.name === name)
  }
  savePreviousRound (previousRound) {
    this.tournamentProgress = [...this.tournamentProgress, previousRound]
  }
  getMatchRoundName(matchAmount) {
    if(matchAmount > 8) {
       return `1 / ${matchAmount} finale`
    }

    switch (matchAmount) {
      case 8: 
        return 'Eigth Finals'
      case 4:
        return 'Quarter Finals'
      case 2:
        return 'Semi Finals'
      case 1:
        return 'Finals'
      default:
        break;
    }
  }

  startDraw() {
    this.round = this.getMatchRoundName(this.matchAmount)
    this.drawInProgress = true;
    this.matchId = 1;
    while (this.drawInProgress) {
      this.drawTeams()
    }
  }

  drawTeams() {
    const copyTeamsLeft = [...this.teamsLeft]
    const { team1, team2 } = this.getMatchup(copyTeamsLeft)

    this.teamsLeft = copyTeamsLeft.filter(team => team !== team1 && team !== team2)
    this.matchboard = [...this.matchboard, {
      matchId: this.matchId,
      title: `${team1} vs. ${team2}`, 
      team1,
      team2
    }]
    this.matchId++

    if (this.matchboard.length === this.matchAmount) {
      console.log(this.matchboard)
      delete this.teamsLeft;
      delete this.matchId;
      this.drawInProgress = false;
    }
  }

  getMatchup(teamsLeft) {
    let firstTeamIndex = this.randomIntFromInterval(0, (teamsLeft.length - 1));
    let secondTeamIndex = this.randomIntFromInterval(0, (teamsLeft.length - 1), firstTeamIndex)
    return {
      id: `${firstTeamIndex}${secondTeamIndex}`,
      team1: teamsLeft[firstTeamIndex],
      team2: teamsLeft[secondTeamIndex]
    }
  }

  randomIntFromInterval(min, max, blacklistedInt = -1) {
    const result = Math.floor(Math.random() * (max - min + 1) + min)
    if (result !== blacklistedInt) {
      return result
    }
    return this.randomIntFromInterval(min, max, blacklistedInt)
  }
}