const TournamentMatchup = ({match, roundKey, selectWinner, matchHasWinner}) => {
    return(
        <div key={`match-${match.matchId}`} className="flex">
            {match.team1 && 
                <button className="team-btn" disabled={matchHasWinner(match.matchId, roundKey)} onClick={() => selectWinner(match.matchId, match.team1)}>
                    {match.team1}
                </button>}

            <span style={{margin: '0 8px'}}>vs.</span>
            
            {match.team2 &&
                <button className="team-btn" disabled={matchHasWinner(match.matchId, roundKey)}  onClick={() => selectWinner(match.matchId, match.team2)}>
                    {match.team2}
                </button>}
        </div>
    )
}

export default TournamentMatchup;