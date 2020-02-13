import React, { Component } from 'react';
import MyButton from '../../utils/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Mui staff
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { connect } from 'react-redux';
import { likePost, unLikePost } from '../../redux/actions';

export class LikeButton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.postId === this.props.postId)
    )
      return true;
    else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.postId);
  };

  unlikePost = () => {
    this.props.unLikePost(this.props.postId);
  };

  render() {
    const {
      user: { authenticated }
    } = this.props;

    const likeButton = !authenticated ? (
      <Link to='./login'>
        <MyButton tip='Like'>
          <FavoriteBorder color='primary' />
        </MyButton>
      </Link>
    ) : this.likedPost() ? (
      <MyButton tip='Undo like' onClick={this.unlikePost}>
        <FavoriteIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='like' onClick={this.likePost}>
        <FavoriteBorder color='primary' />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  likePost: PropTypes.func.isRequired,
  unLikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToProps = {
  likePost,
  unLikePost
};

export default connect(mapStateToProps, mapActionToProps)(LikeButton);
