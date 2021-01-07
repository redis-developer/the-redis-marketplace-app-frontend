import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '550px',
    margin: theme.spacing(4, 'auto'),
    padding: theme.spacing(0.25, 0.5)
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing(1)
  },
  iconButton: {
    padding: theme.spacing(1.5)
  }
}));

export default function SearchBar() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
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
