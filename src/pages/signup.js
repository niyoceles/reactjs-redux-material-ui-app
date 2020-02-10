import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppIcon from '../images/logo.png';
import axios from 'axios';

//Mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  ...theme.spreadThis
});

const sexes = [
  {
    value: 'Male',
    label: 'Male'
  },
  {
    value: 'Female',
    label: 'Female'
  }
];

class signup extends Component {
  state = {
    email: '',
    sex: '',
    password: '',
    passwordConfirm: '',
    handle: '',
    loading: false,
    errors: {}
  };

  handleSignUp = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      sex: this.state.sex,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      handle: this.state.handle
    };
    axios
      .post('/signup', newUserData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('fBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const { loading, errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt='logo' className={classes.image} />
          <Typography variant='h3' className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSignUp}>
            <Textfield
              id='email'
              name='email'
              type='email'
              label='Email'
              variant='outlined'
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <Textfield
              id='sex'
              label='Sex'
              name='sex'
              variant='outlined'
              className={classes.textField}
              helperText={errors.sex}
              error={errors.sex ? true : false}
              value={this.sexes}
              onChange={this.handleChange}
              select
              SelectProps={{
                native: true
              }}
              fullWidth
            >
              <option value=''> </option>
              {sexes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Textfield>
            <Textfield
              id='password'
              name='password'
              type='password'
              label='Password'
              variant='outlined'
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <Textfield
              id='passwordConfirm'
              name='passwordConfirm'
              type='password'
              label='Confirm password'
              variant='outlined'
              className={classes.textField}
              helperText={errors.passwordConfirm}
              error={errors.passwordConfirm ? true : false}
              value={this.state.passwordConfirm}
              onChange={this.handleChange}
              fullWidth
            />
            <Textfield
              id='handle'
              name='handle'
              type='text'
              label='Handle'
              variant='outlined'
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
            >
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account ? login <Link to='/login'>here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(signup);
