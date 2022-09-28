import { Button, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Input, Select, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { hasDuplicates } from '../lib/helpers';
import teamFields, { teamAmountOptions } from '../lib/teamFields';

const TournamentForm = ({ onSubmit, onError }) => {
    const [teams, setTeams] = useState(teamFields);
    const [teamAmount, setTeamAmount] = useState(teamFields.length);
    const [errorMsg, setErrorMsg] = useState('');

    const handleTeamAmountChange = (e) => {
        const newTeamAmount = Number(e.target.value);
        if(newTeamAmount > teams.length) {
          const newTeamFields = [];
          for (let i = 0; i < newTeamAmount; i++) {
            newTeamFields.push({
              id: uuidv4(),
              name: ''
            })
          }
          const teamsToBeAdded = newTeamFields.slice(teams.length)
          const result = [...teams, ...teamsToBeAdded]
          setTeams(result)
          setTeamAmount(result.length)
        } else {
          const removeCount = teams.length - newTeamAmount;
          const sliced = [...teams].slice(0, removeCount * -1)
          setTeams(sliced)
          setTeamAmount(sliced.length)
        }
    }

    const handleTeamFieldChange = (e, teamIndex) => {
        const copyTeams = [...teams]
        const team = copyTeams[teamIndex]
        
        if(team) {
            team.name = e.target.value
            setTeams([...copyTeams])
        }
    }
    
    const validateForm = (teams) => {
        if(teams.some(team => team.name === '')) {
          setErrorMsg('Not enough teams to start draw')
          return false
        }
        if(hasDuplicates(teams.map(team => team.name))) {
          setErrorMsg('Teams can only enter once')
          return false
        }
        setErrorMsg('')
        return true
    }
    
    const handleSubmit = (e) => {
        const isValid = validateForm(teams)
        if(isValid) {
            onSubmit(e, teams)
        } else {
            onError();
        }
    }

    return(
        <form onSubmit={handleSubmit}>
          <Flex direction={'column'} mt={8} mb={16}>
            <Text>How many teams will compete in the tournament?</Text>
            <Select 
              defaultValue={teamAmount} 
              name="teamAmount" 
              style={{marginBottom: '8px'}} 
              onChange={handleTeamAmountChange}
            > 
              {teamAmountOptions.map((option,index) => <option key={'option'+index} value={option}>{option}</option>)}
            </Select>
          </Flex>
          <Heading as="h3" size="lg">Teams:</Heading>
          <Grid templateColumns={'1fr 1fr'} columnGap={16} mt={8} mb={16}>
            {teams.map((team, i) => 
              <GridItem className="team-field" key={`team-${team.id}`}>
               <Input type="text" defaultValue={team.name} onChange={(e) => handleTeamFieldChange(e, i)} placeholder="Name..."/>
              </GridItem>
            )}
          </Grid>
          
          <Button type="submit" bgColor={'yellow.600'} color={'white'}>Submit</Button>
          {errorMsg !== '' && <p style={{color: 'red'}}>{errorMsg}</p>}
        </form>
    )
}

export default TournamentForm;