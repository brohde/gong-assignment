"use client";

import { useState, useEffect } from 'react';
import useSWR from 'swr'

import { Person } from '@/types';
import styles from './page.module.css'
import SearchSelectFilter from '@/components/SearchSelectFilter'
import SearchInputFilter from '@/components/SearchInputFilter'
import Record from '@/components/Record'

const BASE_URL = 'http://localhost:8888/';
// const fetcher = (url) => fetch(url).then((res) => res.json());

const fetcher = async (url: string) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
}

export default function Home() {
/*
  TODO: 
*/

  //const [filteredCountries, setFilteredCountries] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [seachText, setSearchText] = useState('');
  // const [data, setData] = useState([]);

  const { data = [], error, isLoading } = useSWR(
    "http://localhost:8888",
    fetcher
  );

  const selectedCountriesFlat = selectedCountries.map(c => c.label);
  
  let countries = [];
  if (data && data['display_countries']) {
    countries = data['display_countries'];
  }

  let filteredData: Person[] = [];
  if (data && data['data']) {
    data.data.forEach((person: Person) => {
      // If user has selected any countries from the dropdown, only display those users.
      if (selectedCountriesFlat.length == 0 || selectedCountriesFlat.includes(person.country)) {
        filteredData.push(person)
      }
    });
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = fetch(BASE_URL);
  //     const data = await (await response).json();
  //     setData(data);
  //   };

  //   fetchData();
  // }, [selectedCountries])

  //const countries: string[] = [];
  // const filteredData: Person[] = [];

  // console.log('selectedCountriesFlat', selectedCountriesFlat);

  // data.forEach((person: Person) => {
  //   // Building list of available countries to filter by
  //   if (!countries.includes(person.country)) {
  //     countries.push(person.country);
  //   }

  //   // If user has selected any countries from the dropdown, only display those users.
  //   if (selectedCountriesFlat.length == 0 || selectedCountriesFlat.includes(person.country)) {
  //     filteredData.push(person)
  //   }
  // });

  return (
    <main className={styles.container}>

      <header className={styles.header}>

        <SearchInputFilter />
        <SearchSelectFilter
          countries={countries}
          selected={selectedCountries}
          onChange={setSelectedCountries}
        />

      </header>

      <div className={styles.records}>

        {filteredData && filteredData.map((record: Person)  => {
          return <Record key={record.id} data={record} />
        })}

      </div>
    </main>
  )
}