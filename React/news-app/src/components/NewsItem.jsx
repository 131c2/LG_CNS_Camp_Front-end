import styles from './NewsItem.module.css';

const NewsItem = (props) => {

  const { img , link , descrip , title} = props;
  return (
    <div className={styles.block}>
      <div className={styles.thumbnail}>
        <a href={link} target="_blank">
          <img src={img} 
               alt="thumbnail" />
        </a>
      </div>
      <div className={styles.contents}>
        <h2>
          <a href={link} target="_blank">{title}</a>
        </h2>
        <p>{descrip || '내용'}</p>
      </div>
    </div>
  );
};

export default NewsItem;
