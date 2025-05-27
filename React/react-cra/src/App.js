import logo from './logo.svg';
import './App.css';
import styles from './App.module.css'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from './Header';
import Nav from './Nav';
import Nav2 from './Nav2';
import { useEffect, useState } from 'react';

function BasicExample() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

function Avatar(props) {
  return (
    <img className="avatar"
      src={props.author.avatarUrl}
      alt={props.author.name}
    />
  );
}

function Comment(props) {
  return (
    <div className="comment">
      <div className="user-info">
        <Avatar author={props.author}></Avatar>
        <div className="user-info-name">
          {props.author.name}
        </div>
      </div>
      <div className="comment-text" style={{
        "font-size" : "2rem",
        "background-Color":"yellow"
      }}>
        {props.text}
      </div>
      {/* <div className="comment-date date"> */}
      <div className={styles.date}>
        {props.date}
      </div>
    </div>
  )
}


function App() {
  const [list, setList] = useState([
    'HTML', 'CSS', 'JavaScript'])
  

  const [toc, setToc] = useState([]);
    
  const getData = async () => {
    const url = 'http://ggoreb.com/api/toc.jsp';
    const res = await fetch(url);
    const data = await res.json();
    setToc(data);
    
  };
  useEffect(() => {
    getData();
  }, []);
  

  const [hide, setHide] = useState(false);
  return (
    <div className="App">
      {
        toc.map((v) => {
          return <h3>{v.title}</h3>
        })
      }

      <button onClick={() => {
        setHide(!hide); //true 와 false 를 왕복
        // setHide(true);
      }}>숨기기</button>
      {
        hide ? null :
        <Header title='WEB'
                desc='World Wide Web!'></Header>}
      <Nav2 list={list}></Nav2>
      {/* <Nav2 list2={list2}></Nav2> */}
      {/* <Nav link1="1.html" link2="2.html" text1="HTML" text2="CSS"></Nav> */}
      {/* <Comment author={{
          'avatarUrl': 'A',
          'name': 'B'
        }} text="설명~" date="2025-04-01"></Comment> */}
      {/* 상위 컴포넌트
      <Header title="WEB" desc='World Wide Web!'></Header>
      하위 컴포넌트
      <Nav link1="1.html" link2="2.html" text1="HTML" text2="CSS"></Nav> */}
    </div>
  );
}

export default App;


