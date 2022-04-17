import { useInfiniteQuery } from 'vue-query'

const defaultUrl = 'https://swapi.dev/api/planets'

export interface Planet {
  name: string
  gravity: string
  terrain: string
  population: string
  url: string
}
interface FindResult {
  next: string
  previous: string
  count: number
  results: Planet[]
}

interface PlanetFetchParams {
  pageParam?: string
}
const planetFetch = async ({
  pageParam = defaultUrl,
}: PlanetFetchParams): Promise<FindResult> =>
  fetch(pageParam).then(response => response.json())

export const usePlanetFindInifite = () => {
  const result = useInfiniteQuery<FindResult>('planetFind', planetFetch, {
    getNextPageParam(prevPage) {
      return prevPage.next
    },
    onSuccess(res) {
      // @ts-ignore
      const lastPage = res.pages.at(-1)
      if (lastPage && lastPage.next) {
        result.fetchNextPage.value()
      }
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  return result
}
