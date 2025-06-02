import logo from './logo.svg';
import './App.css';
import { useMemo, useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoList from './components/TodoList';
import TodoListItem from './components/TodoListItem';

function App() {
  //useMemo를 이용해서 리스트 생성, i를1~10 까지 주면서 10개의 리스트 생성
  const create = useMemo(() => {
    const list = [];
    for(let i = 1 ; i <= 10 ; i ++) {
      //초기리스트에는 '리액트 i'라고 출력 되고
      //네 번째 체크박스 마다 체크가 되어있게 조건이 주어져 있음.
      list.push({id : i, text : `리액트 ${i}`, checked : i % 4 ? false : true})
    }
    console.log('리스트 생성');
    return list;
  },[]);
  
  // todos에 create로 초기값 설정. setTodos에 변경사항 받을 수 있음.
  const [todos,setTodos] = useState(create);


  return (
    <TodoTemplate>
      <TodoListItem todos={todos}/>
    </TodoTemplate>
  );
}

export default App;
