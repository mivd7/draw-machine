import { useMemo, useState } from 'react';
import './App.css';
import TournamentGrid from './components/TournamentGrid';
import TournamentForm from './components/TournamentForm';
import Draw from './lib/draw';
import { getTournamentGridColumns } from './lib/helpers';
import { Container, Flex, Heading } from '@chakra-ui/react';

function App() {
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
    setDrawCompleted(true)
  }

  const selectWinner = (matchId, winner, col) => {
    const winningTeam = draw.getTeamByName(winner)
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
    const isFinal = nextRoundMatchboard.length === 1;
    if(isFinal) {
      // only one match left
      return nextRoundMatchboard.findIndex(match => match.team1 === null || match.team2 === null);
    }

    const nextLeftColIndex = leftCols.findIndex(col => col.some(match => match.matchId === wonMatchId)) + 1
    if(nextLeftColIndex > 0) {
      // winner on left
      const nextMatch = leftCols[nextLeftColIndex].find(match => match.team1 === null || match.team2 === null);
      return nextRoundMatchboard.findIndex(match => match.matchId === nextMatch.matchId)
    }
    
    // winner on right
    const nextRightColIndex = rightCols.findIndex(col => col.some(match => match.matchId === wonMatchId)) + 1
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
    <Container maxW="container.lg" py={[16, 32]}>
      <Flex direction="column" alignItems={'center'}>
        <Heading textAlign="center">Matchboard</Heading>
        {!drawCompleted && <TournamentForm onSubmit={submitForm} onError={() => setDrawCompleted(false)}/>}

        {drawCompleted && 
          <TournamentGrid 
            selectedWinners={selectedWinners} 
            roundKeys={Object.keys(tournament ?? {})} 
            selectWinner={selectWinner} 
            dividedItems={matchGrid}/>}
      </Flex>
    </Container>
  );
}

export default App;
