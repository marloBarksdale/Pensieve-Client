import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../api';
import { setOpenModal } from '../../features/posts/postsSlice';
import StyledModal from '../StyledModal';
import EditPost from './EditPost';

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const { data: post, isLoading } = useGetPostQuery(id);

  useEffect(() => {
    dispatch(setOpenModal(false));
  }, [location, dispatch]);

  if (!post && !isLoading) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  if (isLoading) {
    return (
      <Box width='100%' display={'flex'} justifyContent='center'>
        {' '}
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <h2>{post.title}</h2>
      <section>
        <article className='post'>
          <div></div>

          <p className='post-content'>{post.content}</p>
        </article>

        <Button
          onClick={() => {
            dispatch(setOpenModal(true));
          }}
        >
          Edit Post
        </Button>
      </section>

      <EditPost {...post} />
    </>
  );
};

export default PostDetail;
