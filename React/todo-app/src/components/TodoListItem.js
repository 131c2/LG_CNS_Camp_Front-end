import { MdCheckBoxOutlineBlank, MdRemoveCircleOutline, MdCheckBox } from 'react-icons/md';
import styles from './TodoListItem.module.css';
import React from 'react';

const TodoListItem = (props) => {
  console.log('TodoListItem 생성');
  
  const { id, text, checked } = props.todo;
  return (
    <div className={styles.TodoListItem}>

      <div className={checked ? `${styles.checkbox} ${styles.checked}` : styles.checkbox}
           onClick={() => props.onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />
      }
        <div className={styles.text}>{text}</div>
      </div>

      <div className={styles.remove} onClick={() => {
        props.onRemove(id);
      }}>
        <MdRemoveCircleOutline></MdRemoveCircleOutline>
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);