import { MultiSelect, Option } from 'react-multi-select-component'
import styles from './SearchSelectFilter.module.css'

const customValueRenderer = (selected: Option[], _options: Option[]) => {
  return selected.length
    ? selected.map(({ label }: { label: string }) => " ✔️ " + label)
    : "All Countries"
};

export default function SearchSelectFilter({ countries, selected, onChange }: { countries: string[], selected: Option[], onChange: Function}) {
  const options = countries.map(c => ({ label: c, value: c }))

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
