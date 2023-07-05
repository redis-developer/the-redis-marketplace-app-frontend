import { Box, Grid, Link as MuiLink, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import React from 'react';

import { footer } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.footer.main,
    color: theme.palette.footer.contrastText
  },
  copyright: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  category: {
    marginTop: theme.spacing(3)
  },
  gridItem: {
    padding: '10px'
  },
  redisLogo: {
    height: '40px',
    maxWidth: '120px',
    opacity: '0.5',
    '&:hover': {
      opacity: '1'
    }
  }
}));

const year = new Date().getFullYear();

export default function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid justifyContent="space-evenly" className={classes.gridContainer} container>
        <Grid item md={2} direction="column" className={classes.gridColumn} container></Grid>

        {footer.map(({ category, items }) => (
          <Grid
            item
            key={category}
            md={2}
            direction="column"
            className={classes.gridColumn}
            container>
            <Grid className={classes.gridItem} item>
              <Typography component={'div'} variant="h6" align="left" className={classes.category}>
                {category}
              </Typography>
            </Grid>
            {items.map(({ label, link }) => (
              <Grid key={label} className={classes.gridItem} item>
                <MuiLink color="inherit" target="_blank" href={link}>
                  {category === 'Made with </> by' ? (
                    <Image
                      height={40}
                      width={120}
                      src={label}
                      alt="logo-redis"
                      className={classes.redisLogo}
                    />
                  ) : (
                    label
                  )}
                </MuiLink>
              </Grid>
            ))}
          </Grid>
        ))}

        <Grid item md={2} direction="column" className={classes.gridColumn} container></Grid>
      </Grid>

      <Typography component={'div'} variant="body2" align="center" className={classes.copyright}>
        {`Copyright © ${year} `}
        Redis. Redis and the cube logo are registered trademarks of Redis Ltd.
      </Typography>
    </Box>
  );
}
