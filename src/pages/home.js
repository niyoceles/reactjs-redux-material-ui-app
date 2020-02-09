import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Posts from '../components/Posts';

class home extends Component {
  state = {
    posts: null
  };
  componentDidMount() {
    axios
      .get('/posts')
      .then(res => {
        this.setState({
          posts: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentPosts = this.state.posts ? (
      this.state.posts.map(post => <Posts key={post.postId} post={post} />)
    ) : (
      <p>Loading ....</p>
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          <p>{recentPosts}</p>
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile ...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
