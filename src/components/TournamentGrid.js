import { Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import TournamentMatchup from './TournamentMatchup';

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
        <HStack templateColumns={`repeat(${colAmount}, 1fr)`} maxW="100%" columnGap={16}>
          {leftCols && leftCols.map((col, i) => 
            <VStack className="col col-left">
              {col.map(match => 
                <TournamentMatchup 
                  key={match.matchId} 
                  match={match} 
                  selectWinner={selectWinner} 
                  matchHasWinner={matchHasWinner}/>
              )}
            </VStack>
          )}
          <VStack className="col col-middle">
            {middleCol.map(match => 
              <TournamentMatchup 
                key={match.matchId} 
                match={match} 
                selectWinner={selectWinner} 
                matchHasWinner={matchHasWinner} />)}
          </VStack>
          {rightCols && reverseArray(rightCols).map((col, i) => 
            <VStack className="col col-right">
              {col.map(match => 
                <TournamentMatchup 
                  key={match.matchId} 
                  match={match} 
                  selectWinner={selectWinner} 
                  matchHasWinner={matchHasWinner}/>
              )}
            </VStack>
          )}
        </HStack>
    )
}

export default TournamentGrid