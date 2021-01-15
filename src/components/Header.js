import { AppBar, Box, Button, Grid, Link as MuiLink, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
    display: 'flex',
    justifyContent: 'space-between',
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
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <MuiLink color="inherit" target="_blank" href="https://redislabs.com/">
          <img src="/logo-redis.svg" alt="logo-redis" className={classes.redisLogo} />
        </MuiLink>
        <Box display={{ xs: 'none', sm: 'none', md: 'block' }} width={1}>
          <Grid container className={classes.menuCategories}>
            {toolbarMenus.map(({ menuTitle, menuCategories }) => (
              <ToolbarMenu key={menuTitle} menuTitle={menuTitle} menuCategories={menuCategories} />
            ))}
          </Grid>
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
