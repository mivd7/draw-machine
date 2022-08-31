const TournamentGrid = ({selectedWinners, tournament, selectWinner}) => {
    const matchHasWinner = (matchId, roundKey) => selectedWinners[roundKey]?.some(winner => winner?.matchId && winner.matchId === matchId)
    const findWinningTeam = (matchId, roundKey) => selectedWinners[roundKey]?.find(winner => winner?.matchId === matchId).winningTeam
    console.log('selected winners prop', selectedWinners)
    return(
        <div className="draw-container">
          {tournament && Object.keys(tournament).map(roundKey => 
            <div key={tournament[roundKey].roundId}>
              <strong>{roundKey}</strong>
              {tournament[roundKey].matchboard.map(match => 
                <div key={`match-${match.matchId}`} className="flex">
                  {match.team1 && 
                    <button className="team-btn" disabled={matchHasWinner(match.matchId, roundKey)} onClick={() => selectWinner(match.matchId, match.team1)}>
                      {match.team1}
                    </button>
                  }
                  <span style={{margin: '0 8px'}}>vs.</span>
                  {match.team2 &&
                    <button className="team-btn" disabled={matchHasWinner(match.matchId, roundKey)}  onClick={() => selectWinner(match.matchId, match.team2)}>
                      {match.team2}
                    </button>
                  }
                  {matchHasWinner(match.matchId, roundKey) && <p>Winner: {findWinningTeam(match.matchId, roundKey)?.name}</p>}
                </div>
              )}
            </div>
          )}
        </div>
    )
}

export default TournamentGrid