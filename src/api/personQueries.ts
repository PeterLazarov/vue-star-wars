import { Person } from '@/models'
import { useInfiniteQuery } from 'vue-query'

const defaultUrl = 'https://swapi.dev/api/people'
interface FindResult {
  next: string
  previous: string
  count: number
  results: Person[]
}

interface PeopleFetchParams {
  pageParam?: string
}

const fetchPeople = ({
  pageParam = defaultUrl,
}: PeopleFetchParams): Promise<FindResult> => {
  return fetch(pageParam).then(response => response.json())
}

export const usePeopleFindInifite = () => {
  const result = useInfiniteQuery<FindResult>('peopleFind', fetchPeople, {
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
