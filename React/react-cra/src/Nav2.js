import { useState } from "react";

function Nav2(props) {
    console.log('nav');

    const [list, setList] = useState(props.list);
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [content, setContent] = useState("");

    return (
        <div>
            <button onClick={() => {
                const data = Math.random();
                list.push(data);

                const list2 = [...list];
                setList(list2);
            }}>추가</button>
            <ul>
                {
                    list.map((v, i) => {
                        return (<li key={i}>
                            <a href="">{v}</a>

                            <button onClick={() => {
                                console.log(i);
                                list.splice(i, 1);
                                const list2 = [...list];
                                setList(list2);
                                setIndex(i);
                            }}>삭제</button>

                            <button onClick={() => {
                                // setShow(!show);
                                setShow(true);
                                setIndex(i);
                                setContent(list[i]);
                            }}>수정</button>
                        </li>)
                    })
                }
            </ul>
            {
                show == true ?
                    <div>
                        <input value={content} onChange={(e) => {
                            setContent(e.target.value);
                        }} onKeyDown={(e) => {
                            // console.dir(e.key);
                            // console.log(e);
                            if (e.key == 'Enter') {
                                list[index] = content; //list의 index번째
                                const list2 = [...list];
                                setList(list2);
                                setContent("");
                                setShow(false);
                            }
                        }}>
                        </input>
                        <button onClick={() => {
                            list[index] = content; //list의 index번째
                            const list2 = [...list];
                            setList(list2);
                            
                            setContent("");
                            setShow(false);
                        }}>완료</button>
                    </div>
                    : null
            }

        </div>
    )
}

export default Nav2;



// const [reload, setReload] = useState();
// const [count, setCount] = useState();

{/* <button onClick={() => {
                const count2 = count + 1;
                console.log(count);

                setCount(count2);

                setReload(reload + 1);
            }}>증가 {count} </button> */}