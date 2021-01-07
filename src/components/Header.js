import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';

import { toolbarMenus } from '../constants';
import { Link, ToolbarMenu } from './';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.appBar.main,
    color: theme.palette.appBar.contrastText,
    height: theme.spacing(9),
    paddingTop: theme.spacing(0.5),
    boxShadow: '0 0 6px 0 rgba(140,140,141,.5)'
  },
  toolbar: {
    width: '90%',
    height: '100%',
    padding: theme.spacing(0),
    margin: theme.spacing(0, 'auto')
  },
  tryButton: {
    border: '2px solid #5961ff',
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
    fontWeight: '700',
    padding: theme.spacing(1, 3.5),
    borderRadius: '6px',
    '&:hover, &:active': {
      border: '2px solid #5961ff'
    }
  },
  redisLogo: {
    height: '40px',
    marginRight: theme.spacing(3)
  },
  menuCategories: {
    height: '100%'
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <MuiLink color="inherit" target="_blank" href="https://redislabs.com/">
          <img src="/logo-redis.svg" alt="logo-redis" className={classes.redisLogo} />
        </MuiLink>
        <Grid container className={classes.menuCategories}>
          {toolbarMenus.map(({ menuTitle, menuCategories }) => (
            <ToolbarMenu key={menuTitle} menuTitle={menuTitle} menuCategories={menuCategories} />
          ))}
        </Grid>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          className={classes.tryButton}
          component={Link}
          naked
          target="_blank"
          href="https://redislabs.com/try-free/">
          Try Free
        </Button>
      </Toolbar>
    </AppBar>
  );
}
