import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: '30px auto',
    width: 550
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

export default function SearchBar({ ...rest }) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root} {...rest}>
      <InputBase
        className={classes.input}
        placeholder="Search for a code sample"
        inputProps={{ 'aria-label': 'search for a code sample' }}
      />
      <IconButton type="button" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
