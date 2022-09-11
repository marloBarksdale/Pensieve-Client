import { Favorite, MoreVert, Share } from '@mui/icons-material';
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
import { useNavigate } from 'react-router-dom';
const Post = ({ title, author, _id, image, text }) => {
  const navigate = useNavigate();

  const openPost = () => {
    navigate(`/posts/${_id}`);
  };

  const cardTitle = (
    <>
      <Typography>{title}</Typography>
      <Typography> {author.first_name + ' ' + author.last_name}</Typography>
    </>
  );

  return (
    <Card elevation={24}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe'>
            {' '}
            {author.first_name.substring(0, 1) +
              ' ' +
              author.last_name.substring(0, 1)}{' '}
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
        <IconButton aria-label='add to favorites'>
          <Favorite />
        </IconButton>

        <IconButton aria-label='share'>
          <Share />
        </IconButton>
        <Button variant='contained' onClick={openPost}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
