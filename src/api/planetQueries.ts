import { useQuery } from 'vue-query'

const defaultUrl = 'https://swapi.dev/api/planets'

interface Planet {
  name: string
  gravity: string
  terrain: string
  population: string
}

interface PlanetGetParams {
  url: string
}
const planetGetQuery = async ({ url = defaultUrl }: PlanetGetParams): Promise<Planet> => fetch(url)
  .then((response) => response.json())

export const usePlanetGet = (params: PlanetGetParams) => useQuery('planetGet', () => planetGetQuery(params))
