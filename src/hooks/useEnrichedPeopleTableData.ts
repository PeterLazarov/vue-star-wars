import {
  usePlanetFindInifite,
  usePeopleFindInifite,
} from '@/api'
import { computed, ComputedRef } from 'vue'
import { format } from 'date-fns'
import { Person, PersonTableModel, Planet } from '@/models'
interface PeopleTableData {
  people: ComputedRef<PersonTableModel[]>
  planetDict: ComputedRef<Record<string,Planet>>
}
export const useEnrichedPeopleTableData = (): PeopleTableData => {
  const { data: planetData } = usePlanetFindInifite()

  const { data: peopleData } = usePeopleFindInifite()

  const flatPlanets = computed(() => {
    return planetData.value
      ? planetData.value.pages.reduce((arr, page) => {
          arr.push(...page.results)
          return arr
        }, [] as Planet[])
      : []
  })
  const planetDict = computed<Record<string, Planet>>(() =>
    Object.assign({}, ...flatPlanets.value.map(p => ({ [p.url]: p }))),
  )

  const formatPerson = (person: Person): PersonTableModel => ({
    ...person,
    created:
      person.created === 'unknown'
        ? '-'
        : format(new Date(person.created), 'dd-MM-yyyy'),
    edited:
      person.edited === 'unknown'
        ? '-'
        : format(new Date(person.edited), 'dd-MM-yyyy'),
    height: Number.isNaN(Number(person.height)) ? '-' : person.height,
    mass: Number.isNaN(Number(person.mass)) ? '-' : person.mass,
    homeworldName:
      person.homeworld === 'unknown' ||
      !planetDict.value.hasOwnProperty(person.homeworld)
        ? '-'
        : planetDict.value[person.homeworld].name,
  })

  const formattedPeople = computed(() => {
    return peopleData.value
      ? peopleData.value.pages.reduce((arr, page) => {
          arr.push(...page.results.map(formatPerson))
          return arr
        }, [] as Person[])
      : []
  })

  return {
    people: formattedPeople,
    planetDict,
  }
}
