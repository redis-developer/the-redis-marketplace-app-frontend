import { Box, Grid, Link as MuiLink, Paper, Typography } from '@material-ui/core';
import { cyan } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.footer.main,
    color: theme.palette.footer.contrastText
  },
  mainText: {
    fontStyle: 'italic',
    fontWeight: 300,
    padding: theme.spacing(1)
  },
  copyright: {
    marginTop: theme.spacing(3)
  },
  gridContainer: {
    // background: 'teal'
  },
  gridItem: {
    // background: 'salmon',
    // border: '1px white solid',
    padding: '10px'
  },
  gridColumn: {
    // background: 'DarkSeaGreen'
  },
  redisLogo: {
    height: '40px',
    opacity: '0,5',
    '&:hover': {
      opacity: '1'
    }
    // marginRight: theme.spacing(3)
  }
}));

const year = new Date().getFullYear();

const getStartedColumn = {
  header: 'Get Started',
  rows: [
    'Create Database',
    'Develop',
    'Explore your data',
    'Best Practices',
    'Build with Redis Modules'
  ]
};

const communityColumn = {
  header: 'Community',
  rows: ['Redis University', 'Command', 'Reference', 'How-tos & tutorials']
};

const ColumnHeader = (line) => (
  <Grid item sm={8}>
    {line}
  </Grid>
);
const GridItem = (line) => (
  <Grid item sm={8}>
    {line}
  </Grid>
);

const GridList = ({ header, rows }) => [ColumnHeader(header), ...rows.map(GridItem)];

const GridColumn = (list) => (
  <Grid container sm={4} direction="column" alignItems="baseline">
    {list}
  </Grid>
);

export default function Footer() {
  const classes = useStyles();

  return (
    <Box padding={3} className={classes.root}>
      <Grid justify="space-evenly" className={classes.gridContainer} container>
        <Grid xs={3} direction="column" className={classes.gridColumn} container>
          <Grid className={classes.gridItem} item>
            <Typography variant="h6" align="left" className={classes.copyright}>
              Made with {`</>`} by
            </Typography>
          </Grid>
          <Grid className={classes.gridItem} item>
            <MuiLink color="inherit" target="_blank" href="https://redislabs.com/">
              <img
                src="https://developer.redislabs.com/img/redis-labs-logo-reversed.svg"
                alt="logo-redis"
                className={classes.redisLogo}
              />
            </MuiLink>
          </Grid>
        </Grid>

        <Grid xs={3} direction="column" className={classes.gridColumn} container>
          <Grid className={classes.gridItem} item>
            <Typography variant="h6" align="left" className={classes.copyright}>
              Get Started
            </Typography>
          </Grid>
          <Grid className={classes.gridItem} item>
            <MuiLink
              color="inherit"
              target="_blank"
              href="https://developer.redislabs.com/create/rediscloud">
              Create Database
            </MuiLink>
          </Grid>
          <Grid className={classes.gridItem} item>
            <MuiLink color="inherit" target="_blank" href="https://developer.redislabs.com/develop">
              Develop
            </MuiLink>
          </Grid>
          <Grid className={classes.gridItem} item>
            <MuiLink
              color="inherit"
              target="_blank"
              href="https://developer.redislabs.com/explore/redisinsight">
              Explore your data
            </MuiLink>
          </Grid>
          <Grid className={classes.gridItem} item>
            <MuiLink
              color="inherit"
              target="_blank"
              href="https://redislabs.com/redis-best-practices/introduction/">
              Best Practices
            </MuiLink>
          </Grid>
          <Grid className={classes.gridItem} item>
            <MuiLink
              color="inherit"
              target="_blank"
              href="https://developer.redislabs.com/howtos/redisearch">
              Build with Redis Modules
            </MuiLink>
          </Grid>
        </Grid>

        <Grid xs={3} direction="column" className={classes.gridColumn} container>
          <Grid className={classes.gridItem} item>
            <Typography variant="h6" align="left" className={classes.copyright}>
              Resources
            </Typography>
          </Grid>
          <Grid className={classes.gridItem} item>
            <MuiLink color="inherit" target="_blank" href="https://redislabs.com/community/">
              Community
            </MuiLink>
          </Grid>
          <Grid className={classes.gridItem} item>
            <MuiLink color="inherit" target="_blank" href="https://university.redislabs.com/">
              Redis University
            </MuiLink>
          </Grid>
          <Grid className={classes.gridItem} item>
            <MuiLink color="inherit" target="_blank" href="https://redis.io/commands">
              Command Reference
            </MuiLink>
          </Grid>
          <Grid className={classes.gridItem} item>
            <MuiLink
              color="inherit"
              target="_blank"
              href="https://developer.redislabs.com/howtos/moviesdatabase/getting-started">
              How-tos & tutorials
            </MuiLink>
          </Grid>
        </Grid>
      </Grid>

      <Typography variant="body2" align="center" className={classes.copyright}>
        {`Copyright © ${year} `}
        Redis Labs. Redis and the cube logo are registered trademarks of Redis Labs Ltd.
      </Typography>
    </Box>
  );
}

/*  <Box className={classes.root} mt={6} pt={6} pb={4}>
      <Typography variant="h3" align="center" className={classes.mainText}>
        We can’t wait to see what you build.
      </Typography>
      <Typography variant="body2" align="center" className={classes.copyright}>
        {`Copyright © ${year} `}
        <MuiLink color="inherit" target="_blank" href="https://redislabs.com/">
          Redis Marketplace
        </MuiLink>
      </Typography>
      <Typography variant="body2" align="center">
        ALL RIGHTS RESERVED.
      </Typography>
    </Box> 
*/
