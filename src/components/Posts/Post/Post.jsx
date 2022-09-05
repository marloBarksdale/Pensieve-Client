import React from 'react';
import { ExpandMore, Favorite, MoreVert, Share } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
const Post = ({ title, author }) => {
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
      </CardActions>
    </Card>
  );
};

export default Post;
