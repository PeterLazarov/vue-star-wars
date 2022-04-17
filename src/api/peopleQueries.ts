/* eslint-disable indent */
import { useInfiniteQuery, useQuery, UseQueryOptions } from 'vue-query'

const defaultUrl = 'https://swapi.dev/api/people'

interface Person {
  name: string
  height: string
  birth_year: string
  gender: string
}
interface FindResult {
  next: string
  previous: string
  count: number,
  data: Person[]
}

interface PeopleFetchParams {
  pageParam?: string
}
// eslint-disable-next-line arrow-body-style
const fetchPeople = ({ pageParam = defaultUrl }: PeopleFetchParams): Promise<FindResult> => {
  return fetch(pageParam).then((response) => response.json())
}

// const peopleFindQuery = async ({ url = defaultUrl }: PeopleFindParams): Promise<FindResult> => fetch(url)
//   .then((response) => response.json())

// export const usePeopleFind = (params?: PeopleFindParams, options?: UseQueryOptions<FindResult>) => useQuery<FindResult>('peopleFind', () => peopleFindQuery(params), options)

export const usePeopleFindInifite = () =>
// eslint-disable-next-line implicit-arrow-linebreak
useInfiniteQuery<FindResult>('peopleFind', fetchPeople, {
  getNextPageParam: (prevPage) => prevPage.next,
})
