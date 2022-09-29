import { HStack, VStack } from '@chakra-ui/react';
import TournamentBracket from './TournamentBracket';

const TournamentGrid = ({selectedWinners, dividedItems, selectWinner}) => {
    const {leftCols, rightCols, middleCol} = dividedItems;
    const colAmount = leftCols.length + rightCols.length + middleCol.length;
    const matchHasWinner = (matchId, roundKey) => {
      return selectedWinners[roundKey]?.some(winner => winner.matchId === matchId)
    }
    
    function reverseArray (arr) {
      return [...arr].reverse();
    }

    return(
        <HStack maxW="100%" minH="100vh" overflow={'clip'} alignContent="center" alignItems="center" justifyContent="center">
          {leftCols && leftCols.map((col, i) => 
            <VStack className="col col-left" alignItems="center" justifyContent="center">
              {col.map(match => 
                <TournamentBracket 
                  key={match.matchId} 
                  match={match} 
                  selectWinner={selectWinner} 
                  matchHasWinner={matchHasWinner}
                  side="left"/>
              )}
            </VStack>
          )}
          <VStack className="col col-middle">
            {middleCol.map(match => 
              <TournamentBracket 
                key={match.matchId} 
                match={match} 
                selectWinner={selectWinner} 
                matchHasWinner={matchHasWinner} />)}
          </VStack>
          {rightCols && reverseArray(rightCols).map((col, i) => 
            <VStack className="col col-right">
              {col.map(match => 
                <TournamentBracket 
                  key={match.matchId} 
                  match={match} 
                  selectWinner={selectWinner} 
                  matchHasWinner={matchHasWinner}
                  side="right"/>
              )}
            </VStack>
          )}
        </HStack>
    )
}

export default TournamentGrid