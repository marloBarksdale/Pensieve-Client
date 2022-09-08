import { CircularProgress } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../api';

const PostDetail = () => {
  const { id } = useParams();

  const { data: post, isLoading } = useGetPostQuery(id);

  if (!post && !isLoading) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <h2>{post.title}</h2>
      <section>
        <article className='post'>
          <div></div>

          <p className='post-content'>{post.content}</p>
        </article>

        <Link to={`/editPost/${post._id}`} className='button'>
          Edit Post
        </Link>
      </section>
    </>
  );
};

export default PostDetail;
