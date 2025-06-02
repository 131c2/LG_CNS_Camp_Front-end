import styles from './TodoTemplate.module.css';

const TodoTemplate = () => {
    console.log('TodoTemplate 생성');

    return(
        <div className={styles.TodoTemplate}>
            <div className={styles.title}>일정 관리</div>
        </div>
    );
}

export default TodoTemplate;