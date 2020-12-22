import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function Copyright({ ...rest }) {
  return (
    <Typography variant="body2" color="textSecondary" align="center" {...rest}>
      {'Copyright © '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Redis Labs Marketplace
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
