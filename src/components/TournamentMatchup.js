import { Button, HStack, Text, VStack } from "@chakra-ui/react";

const TournamentMatchup = ({match, selectWinner, matchHasWinner}) => {
    return(
        <VStack key={`match-${match.matchId}`} p={18} borderRadius={4} border={'2px solid'} borderColor={'whiteAlpha.900'} justifyContent={'space-between'} minW="full">
            {match.team1 && 
                <Button w="full" bgColor={'yellow.400'} color={"whiteAlpha.900"} disabled={matchHasWinner(match.matchId, match.round)} onClick={() => selectWinner(match.matchId, match.team1)}>
                    {match.team1}
                </Button>}
            
            {match.team2 &&
                <Button w="full" bgColor={'yellow.400'} color={"whiteAlpha.900"} disabled={matchHasWinner(match.matchId, match.round)}  onClick={() => selectWinner(match.matchId, match.team2)} marginLeft={0}>
                    {match.team2}
                </Button>}
        </VStack>
    )
}

export default TournamentMatchup; 