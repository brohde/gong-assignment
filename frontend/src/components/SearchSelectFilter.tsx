import { useState } from "react";
import { MultiSelect, Option } from "react-multi-select-component";
import styles from './SearchSelectFilter.module.css';

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const customValueRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label }) => " ✔️ " + label)
    : "All Countries";
};

export default function SearchSelectFilter({ countries, selected, onChange }: { countries: string[], selected: Option[], onChange: Function}) {
  //const [selected, setSelected] = useState([]);

  const options = countries.map(c => ({ label: c, value: c }));

  console.log('**countries', countries, options);

  return (
    <div className={styles.chooser}>
      <MultiSelect
        valueRenderer={customValueRenderer}
        options={options}
        value={selected}
        onChange={onChange}
        labelledBy="Select countries"
        disableSearch={true}
        hasSelectAll={false}
      />
    </div>
  )
}
