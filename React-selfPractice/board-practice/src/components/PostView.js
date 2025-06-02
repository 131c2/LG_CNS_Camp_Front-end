import './PostViewModule.css';
import './ButtonModule.css';

function PostView({post, onEdit, onDelete, onBack}) {
    if(!post) return <div>게시글을 찾을 수 없습니다.</div>;

    return (
        <div className='post-view'>
            <h2>{post.title}</h2>
            <div className='post-info'>
                <span>작성자: {post.author} </span>
                <span>작성일: {post.date} </span>
                <span>조회수: {post.views} </span>
            </div>
            <div className='post-content'>
                {post.content}
            </div>
            <div className="button-container">
                <button onClick={onBack}>목록</button>
                <button onClick={onEdit}>수정</button>
                <button onClick={onDelete}>삭제</button>
            </div>
        </div>
    )
}

export default PostView;