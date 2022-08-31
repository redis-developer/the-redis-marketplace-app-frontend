import { AppBar, Box, Grid, Link as MuiLink, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import React from 'react';

import { simpleToolbar } from '../constants';

const useStyles = makeStyles(
  (theme) => ({
    appBar: {
      zIndex: 1302,
      background: theme.palette.appBar.main,
      color: theme.palette.appBar.contrastText,
      height: theme.spacing(9),
      paddingTop: theme.spacing(0.5),
      boxShadow: '0 0 0'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '90%',
      height: '100%',
      padding: theme.spacing(0),
      margin: theme.spacing(0, 'auto')
    },
    redisLogo: {
      marginRight: theme.spacing(3)
    },
    menuCategories: {
      height: '100%'
    },

    menuItem: {
      padding: theme.spacing(1)
    }
  }),
  {
    name: 'MuiHeaderStyles'
  }
);

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <MuiLink color="inherit" target="_blank" href="https://redis.com/">
          <img
            width={120}
            height={40}
            src="/logo-redis-reversed.svg"
            alt="logo-redis"
            className={classes.redisLogo}
          />
        </MuiLink>

        <Box display={{ xs: 'none', sm: 'block', md: 'block' }} className="containerBox" width={1}>
          <Grid justifyContent="flex-end" container className={classes.menuContainer}>
            {simpleToolbar.map(({ label, link }) => (
              <Grid key={label} className={classes.gridItem} item>
                <MuiLink color="inherit" target="_blank" href={link}>
                  <Typography
                    component={'div'}
                    variant="subtitle1"
                    align="right"
                    className={classes.menuItem}>
                    {label}
                  </Typography>
                </MuiLink>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
