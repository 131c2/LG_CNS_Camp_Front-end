import { useParams } from 'react-router';
import NewsList from './NewsList';
import { useEffect, useState } from 'react';
import Categories from './NewsCategory';
import styles from './NewsPage.moudule.css';

const NewsPage = () => {
  console.log(useParams());
  const param = useParams();
  const path = param['*'] || 'all';
  console.log(path);

  const [articles,setArticles] = useState([]);

  useEffect(() => {
    async function get() {
      let url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=9f5baf7d9f3f42879a20d7d19d9886e4';

      if (path !== 'all' && path !== 'null') {
        url += `&sources=${path}`;}

      try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.status === 'ok' && data.articles) {
          setArticles(data.articles);
        } else {
          console.error('API 오류:', data.message || '알 수 없는 오류');
        }
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    }
  get();
}, [path]);


  return (
    <>
    <div className={styles.body}>
      <Categories />
      <NewsList articles={articles} />
      </div>
    </>
  );
};

export default NewsPage;
