import { useState } from 'react';
import NewsItem from './NewsItem';
import styles from './NewsList.module.css';

const NewsList = (props) => {
  return (

    <div>
      {
        props.articles ?
          props.articles.map((v, i) => {
            return (
              <div className={styles.block} key={i}>
                <NewsItem
                  title={v.title}
                  img={v.urlToImage}
                  link={v.url}
                  descrip={v.description}
                />
              </div>
            );
          }) :
          <p>뉴스 데이터가 없음</p>

      }
    </div>

  )
};

export default NewsList;
