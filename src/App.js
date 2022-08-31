import { useState } from 'react';
import './App.css';
import Draw from './lib/draw';
import teamFields from './lib/teamFields'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [teams, setTeams] = useState(teamFields);
  const [teamAmount, setTeamAmount] = useState(teamFields.length);
  const [totalRoundAmount, setTotalRoundAmount] = useState(0);
  const [draw, setDraw] = useState(null)
  const [matchboard, setMatchboard] = useState(null);
  const [drawCompleted, setDrawCompleted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedWinners, setSelectedWinners] = useState([])
  const teamAmountOptions = [4, 8, 16, 32, 64];

  function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
  }

  const handleTeamFieldChange = (e, teamIndex) => {
    const copyTeams = [...teams]
    const team = copyTeams[teamIndex]
    
    if(team) {
      team.name = e.target.value
      setTeams([...copyTeams])
    }
  }

  const handleTeamAmountChange = (e) => {
    const newTeamAmount = Number(e.target.value);
    if(newTeamAmount > teams.length) {
      const newTeamFields = [];
      for (let i = 0; i < newTeamAmount; i++) {
        newTeamFields.push({
          id: uuidv4(),
          name: ''
        })
      }
      const teamsToBeAdded = newTeamFields.slice(teams.length)
      const result = [...teams, ...teamsToBeAdded]
      setTeams(result)
      setTeamAmount(result.length)
    } else {
      const removeCount = teams.length - newTeamAmount;
      const sliced = [...teams].slice(0, removeCount * -1)
      setTeams(sliced)
      setTeamAmount(sliced.length)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm()
    if(isValid) {
      const draw = new Draw(teams)
      console.log('generateTournament', draw.generateTournament())
      setDraw(draw)
      setMatchboard(draw.matchboard)
      setTotalRoundAmount(draw.totalRoundsLeft)
      setDrawCompleted(true)
    } else {
      setDrawCompleted(false)
    }
  }

  const validateForm = () => {
    if(teams.some(team => team.name === '')) {
      setErrorMsg('Not enough teams to start draw')
      return false
    }
    if(hasDuplicates(teams.map(team => team.name))) {
      setErrorMsg('Teams can only enter once')
      return false
    }
    setErrorMsg('')
    return true
  }

  const selectWinner = (matchId, winner) => {
    const winningTeam = draw.getTeamByName(winner);
    setSelectedWinners([...selectedWinners, {
      matchId, 
      winningTeam
    }])
  }

  const matchHasWinner = (matchId) => selectedWinners.some(winner => winner?.matchId && winner.matchId === matchId)

  const findWinningTeam = (matchId) => selectedWinners.find(winner => winner?.matchId === matchId).winningTeam

  const drawWinners = (winners) => {
    const competitors = winners.map(({ winningTeam }) => winningTeam);
    const draw = new Draw(competitors)
    setDraw(draw);
    setMatchboard(draw.matchboard)
    setTotalRoundAmount(draw.totalRoundsLeft)
    setSelectedWinners([])
  }

  const goToNextRound = (winners) => {
    const nextRoundMatches = []

    winners.forEach((winner, i) => {
      const newMatchId = matchboard.length + (i + 1);
      if(nextRoundMatches.length < (matchboard.length / 2)) {
        nextRoundMatches.push({matchId: newMatchId, team1: winner.winningTeam.name, team2: winners[i + 1].winningTeam.name})
      }
    })
    setMatchboard(nextRoundMatches);
  }

  return (
    <div className="app container flex-col">
      <h1>Matchboard</h1>
      {drawCompleted && <h3>Total rounds: {totalRoundAmount}</h3>}
      {!drawCompleted && 
        <form onSubmit={handleSubmit} className="form-container flex flex-col">
          <div>
            <p>How many teams will compete in the tournament?</p>
            <select 
              defaultValue={teamAmount} 
              name="teamAmount" 
              style={{marginBottom: '8px'}} 
              onChange={handleTeamAmountChange}
            >
              {teamAmountOptions.map((option,index) => <option key={'option'+index} value={option}>{option}</option>)}
            </select>
          </div>
          
          {teams.map((team, i) => 
              <div className="team-field" key={`team-${team.id}`}>
               <label>{i + 1}</label> <input type="text" defaultValue={team.name} onChange={(e) => handleTeamFieldChange(e, i)}/>
              </div>
            )}
          <button type="submit">Submit</button>
          {errorMsg !== '' && <p style={{color: 'red'}}>{errorMsg}</p>}
        </form>}

      {drawCompleted && 
        <div className="draw-container">
          <h2>{draw.round}</h2>
          {matchboard && matchboard.map(match => 

              <div key={`match-${match.matchId}`} className="flex">
                <button className="team-btn" disabled={matchHasWinner(match.matchId)} onClick={() => selectWinner(match.matchId, match.team1)}>
                  {match.team1}
                </button>
                <button className="team-btn" disabled={matchHasWinner(match.matchId)}  onClick={() => selectWinner(match.matchId, match.team2)}>
                  {match.team2}
                </button>
                {matchHasWinner(match.matchId) && <p>Winner: {findWinningTeam(match.matchId)?.name}</p>}
              </div>
            
          )}
          <button onClick={() => setDrawCompleted(false)}>Edit draw</button>
          {draw.matchAmount === selectedWinners.length && 
          <div>
            <button onClick={() => goToNextRound(selectedWinners)}>Next Round</button>
            <button onClick={() => drawWinners(selectedWinners)}>Draw winners again</button>
          </div>}
        </div>}
    </div>
  );
}

export default App;
