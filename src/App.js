import { useState } from 'react';
import './App.css';
import TournamentGrid from './components/TournamentGrid';
import TournamentForm from './components/TournamentForm';
import Draw from './lib/draw';

function App() {
  const [totalRoundAmount, setTotalRoundAmount] = useState(0);
  const [draw, setDraw] = useState(null)
  const [drawCompleted, setDrawCompleted] = useState(false)
  const [selectedWinners, setSelectedWinners] = useState({
    round0: []
  })
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [tournament, setTournament] = useState(null);

  const submitForm = (e, teams) => {
    e.preventDefault();
    const draw = new Draw(teams)
    setDraw(draw)
    setTournament(draw.generateTournament());
    setTotalRoundAmount(draw.totalRoundsLeft)
    setDrawCompleted(true)
  }

  const selectWinner = (matchId, winner, col) => {
    const winningTeam = draw.getTeamByName(winner);
    const currentRoundKey = 'round'+currentRoundIndex
    const newSelectedWinners = {
      ...selectedWinners,
      [currentRoundKey]: [
        ...selectedWinners[currentRoundKey],
        {
          matchId,
          winningTeam
        }
      ]
    }
    const roundFinished = tournament[currentRoundKey]?.matchAmount === newSelectedWinners[currentRoundKey].length
    setSelectedWinners(newSelectedWinners)
    addTeamToNextRound(winningTeam.name)
    if(roundFinished) {
      const nextRoundIndex = currentRoundIndex + 1;
      newSelectedWinners['round'+nextRoundIndex] = []
      setCurrentRoundIndex(nextRoundIndex)
    }
  }

  const addTeamToNextRound = (teamName) => {
    const copyTournament = {...tournament}
    const nextRoundIndex = currentRoundIndex + 1;
    const nextRound = copyTournament['round' + nextRoundIndex];
    if(nextRound) {
      const matchSlotIndex = nextRound.matchboard.findIndex(match => match.team1 === null || match.team2 === null);
      if(!nextRound.matchboard[matchSlotIndex].team1 && !nextRound.matchboard[matchSlotIndex].team2) {
        nextRound.matchboard[matchSlotIndex].team1 = teamName
      } else if (nextRound.matchboard[matchSlotIndex].team1 && !nextRound.matchboard[matchSlotIndex].team2) {
        nextRound.matchboard[matchSlotIndex].team2 = teamName
      }
      
      setTournament(copyTournament)
    }
    // @TODO handle tournament end
  }

  // @TODO const drawWinners = (winners) => {
  //   const competitors = winners.map(({ winningTeam }) => winningTeam);
  //   const draw = new Draw(competitors)
  //   setDraw(draw);
  //   setTournament(draw.generateTournament())
  //   setTotalRoundAmount(draw.totalRoundsLeft)
  //   setSelectedWinners({})
  //   setCurrentRoundIndex(0);
  // }

  return (
    <div className="app container flex-col">
      <h1>Matchboard</h1>
      {drawCompleted && <h3>Total rounds: {totalRoundAmount}</h3>}
      {!drawCompleted && <TournamentForm onSubmit={submitForm} onError={() => setDrawCompleted(false)}/>}

      {drawCompleted && <TournamentGrid selectedWinners={selectedWinners} tournament={tournament} selectWinner={selectWinner}/>}
    </div>
  );
}

export default App;
