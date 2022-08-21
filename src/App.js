import { useState } from 'react';
import './App.css';
import Draw from './lib/draw';
import teamFields from './lib/teamFields'

function App() {
  const [teams, setTeams] = useState(teamFields);
  const [teamAmount, setTeamAmount] = useState(teamFields.length);
  const [draw, setDraw] = useState(null)
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
          id: i + teams.length,
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
      console.log(draw)
      setDraw(draw)
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

  const findWinningTeam = (matchId) => selectedWinners.find(winner => winner.matchId === matchId).winningTeam

  const goToNextRound = () => console.log('lessa go')
  return (
    <div className="app container flex-col">
      <h1>Matchboard</h1>
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
              {teamAmountOptions.map(option => <option value={option}>{option}</option>)}
            </select>
          </div>
          
          {teams.map((team, i) => 
              <div className="team-field" key={team.id}>
               <label>{i + 1}</label> <input type="text" defaultValue={team.name} onChange={(e) => handleTeamFieldChange(e, i)}/>
              </div>
            )}
          <button type="submit">Submit</button>
          {errorMsg !== '' && <p style={{color: 'red'}}>{errorMsg}</p>}
        </form>}

      {drawCompleted && 
        <div className="draw-container">
          <h2>{draw.round}</h2>
          {draw.matchboard.map(match => 

              <div key={match.matchId} class="flex">
                <button className="team-btn" disabled={matchHasWinner(match.matchId)} onClick={() => selectWinner(match.matchId, match.team1)}>
                  {match.team1}
                </button>
                <button className="team-btn" disabled={matchHasWinner(match.matchId)}  onClick={() => selectWinner(match.matchId, match.team2)}>
                  {match.team2}
                </button>
                {matchHasWinner(match.matchId) && <p>Winner: {findWinningTeam(match.matchId).name}</p>}
              </div>
            
          )}
          <button onClick={() => setDrawCompleted(false)}>Edit draw</button>
          {draw.matchAmount === selectedWinners.length && <button onClick={goToNextRound}>Next Round</button>}
        </div>}
    </div>
  );
}

export default App;
