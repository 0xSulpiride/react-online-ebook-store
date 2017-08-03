import { shop } from '../actions';

const initialState = [
  { isbn: '1234-4567-7890',
    author: 'Orwell George',
    name: '1984',
    rating: 5 },
  { isbn: '2234-4567-7890',
    author: 'Orwell George',
    name: 'Animal Farm',
    rating: 4 },
  { isbn: '3234-4567-7890',
    author: 'Kenneth Cook',
    name: 'Wake in Fright',
    rating: 5 },
  { isbn: '4234-4567-7890',
    author: 'Xavier Herbert',
    name: 'Capricornia. A Novel of North Australia',
    rating: 3 },
  { isbn: '5234-4567-7890',
    author: 'Patrick White',
    name: 'Voss',
    rating: 2 },
  { isbn: '6234-4567-7890',
    author: 'Orwell George',
    name: 'Down and Out in Paris and London',
    rating: 4 },
  { isbn: '7234-4567-7890',
    author: 'Orwell George',
    name: 'Burmese Days',
    rating: 4 },
  { isbn: '8234-4567-7890',
    author: 'Orwell George',
    name: 'A Collection of Essays',
    rating: 5 },
  { isbn: '0666-0666-0666',
    author: 'Moses',
    name: 'Holy Bible',
    rating: 5 },
  { isbn: '0234-4567-7890',
    author: 'Stan Lee',
    name: 'How To Draw Comics The Marvel Way',
    rating: 3 },
]

export default function (state = initialState, action) {
  switch (action.type) {
    case shop.SEARCH:
      return initialState.filter(b => (b.author + b.name).toLowerCase().includes(action.query.toLowerCase()));
    case shop.RATE: 
      return state.map(b => {
        if(b.isbn === action.isbn)
          return {...b, rating: action.rating}
        return b;
      });
    default: return state;
  }
}