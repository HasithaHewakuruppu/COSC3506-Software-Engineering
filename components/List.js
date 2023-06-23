import ListItem from './ListItem'
import styles from '../styles/List.module.css'

export default function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <ListItem
          key={item.title} // this is needed for editing and deleting, if you need a unique key
          title={item.title}
          duration={item.duration}
          description={item.description}
          category={item.category}
        />
      ))}
    </ul>
  )
}
