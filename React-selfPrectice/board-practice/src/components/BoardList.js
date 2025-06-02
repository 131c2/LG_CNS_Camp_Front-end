import './BoardListModule.css';
import './ButtonModule.css';


function BoardList({ posts, onView, onWrite }) {
    console.log("BoardList 렌더링 됨, 게시글 :", posts);
    
    return (
        <div className='board-list'>
            <h2>게시글 목록</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <tr key={post.id} onClick={() => onView(post.id)}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.author}</td>
                                <td>{post.date}</td>
                                <td>{post.views}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">
                                게시글이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="button-container">
                <button onClick={onWrite}>글 작성하기</button>
            </div>
        </div>
    );
}

export default BoardList;