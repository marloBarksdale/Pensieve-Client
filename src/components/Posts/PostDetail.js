import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../api';
// import { PostAuthor } from './PostAuthor';
// import { selectPostById } from './postsSlice';
// import { ReactionButtons } from './ReactionButton';
// import { TimeAgo } from './TimeAgo';

const PostDetail = ({ match }) => {
  const { id } = useParams();

  const { data: post } = useGetPostQuery(id);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className='post'>
        <h2>{post.title}</h2>
        <div></div>

        <p className='post-content'>{post.content}</p>
      </article>

      <Link to={`/editPost/${post.id}`} className='button'>
        Edit Post
      </Link>
    </section>
  );
};

export default PostDetail;
