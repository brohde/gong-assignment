import styles from './SearchInputFilter.module.css';

export default function SearchInputFilter() {
  return (
    <form className={styles.form}>
      <input type="text" value="Search" className={styles.input} />
    </form>
  )
}
