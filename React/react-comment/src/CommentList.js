import Comment from "./Comment";
const comments = [
    {name: "흰둥이", comment: "하이~"},
    {name: "빙빙이", comment: "하이이~"},
    {name: "바둑이", comment: "해해ㅐ해햏위~"},
    {name: "말랑이", comment: "해~위~"},
    {name: "콩떡이", comment: "해위~"}
];

function CommentList(props) {
    
    return(
        <div>
            {
            comments.map((v, i) => {
                return(
                    <Comment key={i} name1={v.name} comment1={v.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;