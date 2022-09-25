import { CommentSharp, Favorite, MoreVert, Share } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLikePostMutation } from '../../../api';
import { selectUser } from '../../../features/users/userSlice';
const Post = ({ title, author, _id, image, text, likes, comments }) => {
  const navigate = useNavigate();
  const [likePost] = useLikePostMutation();
  const user = useSelector((state) => selectUser(state));

  const openPost = () => {
    navigate(`/posts/${_id}`);
  };

  const handleLike = async () => {
    await likePost({ postId: _id, userId: user._id });
  };
  const cardTitle = (
    <>
      <Typography fontWeight={700}>{title}</Typography>
      <Typography fontWeight={300} variant='body1'>
        {' '}
        {author.first_name + ' ' + author.last_name}
      </Typography>
    </>
  );

  return (
    <Card elevation={24}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' src={author.avatar?.imageUrl}>
            {/* {' '}
            {author.first_name.substring(0, 1) +
              ' ' +
              author.last_name.substring(0, 1)}{' '} */}
          </Avatar>
        }
        title={cardTitle}
        subheader='September 14, 2016'
      />
      {image && (
        <CardMedia
          component='img'
          sx={{ maxHeight: '512px' }}
          title='Paella dish'
          image={image.imageUrl}
        />
      )}
      {text && (
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {text}
          </Typography>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <IconButton
          sx={{ display: 'flex', gap: '5px', alignItems: 'flex-start' }}
          aria-label='add to favorites'
          onClick={handleLike}
        >
          <Favorite color={likes.includes(user._id) ? 'error' : ''} />{' '}
          <Typography variant='overline'>{likes.length}</Typography>
        </IconButton>{' '}
        <IconButton
          sx={{ display: 'flex', gap: '5px' }}
          aria-label='add to favorites'
        >
          <CommentSharp />
          <Typography variant='overline'>{comments || ''}</Typography>
        </IconButton>
        <Button variant='contained' onClick={openPost}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
