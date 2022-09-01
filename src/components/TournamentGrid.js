import { useMemo } from "react";
import { divideMatchboard } from '../lib/helpers';
import TournamentMatchup from './TournamentMatchup';

function getTournamentGridColumns(tournamentKeys, tournament) {
  const lastRoundKey = tournamentKeys.pop();
  const result = {
      leftCols: [],
      rightCols: [],
      // middle column represents final round of tournament
      middleCol: tournament[lastRoundKey].matchboard
  };

  tournamentKeys.forEach(key => {
      const divided = divideMatchboard(tournament[key].matchboard)
      if(divided) {
          result.leftCols.push(divided.leftSide)
          result.rightCols.push(divided.rightSide)
      }
  })
  result.rightCols.reverse();
  return result;
}

const TournamentGrid = ({selectedWinners, tournament, selectWinner}) => {
    const roundKeys = Object.keys(tournament);
    const dividedItems = useMemo(() => getTournamentGridColumns(Object.keys(tournament), tournament), [tournament])
    const {leftCols, rightCols, middleCol} = dividedItems;

    const matchHasWinner = (matchId, roundKey) => selectedWinners[roundKey]?.some(winner => winner?.matchId && winner.matchId === matchId)

    return(
        <div className="draw-container">
          {leftCols && leftCols.map((col, i) => 
            <div class="grid-col grid-col-left" key={'tournament-left-'+i}>
              {leftCols[i].map(match => 
                <TournamentMatchup key={match.matchId} match={match} roundKey={roundKeys[i]} selectWinner={selectWinner} matchHasWinner={matchHasWinner}/>
              )}
            </div>
          )}
          <div class="grid-col">
            {middleCol.map(match => <TournamentMatchup key={match.matchId} match={match} roundKey={roundKeys[roundKeys.length - 1]} selectWinner={selectWinner} matchHasWinner={matchHasWinner}/>)}
          </div>
          {rightCols && rightCols.map((col, i) => 
            <div class="grid-col grid-col-right" key={'tournament-right-'+i}>
              {rightCols[i].map(match => 
                <TournamentMatchup key={match.matchId} match={match} roundKey={roundKeys[i]} selectWinner={selectWinner} matchHasWinner={matchHasWinner}/>
              )}
            </div>
          )}
        </div>
    )
}

export default TournamentGrid