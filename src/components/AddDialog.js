import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Popover,
  Slide,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close as CloseIcon, GetApp as GetAppIcon, GitHub as GitHubIcon } from '@material-ui/icons';
import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';

import { LanguageIcon, Link, Markdown } from './';

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    // marginTop: '0px',
    zIndex: `1302 !important`
  },
  root: {
    width: '90vw',
    borderRadius: '10px',
    maxHeight: '100%',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      display: 'inline'
    }
  },
  header: {
    padding: theme.spacing(1, 1, 1, 3),
    paddingBottom: 0,
    backgroundColor: theme.palette.popupBackgroundColor,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 1, 1, 2)
    }
  },
  appName: {
    marginTop: '10px',
    fontWeight: '600',
    marginRight: theme.spacing(1)
  },
  iconButton: {
    padding: 0,
    color: theme.palette.text.primary
  },
  copiedMessage: {
    padding: theme.spacing(1),
    fontWeight: 600,
    fontSize: '14px',
    color: theme.palette.text.primary
  },
  copiedPaper: {
    borderRadius: '5px',
    background: theme.palette.popupBackgroundColor
  },
  description: {
    whiteSpace: 'pre-wrap',
    color: theme.palette.text.primary
  },
  content: {
    padding: theme.spacing(0, 0, 0),
    backgroundColor: theme.palette.popupBackgroundColor
  },
  details: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    },
    // padding: theme.spacing(6),
    padding: '0 15%',
    paddingTop: '40px',
    paddingBottom: '40px'
  },
  image: {
    display: 'block',
    maxWidth: '700px',
    width: '100%',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 0 10px 0 rgba(0,0,0,.1)',
    margin: theme.spacing(0, 'auto', 2, 'auto')
  },
  liveDemoBox: {
    margin: theme.spacing(2, 0, 3)
  },
  liveDemoButton: {
    padding: theme.spacing(1, 8),
    fontWeight: 600,
    fontSize: '16px',
    borderRadius: '8px'
  },
  actions: {
    margin: theme.spacing(2, 0)
  },
  action: {
    whiteSpace: 'nowrap',
    '& $icon': {
      color: theme.palette.primary.contrastText
    }
  },
  github: {
    backgroundColor: theme.palette.brandColors.github.main,
    color: theme.palette.brandColors.github.contrastText,
    '&:hover, &:active': {
      backgroundColor: theme.palette.brandColors.github.dark
    },
    '&:disabled': {
      backgroundColor: theme.palette.brandColors.github.light
    }
  },
  youtubeBoxOuter: {
    maxWidth: '900px',
    margin: 'auto'
  },
  youtubeBox: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
    marginBottom: theme.spacing(2)
  },
  youtube: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    border: 0,
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 0 10px 0 rgba(0,0,0,.1)'
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    height: '20px',
    width: '20px',
    marginRight: theme.spacing(1),
    color: theme.palette.icon
  },
  languages: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  tags: {
    margin: theme.spacing(1, 0)
  }
}));

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddDialog({ closePopup, isOpened, tags }) {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.dialogRoot}
      open={isOpened}
      keepMounted
      TransitionComponent={Transition}
      scroll="paper"
      maxWidth={false}
      onClose={closePopup}
      aria-labelledby="sample-dialog-title"
      PaperProps={{ className: classes.root }}
      aria-describedby="sample-dialog-description">
      <DialogTitle id="sample-dialog-title" className={classes.header}>
        <Grid container alignItems="flex-start" justify="space-between">
          <Grid item xs={11}>
            <Grid container alignItems="center">
              <Typography component={'div'} variant="h5" className={classes.appName}>
                Add your application.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid container justify="flex-end">
              <IconButton aria-label="close" onClick={closePopup}>
                <CloseIcon className={classes.iconButton} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Paper className={classes.details}>
          <Markdown url="https://raw.githubusercontent.com/redis-developer/adding-apps-to-redis-marketplace/master/README.md" />
        </Paper>
      </DialogContent>
    </Dialog>
  );
}
