import { v4 as uuidv4 } from 'uuid';

export const dummyCompetitors = ['ajax','feyenoord','psv','liverpool','man united', 'man city', 'real madrid', 'barcelona']
export const teamAmountOptions = [4, 8, 16, 32, 64];

let teamFields = [];
for (let i = 0; i < 8; i++) {
  teamFields.push({
    id: uuidv4(),
    name: ''
  })
}

export default teamFields;
