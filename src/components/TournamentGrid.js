const TournamentGrid = ({selectedWinners, tournament, currentRoundIndex, selectWinner}) => {
    const matchHasWinner = (matchId) => selectedWinners.some(winner => winner?.matchId && winner.matchId === matchId)
    const findWinningTeam = (matchId) => selectedWinners.find(winner => winner?.matchId === matchId).winningTeam
    
    return(
        <div className="draw-container">
          {Object.keys(tournament).map(roundKey => 
            <div key={tournament[roundKey].roundId}>
              <strong>{roundKey}</strong>
              {tournament[roundKey].matchboard.map(match => 
                <div key={`match-${match.matchId}`} className="flex">
                  {match.team1 && 
                    <button className="team-btn" disabled={matchHasWinner(match.matchId)} onClick={() => selectWinner(match.matchId, match.team1)}>
                      {match.team1}
                    </button>
                  }
                  <span style={{margin: '0 8px'}}>vs.</span>
                  {match.team2 &&
                    <button className="team-btn" disabled={matchHasWinner(match.matchId)}  onClick={() => selectWinner(match.matchId, match.team2)}>
                      {match.team2}
                    </button>
                  }
                  {matchHasWinner(match.matchId) && <p>Winner: {findWinningTeam(match.matchId)?.name}</p>}
                </div>
              )}
            </div>
          )}
        </div>
    )
}

export default TournamentGrid