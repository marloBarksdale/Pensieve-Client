import {
  CommentBank,
  CommentSharp,
  DeleteForever,
  Edit,
  Favorite,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDeletePostMutation, useGetPostQuery } from '../../api';
import { setOpenModal } from '../../features/posts/postsSlice';
import { selectUser } from '../../features/users/userSlice';
import StyledModal from '../StyledModal';
import EditPost from './EditPost';

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [skip, setSkip] = useState(false);
  const { data: post, isLoading } = useGetPostQuery(id, { skip });
  const [deletePost, {}] = useDeletePostMutation();
  const user = useSelector((state) => selectUser(state));
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
      <Box width='100%' flex={4} display={'flex'} justifyContent='center'>
        {' '}
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box flex={4} ml={1} mr={1}>
      <Card elevation={12}>
        <CardHeader
          subheader
          title={<Typography variant='h4'>{post.title}</Typography>}
        ></CardHeader>

        {post.image && (
          <CardMedia component='img' image={post?.image?.imageUrl} />
        )}
        <Box
          display={'flex'}
          justifyContent='space-between'
          alignItems={'center'}
        >
          <Stack>
            <CardHeader
              sx={{ paddingBottom: '0' }}
              title={
                <Typography variant='body1' fontWeight={'700'}>
                  {post.author.first_name + ' ' + post.author.last_name}
                </Typography>
              }
              subheader={<Typography variant='overline'>3 hrs ago</Typography>}
              avatar={
                <Avatar>
                  {post.author.first_name.substring(0, 1) +
                    ' ' +
                    post.author.last_name.substring(0, 1)}
                </Avatar>
              }
            />
            <CardActions disableSpacing sx={{ paddingTop: '0' }}>
              <IconButton
                sx={{ display: 'flex', gap: '5px' }}
                aria-label='add to favorites'
              >
                <Favorite /> <Typography variant='overline'>6</Typography>
              </IconButton>{' '}
              <IconButton
                sx={{ display: 'flex', gap: '5px' }}
                aria-label='add to favorites'
              >
                <CommentSharp />
                <Typography variant='overline'>2</Typography>
              </IconButton>
            </CardActions>
          </Stack>
          {user._id === post.author._id && (
            <Box
              padding={2}
              display={'flex'}
              gap={2}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <Button
                variant='contained'
                endIcon={<Edit />}
                onClick={() => {
                  dispatch(setOpenModal(true));
                }}
              >
                Edit Post
              </Button>
              <Button
                color='error'
                variant='outlined'
                endIcon={<DeleteForever />}
                onClick={async () => {
                  setSkip(true);
                  await deletePost(id);

                  navigate('/');
                }}
              >
                Delete
              </Button>{' '}
            </Box>
          )}
        </Box>
      </Card>

      <section>
        <article className='post'>
          <div></div>

          <p className='post-content'>{post.content}</p>
        </article>
      </section>

      <EditPost {...post} />
    </Box>
  );
};

export default PostDetail;
