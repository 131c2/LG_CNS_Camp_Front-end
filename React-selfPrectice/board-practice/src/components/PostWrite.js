import './PostWriteModule.css';
import './ButtonModule.css';
import { use, useEffect, useState } from "react";

function PostWrite ({post, onSave, onCancel }) {
    const[title, setTitle] = useState('');
    const[content,setContent] = useState('');
    const[author, setAuther] = useState('');

    //수정 - 기존 게시글 데이터 로드
    useEffect(() =>{
        if(post) {
            setTitle(post.title);
            setContent(post.content);
            setAuther(post.author);
        }
    },[post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim() || !content.trim() || !author.trim()){
            alert('모든 필드를 입력해 주세요.')
            return;
        }
        const postData = {
            title,
            content,
            author
        };
        if(post){
            //수정
            onSave({...post, ...postData});
        } else {
            //새 글 작성
            onSave(postData);
        }
    };

    return(
        <div className='post-write'>
            <h2> {post ? '게시글 수정' : '새 게시글 작성'} </h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        required
                    ></input>
                </div>
                <div className='form-group'>
                    <label htmlFor="author">글쓴이</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={e => setAuther(e.target.value)}
                        placeholder="작성자를 입력하세요"
                        required
                    ></input>
                </div>
                <div className='form-group'>
                    <label htmlFor="content">내용</label>
                    <textarea
                        type="text"
                        id="content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="ㄴㅐ용을 입력하세요"
                        rows="10"
                        required
                    ></textarea>
                </div>
                <div className="button-container">
                    <button type="submit">저장</button>
                    <button type="button" onClick={onCancel}>취소</button>
                </div>

            </form>
        </div>
    )


    
}

export default PostWrite;
