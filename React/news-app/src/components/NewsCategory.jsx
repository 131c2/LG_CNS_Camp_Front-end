import { NavLink } from 'react-router-dom';
import styles from './NewsCategory.module.css';

const categories = [
    { id: 'all', name: 'all', text: '전체보기'},
    { id: 'associated-press', name: 'associated-press', text: 'Associated Press'},
    { id: 'abc-news', name: 'abc-news', text: 'ABC News'},
    { id: 'the-washington-post', name: 'the-washington-post', text: 'Washington Post'},
    { id: 'politico', name: 'politico', text: 'Politico'},
    { id: 'ars-technica', name: 'ars-technica', text: 'Ars Technica'},
    { id: 'null', name: 'null', text: 'Others'},
]

function Categories() {
    return(
        <div className={styles.container}>
            {categories.map((v) => {
                return(
                <NavLink key={v.name} 
                to={v.name === 'all' ? '/' : `/${v.name}`}
                className={styles.category}
                >
                    {v.text}
                </NavLink>
                );
            })}
        </div>
    )
}

export default Categories;