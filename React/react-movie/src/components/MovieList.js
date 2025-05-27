import { useState } from 'react';
import styles from './MovieList.module.css';
import { useEffect } from 'react';

const MovieList = () => {
  const [list,setList] = useState([]);
  const [sch,setSch] = useState("");

  const searchText = (e) => {
    const search = e.target.value;
    setSch(search);
  }

  const getDate = async() => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=cba95d401a14ab806ffc13a5052aab89&query=${sch}`;
    const res = await fetch(url);
    const data = await res.json();
    setList(data.results);
  }

  useEffect (() => {
    getDate();
  }, []);
  
  return (
    <div className={styles.movie}>
      <h1>영화 검색</h1>
      <div className={styles.search_box}>
        <input
          onChange={searchText}
          type="text"
          placeholder="영화 제목을 검색하세요"
        />
        <button onClick={() => {
          getDate(); // state만 변경해주는 방법도 좋음
        }}>
          검색
        </button>
      </div>
      <ul className={styles.list}>
        {
          list.map((v) => {
            return (
              <li key={`${v.original_title}${v.id}`}>
                <img src={`https://image.tmdb.org/t/p/w185/${v.poster_path}`} />
                <h2>{v.original_title}</h2>
                <p>평점: {v.vote_average} / 10</p>
                <p>개봉일: {v.release_date}</p>
                <p>{v.overview}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default MovieList;
    
{/* <li>
<img src={`https://image.tmdb.org/t/p/w185/qYczuua2tgjfxcdtLNDC0n4mOHz.jpg`}
/>
<h2>서울의 봄</h2>
<p>평점: 7.428</p>
<p>개봉일: 2023-11-22</p>
<p>After the assassination of President Park, martial law has been declared.</p>
</li> */}