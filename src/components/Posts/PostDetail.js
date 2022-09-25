import {
  CommentSharp,
  DeleteForever,
  Edit,
  Favorite,
  MoreVert,
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
  ListItemIcon,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { usePopupState } from 'material-ui-popup-state/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  useDeletePostMutation,
  useGetCommentsQuery,
  useGetPostQuery,
  useLikePost2Mutation,
  useLikePostMutation,
} from '../../api';
import { setOpenModal } from '../../features/posts/postsSlice';
import { selectUser } from '../../features/users/userSlice';
import MenuPopupState from '../MenuPopupState';
import EditPost from './EditPost';

const PostDetail = () => {
  const { id } = useParams();
  const popupState = usePopupState({ variant: 'popper' });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [skip, setSkip] = useState(false); //Set skip to true to avoid query when post is deleted
  const { data: post, isLoading, isFetching } = useGetPostQuery(id, { skip });
  const {
    data: comments,
    isLoading: loadingComments,
    isFetching: fetchingComments,
  } = useGetCommentsQuery(id, { skip });
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePost2Mutation();
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

  const handleDelete = async () => {
    setSkip(true);
    await deletePost(id);
    popupState.close();
    navigate('/');
  };
  const handleLike = async () => {
    try {
      await likePost({ userId: user._id, postId: post._id });
    } catch (error) {}
  };
  const handleEdit = () => {
    dispatch(setOpenModal(true));
    popupState.close();
  };

  const menuItems = [
    <MenuItem onClick={handleEdit} key='212'>
      <ListItemIcon>
        <Edit />
      </ListItemIcon>
      Edit
    </MenuItem>,
    <MenuItem onClick={handleDelete} key='ewrere'>
      <ListItemIcon>
        <DeleteForever />
      </ListItemIcon>
      Delete
    </MenuItem>,
  ];
  if (comments) {
    console.log(comments);
  }
  return (
    <Stack direction={'column'} flex={4} position={'relative'}>
      {isFetching && (
        <Box
          width='100%'
          flex={4}
          display={'flex'}
          justifyContent='center'
          position={'absolute'}
          top={'calc(50% - 12px)'}
          zIndex={5}
        >
          {' '}
          <CircularProgress />
        </Box>
      )}
      <Box flex={4} ml={1} mr={1} className={isFetching ? 'disabled' : ''}>
        <Card elevation={12}>
          <CardHeader
            title={<Typography variant='h6'>{post.title}</Typography>}
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
                subheader={
                  <Typography variant='overline'>3 hrs ago</Typography>
                }
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
                  onClick={handleLike}
                  sx={{ display: 'flex', gap: '5px' }}
                  aria-label='add to favorites'
                >
                  <Favorite
                    color={post.likes.includes(user._id) ? 'error' : ''}
                  />{' '}
                  <Typography variant='overline'>
                    {post?.likes?.length > 0 && post.likes.length}
                  </Typography>
                </IconButton>{' '}
                <IconButton
                  sx={{ display: 'flex', gap: '5px' }}
                  aria-label='add to favorites'
                >
                  <CommentSharp />
                  <Typography variant='overline'>
                    {comments?.length > 0 && comments.length}
                  </Typography>
                </IconButton>
              </CardActions>
            </Stack>
            {user._id === post.author._id && (
              <MenuPopupState
                menuItems={menuItems}
                popupState={popupState}
                Icon={<MoreVert />}
              />
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
    </Stack>
  );
};

export default PostDetail;

{
  /* <Box
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
            </Box> */
}
