/* eslint-disable indent */
import { useInfiniteQuery } from 'vue-query'

const defaultUrl = 'https://swapi.dev/api/people'

export interface Person {
  name: string
  height: string
  birth_year: string
  gender: string
}
interface FindResult {
  next: string
  previous: string
  count: number,
  results: Person[]
}

interface PeopleFetchParams {
  pageParam?: string
}

// eslint-disable-next-line arrow-body-style
const fetchPeople = ({ pageParam = defaultUrl }: PeopleFetchParams): Promise<FindResult> => {
  return fetch(pageParam).then(response => response.json())
}

export const usePeopleFindInifite = () => {
// eslint-disable-next-line implicit-arrow-linebreak
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
  })
  return result
}