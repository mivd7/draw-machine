import { useMemo, useState } from 'react';
import './App.css';
import TournamentGrid from './components/TournamentGrid';
import TournamentForm from './components/TournamentForm';
import Draw from './lib/draw';
import { getTournamentGridColumns } from './lib/helpers';

function App() {
  const [totalRoundAmount, setTotalRoundAmount] = useState(0);
  const [draw, setDraw] = useState(null)
  const [drawCompleted, setDrawCompleted] = useState(false)
  const [selectedWinners, setSelectedWinners] = useState({
    round0: []
  })
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [tournament, setTournament] = useState(null);
  const matchGrid = useMemo(() => getTournamentGridColumns(Object.keys(tournament ?? {}), tournament), [tournament])

  const submitForm = (e, teams) => {
    e.preventDefault();
    const draw = new Draw(teams)
    setDraw(draw)
    setTournament(draw.generateTournament());
    setTotalRoundAmount(draw.totalRoundsLeft)
    setDrawCompleted(true)
  }

  const selectWinner = (matchId, winner, col) => {
    const winningTeam = {
      ...draw.getTeamByName(winner),
      wonMatchId: matchId
    };
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
    addTeamToNextRound(winningTeam, matchId)
    if(roundFinished) {
      const nextRoundIndex = currentRoundIndex + 1;
      newSelectedWinners['round'+nextRoundIndex] = []
      setCurrentRoundIndex(nextRoundIndex)
    }
  }

  function findNextMatchSlotIndex(nextRoundMatchboard, { leftCols, rightCols }, wonMatchId) {
    const nextLeftColIndex = leftCols.findIndex(col => col.some(match => match.matchId === wonMatchId)) + 1
    const isFinal = nextRoundMatchboard.length === 1;
    if(isFinal) {
      return nextRoundMatchboard.findIndex(match => match.team1 === null || match.team2 === null);
    }

    if(nextLeftColIndex > 0) {
      // winner on left
      const nextMatch = leftCols[nextLeftColIndex].find(match => match.team1 === null || match.team2 === null);
      console.log('nextMatch', nextMatch)
      console.log('nextRoundMatchboard', nextRoundMatchboard)
      return nextRoundMatchboard.findIndex(match => match.matchId === nextMatch.matchId)
    }
    
    const nextRightColIndex = rightCols.findIndex(col => col.some(match => match.matchId === wonMatchId)) - 1
    console.log('rightCols', rightCols)
    console.log('winning match id', wonMatchId)
    console.log('nextRightColIndex', nextRightColIndex)
    const nextMatch = rightCols[nextRightColIndex].find(match => match.team1 === null || match.team2 === null);
    return nextRoundMatchboard.findIndex(match => match.matchId === nextMatch.matchId)
  }

  const addTeamToNextRound = (winningTeam, wonMatchId) => {
    const copyTournament = {...tournament}
    const nextRoundIndex = currentRoundIndex + 1;
    const nextRound = copyTournament['round' + nextRoundIndex];
    if(nextRound) {
      const matchSlotIndex = findNextMatchSlotIndex(nextRound.matchboard, matchGrid, wonMatchId)
      if(!nextRound.matchboard[matchSlotIndex].team1 && !nextRound.matchboard[matchSlotIndex].team2) {
        nextRound.matchboard[matchSlotIndex].team1 = winningTeam.name
      } else if (nextRound.matchboard[matchSlotIndex].team1 && !nextRound.matchboard[matchSlotIndex].team2) {
        nextRound.matchboard[matchSlotIndex].team2 = winningTeam.name
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
