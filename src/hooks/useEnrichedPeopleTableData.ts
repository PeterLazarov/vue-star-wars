import { usePlanetFindInifite, usePeopleFindInifite, Planet, Person } from "@/api"
import { computed, ComputedRef } from "vue"

interface PeopleTableData {
    people: ComputedRef<Person[]>
    planets: ComputedRef<Planet[]>
}
export const useEnrichedPeopleTableData = (): PeopleTableData => {
    const { data: planetData } = usePlanetFindInifite()

    const {
      data: peopleData,
    } = usePeopleFindInifite()

    const flatPlanets = computed(() => {
      return planetData.value
        ? planetData.value.pages.reduce(
            (arr, page) => arr.concat(...page.results),
            [] as Planet[],
          )
        : []
    })
    const planetDict = computed<Record<string, Planet>>(() =>
      Object.assign({}, ...flatPlanets.value.map(p => ({ [p.url]: p }))),
    )

    const formatPerson = (person: Person) => ({
      ...person,
      homeworld: planetDict.value.hasOwnProperty(person.homeworld)
        ? planetDict.value[person.homeworld].name
        : '',
    })

    const formattedPeople = computed(() => {
      return peopleData.value
        ? peopleData.value.pages.reduce(
            (arr, page) => arr.concat(...page.results.map(formatPerson)),
            [] as Person[],
          )
        : []
    })

    return {
      people: formattedPeople,
      planets: flatPlanets,
    }
}