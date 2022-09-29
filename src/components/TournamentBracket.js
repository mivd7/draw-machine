import { Button, VStack } from "@chakra-ui/react";

const TournamentMatchup = ({ match, selectWinner, matchHasWinner, side }) => {
    const borders = {
        general: '2px solid',
        right: side === 'left' ? 0 : '2px',
        left: side === 'left' ? '2px' : 0
    }

    return(
        <VStack 
            p={18} 
            mb={32}
            border={borders.general}
            borderLeft={borders.right} 
            borderRight={borders.left}
            borderColor={'whiteAlpha.900'} 
            justifyContent={'space-between'} 
            minW="full"
            position="relative" >
            {match.team1 && 
                <Button 
                    w="full" 
                    bgColor={'yellow.400'} 
                    color={"whiteAlpha.900"} 
                    position="absolute"
                    top={-50}
                    disabled={matchHasWinner(match.matchId, match.round)} 
                    onClick={() => selectWinner(match.matchId, match.team1)}
                >
                    {match.team1}
                </Button>}
            
            {match.team2 &&
                <Button 
                    w="full" 
                    bgColor={'yellow.400'} 
                    color={"whiteAlpha.900"} 
                    position="absolute"
                    bottom={-50}
                    disabled={matchHasWinner(match.matchId, match.round)}  
                    onClick={() => selectWinner(match.matchId, match.team2)}>
                    {match.team2}
                </Button>}
        </VStack>
    )
}

export default TournamentMatchup; 