import moment from "moment";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import { Avatar, Comment, Tooltip } from "antd";
import React, { createElement, useState } from "react";

import styles from './reviews.module.scss';

function Reviews({ reviewdetail }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [showcmt, setShowcmt] = useState(false);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span className={styles.content} onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span  className={styles.content}>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span className={styles.content} onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className={styles.content}>{dislikes}</span>
      </span>
    </Tooltip>,
    <span className={styles.content} key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <Comment
      actions={actions}
      author={<a className={styles.username}>{reviewdetail.author_details.username}</a>}
      avatar={
        <>
          {reviewdetail.author_details.avatar_path === null ? <Avatar src={`https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png`} alt="Han Solo" /> :
            <>
              {reviewdetail.author_details.avatar_path.slice(0,6) === "/https" ? <Avatar src={`${reviewdetail.author_details.avatar_path.slice(1)}`} alt="Han Solo" /> : 
                  <Avatar src={`https://www.gravatar.com/avatar${reviewdetail.author_details.avatar_path}`} alt="Han Solo" />
              }
            </>
          }
        </>
        
      }
      content={
        <>
          {reviewdetail.content.length > 300 ?
          <>
            {showcmt === false ? 
            <>
              <p className={styles.content}>{`${reviewdetail.content.slice(0,200)} ... `}</p>
              <p onClick={()=> setShowcmt(!showcmt)} className={styles.seemore}>See more</p>  
            </>
            :
            <>
              <p className={styles.content}>{reviewdetail.content}</p>
              <p onClick={()=> setShowcmt(!showcmt)} className={styles.seemore}>Hide</p> 
            </>  
          }
          </> 
           : 
          <>
            <p className={styles.content}>{reviewdetail.content}</p>
          </> 
          }
        </>
      }
      datetime={
        <Tooltip title={moment(reviewdetail.created_at).format("YYYY-MM-DD HH:mm:ss")}>
          <span className={styles.content}>{moment(reviewdetail.created_at).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

export default Reviews;
