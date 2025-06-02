import logo from './logo.svg';
import './App.css';
import { use, useEffect, useState } from 'react';
import BoardList from './components/BoardList';
import PostWrite from './components/PostWrite';
import PostView from './components/PostView';

function App() {
  //게시글 상태
  const [posts, setPosts] = useState([]);
  //현재 보고 있는 페이지 상태 (List, view, write, edit)
  const [currentPage, setCurrentPage] = useState('list');
  //현재 선택된 게시글 ID
  const [selectedPostId, setSelectedPostId] = useState(null);

  //초기 게시글 데이터 (백연결하면 api로 값 받을 수 있음)
  useEffect(() => {
    const initalPosts = [
      { id: 1, title: '첫 게시물', content: '주저리주저리', author: '관리자', date: '2025-04-27', views: 4 },
      { id: 2, title: '두번째 게시물', content: '주저리주저리', author: '관리자', date: '2025-04-27', views: 5 }
    ];
    setPosts(initalPosts);
  }, []);

  //게시글 추가
  const addPost = (newPost) => {
    const post = {
      id: posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      ...newPost //사용자가 입력한 게시글 정보 (제목, 내용, 작성자 등등)
    };
    
    console.log("추가 게시글 확인 : ", post)
    //새 게시글을 기존 목록에 추가
    setPosts(prevPosts => {
      const updatedPosts = [...prevPosts, post];
      console.log("업데이트 후 게시글 목록 :", updatedPosts);
      return updatedPosts;
      
    });

    setTimeout(() => {
      setCurrentPage('list');
      console.log("목록 페이지로 전환");
      
    },0);


    // setCurrentPage('list'); // 목록 페이지로 이동
  };

  //게시글 수정
  const updatePost = (updatedPost) => {
    setPosts(posts.map(post =>
      post.id === updatedPost.id ? updatedPost : post
    ));
    setCurrentPage('view');
  };

  //게시글 삭제
  const deletePost = (postId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setPosts(posts.filter(post => post.id !== postId));
      setCurrentPage('list');
    }
  };

  // 게세글 조회수 증가 
  const increaseViews = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, views: post.views + 1 } : post
    ));
  };

  //현재 선택된 게시글 가져오기
  const getSelectedPost = () => {
    return posts.find(post => post.id === selectedPostId);
  };

  //페이지 랜더링
  const renderPage = () => {
    switch (currentPage) {
      case 'list':
        console.log("목록 페이지 렌더링, 게시글 수:", posts.length);
        return (
          <BoardList
            posts={posts}
            onView={(postId) => {
              setSelectedPostId(postId);
              increaseViews(postId);
              setCurrentPage('view');
            }}
            onWrite={() => setCurrentPage('write')}
          />
        );

      case 'view':
        return (
          <PostView
            post={getSelectedPost()}
            onEdit={() => setCurrentPage('edit')}
            onDelete={() => deletePost(selectedPostId)}
            onBack={() => setCurrentPage('list')}
          />
        );

      case 'write':
        return (
          <PostWrite
            onSave={addPost}
            onCancel={() => setCurrentPage('list')}
          />
        );

      case 'edit':
        return(
          <PostWrite 
            post = {getSelectedPost()}
            onSave = {updatePost}
            onCancel = {() => setCurrentPage('view')}
          />
        );

      default:
        return <div>잘못된 페이지입니다.</div>;
    }
  }

  useEffect(() => {
    console.log("현재 게시글 목록 : ", posts);
    
  }, [posts]);


  return (
    <div className='App'>
      <header className='App-header'>
        <h1>게시판 만들어보기</h1>
      </header>
      <main className='App-main'>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
