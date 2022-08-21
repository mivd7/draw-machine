import { useState } from 'react';
import './App.css';
import Draw from './lib/draw';
import teamFields from './lib/teamFields'

function App() {
  const [teams, setTeams] = useState(teamFields);
  const [draw, setDraw] = useState(null)
  const [drawCompleted, setDrawCompleted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');
  const teamAmountOptions = [4, 8, 16, 32, 64];

  const handleTeamFieldChange = (e, teamIndex) => {
    const copyTeams = [...teams]
    const team = copyTeams.find(team => team.id === teamIndex)
    if(team) {
      team.name = e.target.value
      copyTeams[teamIndex] = team
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
      setTeams([...teams, ...teamsToBeAdded])
    } else {
      const removeCount = teams.length - newTeamAmount;
      const sliced = [...teams].slice(0, removeCount * -1)
      setTeams(sliced)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const competitors = teams.map(team => team.name);
    if(!competitors.some(competitor => competitor === '')) {
      const draw = new Draw(competitors)
      setDraw(draw)
      setDrawCompleted(true)
    } else {
      setErrorMsg('Not enough teams to start draw')
      setDrawCompleted(false)
    }
  }

  return (
    <div className="app container flex-col">
      <h1>Matchboard</h1>
      {!drawCompleted && 
        <form onSubmit={handleSubmit} className="form-container flex flex-col">
          <div>
            <p>How many teams will compete in the tournament?</p>
            <select 
              defaultValue={8} 
              name="teamAmount" 
              style={{marginBottom: '8px'}} 
              onChange={handleTeamAmountChange}
            >
              {teamAmountOptions.map(option => <option value={option}>{option}</option>)}
            </select>
          </div>
          
          {teams.map((team, i) => 
              <div className="team-field" key={team.id}>
                <input type="text" defaultValue={team.name} onChange={(e) => handleTeamFieldChange(e, i)}/>
              </div>
            )}
          <button type="submit">Submit</button>
          {errorMsg !== '' && <p style={{color: 'red'}}>{errorMsg}</p>}
        </form>}

      {drawCompleted && 
        <div className="draw-container">
          <h2>{draw.round}</h2>
          {draw.matchboard.map(match => 
            <p key={match.matchId}>{match.title}</p>
          )}
          <button onClick={() => setDrawCompleted(false)}>Edit draw</button>
        </div>}
    </div>
  );
}

export default App;
