import React, { useContext, useEffect, useState } from 'react';
import "./post.css"
import MoreVert from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
const Post = ({post}) => {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // useEffect(() => {
  //   setIsLiked(post.likes.includes(currentUser._id));
  //   console.log("likers",post.likes)
  // }, [currentUser._id, post.likes]);

  useEffect(()=> {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  },[post.userId])
  const likeHandler =()=>{
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked((pevisLiked)=>!pevisLiked);
  }
    return (
        <div className="post">

             <div className="postWrapper">

             <div className="postTop">

             <div className="postTopLeft">
             <Link to={`/profile/${user.username}`}>
             <img
              className="postProfileImg"
              src={
                user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
            }
              alt=""
            />
            </Link>
             <span className="postUsername">  {user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
            </div>

            <div className="postTopRight">
            <MoreVert />
            </div>

            </div>
             

             <div className="postCenter">
             <span className="postText">{post?.desc}</span>
             <img className="postImg" src={PF+post.img} alt="" />
             </div>

             <div className="postBottom">

             <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>

          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>

             </div>
            
             </div>
        </div>
    )
}
export default Post;