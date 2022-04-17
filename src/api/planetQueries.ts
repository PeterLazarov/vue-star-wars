import { useQuery } from 'vue-query';

const url = 'https://swapi.dev/api/planets';

interface Planet {
  name: string
  gravity: string
  terrain: string
  population: string
}

interface PlanetGetParams {
  planetId: number
}
const planetGetQuery = async ({ planetId }: PlanetGetParams): Promise<Planet[]> => fetch(`${url}/${planetId}`)
  .then((response) => response.json());

export const usePlanetGet = (params: PlanetGetParams) => useQuery('planetGet', () => planetGetQuery(params));
