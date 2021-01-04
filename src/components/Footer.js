import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.footerBackgroundColor
  },
  mainText: {
    fontStyle: 'italic',
    fontWeight: 300
  },
  copyright: {
    marginTop: theme.spacing(3)
  }
}));

const year = new Date().getFullYear();

export default function Footer({ ...rest }) {
  const classes = useStyles();

  return (
    <Box {...rest} className={classes.root} mt={6} pt={6} pb={4}>
      <Typography variant="h3" color="textPrimary" align="center" className={classes.mainText}>
        We can’t wait to see what you build.
      </Typography>
      <Typography variant="body2" color="textPrimary" align="center" className={classes.copyright}>
        {`Copyright © ${year} `}
        <MuiLink color="inherit" href="https://redislabs.com/">
          Redis Labs Marketplace
        </MuiLink>
      </Typography>
      <Typography variant="body2" color="textPrimary" align="center">
        ALL RIGHTS RESERVED.
      </Typography>
    </Box>
  );
}
