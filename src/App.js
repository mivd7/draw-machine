import { useState } from 'react';
import './App.css';
import Draw from './lib/draw';
import teamFields from './lib/teamFields'

function App() {
  const [teams, setTeams] = useState(teamFields);
  const [draw, setDraw] = useState(null)
  const [drawCompleted, setDrawCompleted] = useState(false)

  const handleTeamFieldChange = (e, teamIndex) => {
    const copyTeams = [...teams]
    const team = copyTeams.find(team => team.id === teamIndex)
    if(team) {
      team.name = e.target.value
      copyTeams[teamIndex] = team
      setTeams([...copyTeams])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const competitors = teams.map(team => team.name)
    const draw = new Draw(competitors)
    setDraw(draw)
    setDrawCompleted(true)
  }

  return (
    <div className="app container flex-col">
      <h1>Matchboard</h1>
      {!drawCompleted && <form onSubmit={handleSubmit} className="form-container flex flex-col">
        <p>To start submit the teams you want to draw</p>
        {teams.map((team, i) => 
            <div className="team-field" key={`team-${i}`}>
              <input type="text" defaultValue={team.name} onChange={(e) => handleTeamFieldChange(e, i)}/>
            </div>
          )}
        <button type="submit">Submit</button>
      </form>}
      {draw !== null && 
        <div class="draw-container">
          <h2>{draw.matchRound} wedstrijden</h2>
          {draw.matchboard.map(match => <p>{match.title}</p>)}
          <button onClick={() => setDrawCompleted(false)}>Reset draw</button>
        </div>
        }
      
    </div>
  );
}

export default App;
