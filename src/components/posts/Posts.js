import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../../utils/MyButton';
import LikeButton from './LikeButton';
//MUI Styles
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Posts extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createAt,
        userImage,
        userName,
        postId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { username }
      }
    } = this.props;

    const deleteButton =
      authenticated && userName === username ? (
        <DeletePost postId={postId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile image'
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/user/${userName}`}
            color='primary'
            className={classes.image}
          >
            {userName}
          </Typography>
          <Typography>{deleteButton}</Typography>
          <Typography variant='body2'>{dayjs(createAt).fromNow()}</Typography>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} likes</span>
          <MyButton tip='comments' />
          <ChatIcon color='primary' />
          <span>{commentCount} comments</span>
          <PostDialog
            postId={postId}
            userName={userName}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Posts.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Posts));
