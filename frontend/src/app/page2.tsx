"use client";

import { useEffect } from 'react';
import useSWR from 'swr'

import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";


import Image from 'next/image'
// import styles from './page.module.css'

const fetcher = (url) => fetch(url).then((res) => res.json());


const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8888",
    fetcher
  );

  const [selected, setSelected] = useState([]);

 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <div>
    <p>hello {data.test}!</p>
    
    <div className="chooser">
      <br /><br /><br /><br /><br />
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select countries"
        disableSearch={true}
        hasSelectAll={false}
      />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
}
