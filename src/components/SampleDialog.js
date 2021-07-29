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
    zIndex: `1302 !important`
  },
  root: {
    width: '90vw',
    borderRadius: '10px',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      display: 'inline'
    }
  },
  header: {
    padding: theme.spacing(1, 1, 1, 3),
    backgroundColor: theme.palette.popupBackgroundColor,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 1, 1, 2)
    }
  },
  appName: {
    fontWeight: '600',
    marginRight: theme.spacing(1)
  },
  iconButton: {
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
    padding: theme.spacing(1, 0, 0),
    backgroundColor: theme.palette.popupBackgroundColor
  },
  details: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    },
    // padding: theme.spacing(6),
    padding: '0 15%'
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

function DeployerImage({ deployer }) {
  switch (deployer) {
    case 'google':
      return (
        <img src="https://deploy.cloud.run/button.svg" alt="Run on Google Cloud" height="36px" />
      );
    case 'vercel':
      return <img src="https://vercel.com/button" alt="Deploy with Vercel" height="36px" />;
    case 'heroku':
      return (
        <img
          src="https://www.herokucdn.com/deploy/button.svg"
          alt="Deploy to Heroku"
          height="36px"
        />
      );
    default:
      return deployer;
  }
}

export default function SampleCard({ closePopup, sample, isOpened, tags }) {
  const classes = useStyles();

  // Deployers
  const deployers = useMemo(
    () =>
      sample.deploy_buttons.reduce(
        (deployers, deployer) => ({
          ...deployers,
          [Object.keys(deployer)[0].toLowerCase()]: deployer[Object.keys(deployer)[0]]
        }),
        {}
      ),
    [sample.deploy_buttons]
  );

  // Copy button
  const [copiedAnchorEl, setCopiedAnchorEl] = useState();
  const copyToClipboard = useCallback((e) => {
    copy(window.location.href);
    setCopiedAnchorEl(e.currentTarget);
    setTimeout(() => {
      setCopiedAnchorEl();
    }, 2000);
  }, []);
  const closeCopiedMessage = useCallback(() => {
    setCopiedAnchorEl();
  }, []);
  const showCopiedMessage = useMemo(() => Boolean(copiedAnchorEl), [copiedAnchorEl]);

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
      <DialogTitle disableTypography id="sample-dialog-title" className={classes.header}>
        <Grid container alignItems="flex-start" justify="space-between">
          <Grid item xs={11}>
            <Grid container alignItems="center">
              <Typography component={'div'} variant="h5" className={classes.appName}>
                {sample.app_name}
              </Typography>
              <IconButton onClick={copyToClipboard}>
                <AiOutlineShareAlt className={classes.iconButton} />
              </IconButton>
              <Popover
                elevation={2}
                open={showCopiedMessage}
                anchorEl={copiedAnchorEl}
                onClose={closeCopiedMessage}
                style={{ zIndex: 1303 }}
                PaperProps={{ className: classes.copiedPaper }}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'left'
                }}>
                <Typography component={'div'} className={classes.copiedMessage}>
                  Link copied!
                </Typography>
              </Popover>
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
        <Box className={classes.description}>{sample.description}</Box>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Paper elevation={3} className={classes.details}>
          {sample.youtube_url && (
            <Box className={classes.youtubeBoxOuter}>
              <Box className={classes.youtubeBox}>
                <CardMedia
                  component="iframe"
                  title="youtube-video"
                  src={sample.youtube_url.replace('watch?v=', 'embed/')}
                  className={classes.youtube}
                />
              </Box>
            </Box>
          )}
          <Grid container justify="center" spacing={2} className={classes.actions}>
            {sample.quick_deploy &&
              Object.keys(deployers).map((deployer) => (
                <Grid item key={deployer}>
                  <Link href={deployers[deployer]} target="_blank">
                    <DeployerImage deployer={deployer} />
                  </Link>
                </Grid>
              ))}
            {sample.repo_url && (
              <Grid item>
                <Button
                  size="medium"
                  className={clsx(classes.action, classes.github)}
                  variant="contained"
                  color="primary"
                  component={Link}
                  naked
                  target="_blank"
                  href={sample.repo_url}>
                  <GitHubIcon className={classes.icon} />
                  Repository
                </Button>
              </Grid>
            )}
            {sample.download_url && (
              <Grid item>
                <Button
                  size="medium"
                  className={classes.action}
                  variant="contained"
                  color="primary"
                  component={Link}
                  naked
                  target="_blank"
                  href={sample.download_url}>
                  <GetAppIcon className={classes.icon} />
                  Download
                </Button>
              </Grid>
            )}
          </Grid>
          {sample.hosted_url && (
            <Grid container justify="center" className={classes.liveDemoBox}>
              <Grid item>
                <Button
                  size="medium"
                  className={classes.liveDemoButton}
                  variant="contained"
                  color="primary"
                  component={Link}
                  naked
                  target="_blank"
                  href={sample.hosted_url}>
                  Live Demo
                </Button>
              </Grid>
            </Grid>
          )}
          <Grid container justify="center" className={classes.tags}>
            {tags}
          </Grid>
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            className={classes.languages}>
            <Grid item>Language(s):</Grid>
            {sample.language.map((lang) => (
              <Grid item key={lang}>
                <Typography
                  component={'div'}
                  variant="body2"
                  color="textSecondary"
                  className={classes.iconBox}>
                  <LanguageIcon language={lang} className={classes.icon} />
                  {lang}
                </Typography>
              </Grid>
            ))}
          </Grid>
          {sample.app_image_urls.map((imageUrl, index) => (
            <img
              src={imageUrl}
              key={imageUrl}
              alt={`app_image_${index}`}
              className={classes.image}
            />
          ))}
          {sample.markdown && <Markdown url={sample.markdown} />}
        </Paper>
      </DialogContent>
    </Dialog>
  );
}
