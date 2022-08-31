const Tournament = ({selectedWinners, tournament, currentRoundIndex, selectWinner}) => {
    const matchHasWinner = (matchId) => selectedWinners.some(winner => winner?.matchId && winner.matchId === matchId)
    const findWinningTeam = (matchId) => selectedWinners.find(winner => winner?.matchId === matchId).winningTeam

    return(
        <div className="draw-container">
          <h2>Rondenaam</h2>
          {tournament['round'+currentRoundIndex]?.matchboard && tournament['round'+currentRoundIndex]?.matchboard.map(match => 

              <div key={`match-${match.matchId}`} className="flex">
                <button className="team-btn" disabled={matchHasWinner(match.matchId)} onClick={() => selectWinner(match.matchId, match.team1)}>
                  {match.team1}
                </button>
                <button className="team-btn" disabled={matchHasWinner(match.matchId)}  onClick={() => selectWinner(match.matchId, match.team2)}>
                  {match.team2}
                </button>
                {matchHasWinner(match.matchId) && <p>Winner: {findWinningTeam(match.matchId)?.name}</p>}
              </div>
            
          )}
        </div>
    )
}

export default Tournament