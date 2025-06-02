import TodoListItem from "./TodoListItem";

const TodoList = ({todos, onRemove, onToggle}) => {
    console.log('TodoList 생성');

    return(
        <div>
            {
                todos.map(
                    todo =>
                        <TodoListItem todo={todo} key={todo.id}
                    onRemove1={onRemove} onToggle1={onToggle}
                        />
                )
            }
        </div>
    )
}

export default TodoList;