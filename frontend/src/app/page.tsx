"use client";

import { useState, useEffect } from 'react';
import useSWR from 'swr'
import { Person } from '@/types'
import { Option } from 'react-multi-select-component'
import styles from './page.module.css'
import SearchSelectFilter from '@/components/SearchSelectFilter'
import SearchInputFilter from '@/components/SearchInputFilter'
import Record from '@/components/Record'

// TODO: Move this to an environment var
const BASE_URL = 'http://localhost:8888/'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const [selectedCountries, setSelectedCountries] = useState<Option[]>([])
  const [seachText, setSearchText] = useState('')

  // To make this implementation simpler, I am retreiving the inital data set
  // all at once (which satisfies the initial loading requirement). Ideally if
  // I had more time, I might implement it as follows:
  //  1. Load a subset of initial dataset to page (e.g. 40 records).
  //  2. Implement pagination/load more feature.
  //  3. When user filters by country, query API endpoint for data.

  const { data = [], error, isLoading } = useSWR(
    BASE_URL,
    fetcher
  );

  // This is just to get you going in case the MAMP server isn't running.
  // I would like to handle error and loading states more gracefully.
  if (error) return <div>Make sure API server is running and accessible at {BASE_URL}.</div>

  // Flatten the state value from Option[] to string[]
  const selectedCountriesFlat = selectedCountries.map(c => c.value)
  
  // Grab list of countries provided by API that satisfies the instructions
  let countries = []
  if (data && data['display_countries']) {
    countries = data['display_countries']
  }

  // Since the API will return the full dataset, we have to filter it client side.
  // Right now I've only implemented the Country filter, 
  let filteredRecords: Person[] = []
  if (data && data['records']) {
    data.records.forEach((person: Person) => {
      // If user has selected any countries from the dropdown, only display those users.
      if (selectedCountriesFlat.length == 0 || selectedCountriesFlat.includes(person.country)) {
        filteredRecords.push(person)
      }
    });
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <SearchInputFilter /> {/* Not implemented */}
        <SearchSelectFilter
          countries={countries}
          selected={selectedCountries}
          onChange={setSelectedCountries}
        />
      </header>

      <div className={styles.records}>
        {filteredRecords && filteredRecords.map((record: Person)  => {
          return <Record key={record.id} data={record} />
        })}
      </div>
    </main>
  )
}
