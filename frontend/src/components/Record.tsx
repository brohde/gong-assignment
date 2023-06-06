import styles from './Record.module.css';
import { Person } from '@/types';

export default function Record({ data }: { data: Person }) {
  return (
    <article className={styles.record}>
      <p>{data.last_name}, {data.first_name}</p>
      <p>{data.email}</p>
      <p>{data.country}</p>
    </article>
  )  
}
