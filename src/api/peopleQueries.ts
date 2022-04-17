import { useQuery } from 'vue-query';

const url = 'https://swapi.dev/api/people';

interface Person {
  name: string
  height: string
  birth_year: string
  gender: string
}
const peopleFindQuery = async (): Promise<Person[]> => fetch(url)
  .then((response) => response.json());

export const usePeopleFind = useQuery('peopleFind', peopleFindQuery);
