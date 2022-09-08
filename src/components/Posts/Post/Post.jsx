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
const Post = ({ title, author, _id }) => {
  const navigate = useNavigate();

  const openPost = () => {
    navigate(`/posts/${_id}`);
  };

  const cardTitle = (
    <>
      {' '}
      <Typography>{title}</Typography>
      <Typography> {author.first_name + ' ' + author.last_name}</Typography>
    </>
  );

  return (
    <Card elevation={24}>
      <CardHeader
        avatar={<Avatar aria-label='recipe'>R</Avatar>}
        action={
          <IconButton aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
        title={cardTitle}
        subheader='September 14, 2016'
      />
      <CardMedia
        component='img'
        sx={{ maxHeight: '512px' }}
        title='Paella dish'
        image='https://i.redd.it/5hv4l3032bc01.jpg'
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
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
