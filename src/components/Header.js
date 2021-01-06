import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
  toolbarMenus: {
    display: 'flex',
    flexGrow: 1
  },
  tryButton: {
    border: '2px solid #5961ff',
    textTransform: 'capitalize',
    fontWeight: '700',
    padding: theme.spacing(1, 2.5),
    borderRadius: '6px',
    '&:hover, &:active': {
      border: '2px solid #5961ff'
    }
  },
  redisLogo: {
    height: '40px',
    marginRight: theme.spacing(3)
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
        <Box className={classes.toolbarMenus}>
          {toolbarMenus.map(({ menuTitle, menuCategories }) => (
            <ToolbarMenu key={menuTitle} menuTitle={menuTitle} menuCategories={menuCategories} />
          ))}
        </Box>
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
