import { useState } from 'react';
import styles from './App.module.css'

// const [color,setColor] = useState(false);
//클릭했을때 안보여지게도 만들어보기
const handleClick = (e) => {
    
    // setColor(true);
    e.target.style.backgroundColor = 'beige';
    e.target.style.textDecoration = 'underline';
};

function Footer(props) {
    return (
        <footer className={styles.footer}>
            {
                props.footers.map((v, i) => {
                    return(
                        <h5 key={i} onClick={handleClick}>{v}</h5>
                    ) 
                })
            }
        </footer>
    )
}

export default Footer;