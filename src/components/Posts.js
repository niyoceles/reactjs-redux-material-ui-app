import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../utils/MyButton';
//MUI Styles
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions';

const styles = {
  card: {
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
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.post.postId)
    )
      return true;
    else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };

  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };
  render() {
    console.log('liked', this.likedPost());
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount
      },
      user: { authenticated }
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip='Like'>
        <Link to='./login'>
          <FavoriteBorder color='primary' />
        </Link>
      </MyButton>
    ) : this.likedPost() ? (
      <MyButton tip='Undo like' onClick={this.unlikePost}>
        <FavoriteIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='like' onClick={this.likePost}>
        <FavoriteBorder color='primary' />
      </MyButton>
    );

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
            to={`/user/${userHandle}`}
            color='primary'
            className={classes.image}
          >
            {userHandle}
          </Typography>
          <Typography variant='body2'>{dayjs(createAt).fromNow()}</Typography>
          <Typography variant='body1'>{body}</Typography>
          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip='comments' />
          <ChatIcon color='primary' />
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Posts.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToProps = {
  likePost,
  unlikePost
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Posts));
