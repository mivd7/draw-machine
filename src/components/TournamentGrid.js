import TournamentMatchup from './TournamentMatchup';

const TournamentGrid = ({selectedWinners, roundKeys, dividedItems, selectWinner}) => {
    const {leftCols, rightCols, middleCol} = dividedItems;

    const matchHasWinner = (matchId, roundKey) => {
      return selectedWinners[roundKey]?.some(winner => winner.matchId === matchId)
    }
    
    function reverseArray (arr) {
      return [...arr].reverse();
    }

    return(
        <div className="draw-container">
          {leftCols && leftCols.map((col, i) => 
            <div className="grid-col grid-col-left" key={'tournament-left-'+i}>
              {col.map(match => 
                <TournamentMatchup 
                  key={match.matchId} 
                  match={match} 
                  selectWinner={selectWinner} 
                  matchHasWinner={matchHasWinner}/>
              )}
            </div>
          )}
          <div className="grid-col">
            {middleCol.map(match => 
              <TournamentMatchup 
                key={match.matchId} 
                match={match} 
                selectWinner={selectWinner} 
                matchHasWinner={matchHasWinner} />)}
          </div>
          {rightCols && reverseArray(rightCols).map((col, i) => 
            <div className="grid-col grid-col-right" key={'tournament-right-'+i}>
              {col.map(match => 
                <TournamentMatchup 
                  key={match.matchId} 
                  match={match} 
                  selectWinner={selectWinner} 
                  matchHasWinner={matchHasWinner}/>
              )}
            </div>
          )}
        </div>
    )
}

export default TournamentGrid