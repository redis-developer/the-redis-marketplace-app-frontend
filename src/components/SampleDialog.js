import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Slide,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Close as CloseIcon,
  GetApp as GetAppIcon,
  GitHub as GitHubIcon,
  Language as HostedIcon
} from '@material-ui/icons';
import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { DiHeroku } from 'react-icons/di';
import { IoLogoVercel } from 'react-icons/io5';
import { SiGooglecloud } from 'react-icons/si';

import { LanguageIcon, Link, Markdown } from './';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '1300px',
    borderRadius: '10px',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      display: 'inline'
    }
  },
  header: {
    padding: theme.spacing(1, 1, 1, 3),
    backgroundColor: theme.palette.backgroundColor,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 1, 1, 2)
    }
  },
  appName: {
    fontWeight: '600',
    color: theme.palette.card.main,
    marginRight: theme.spacing(1)
  },
  copyLinkIcon: {
    color: theme.palette.card.main
  },
  copiedMessage: {
    padding: theme.spacing(1),
    fontWeight: 600,
    fontSize: '14px',
    color: theme.palette.card.main
  },
  copiedPaper: {
    borderRadius: '5px',
    background: theme.palette.card.light
  },
  tags: {
    marginTop: theme.spacing(1)
  },
  content: {
    padding: theme.spacing(1, 3, 3, 3),
    backgroundColor: theme.palette.backgroundColor,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  details: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  description: {
    whiteSpace: 'pre-wrap',
    margin: theme.spacing(1, 0, 4),
    color: theme.palette.text.primary
  },
  descriptionHeader: {
    fontWeight: 800
  },
  image: {
    display: 'block',
    maxWidth: '700px',
    width: '100%',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 0 10px 0 rgba(0,0,0,.1)',
    margin: theme.spacing(0, 'auto', 2, 'auto')
  },
  action: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    whiteSpace: 'nowrap'
  },
  github: {
    backgroundColor: theme.palette.brandColors.github.main,
    color: theme.palette.brandColors.github.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.brandColors.github.dark
    },
    '&:disabled': {
      backgroundColor: theme.palette.brandColors.github.light
    }
  },
  youtube: {
    border: 0,
    height: '460px',
    marginBottom: theme.spacing(2),
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 0 10px 0 rgba(0,0,0,.1)',
    [theme.breakpoints.down('xs')]: {
      height: '200px'
    }
  },
  deploy: {
    margin: theme.spacing(1, 0),
    '& p': {
      fontWeight: 800,
      paddingRight: theme.spacing(1)
    }
  },
  deployer: {
    width: '140px',
    '&:hover span, &:active span': {
      fontWeight: '600'
    }
  },
  deployerLabel: {
    display: 'flex',
    alignItems: 'center',
    transition: 'all .2s ease-in-out',
    '& span:first-letter': {
      textTransform: 'capitalize'
    }
  },
  heroku: {
    color: theme.palette.brandColors.heroku.main
  },
  google: {
    color: theme.palette.brandColors.google.main
  },
  vercel: {
    color: theme.palette.brandColors.vercel.main
  },
  herokuButton: {
    backgroundColor: theme.palette.brandColors.heroku.main,
    color: theme.palette.brandColors.heroku.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.brandColors.heroku.dark
    },
    '&:disabled': {
      backgroundColor: theme.palette.brandColors.heroku.light
    }
  },
  googleButton: {
    backgroundColor: theme.palette.brandColors.google.main,
    color: theme.palette.brandColors.google.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.brandColors.google.dark
    },
    '&:disabled': {
      backgroundColor: theme.palette.brandColors.google.light
    }
  },
  vercelButton: {
    backgroundColor: theme.palette.brandColors.vercel.main,
    color: theme.palette.brandColors.vercel.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.brandColors.vercel.dark
    },
    '&:disabled': {
      backgroundColor: theme.palette.brandColors.vercel.light
    }
  },
  language: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  icon: {
    height: '20px',
    width: '20px',
    marginRight: theme.spacing(1)
  }
}));

function DeployerIcon({ deployer, ...rest }) {
  switch (deployer) {
    case 'heroku':
      return <DiHeroku {...rest} />;
    case 'vercel':
      return <IoLogoVercel {...rest} />;
    case 'google':
      return <SiGooglecloud {...rest} />;
    default:
      return null;
  }
}

function DeployerRadioButton({ deployerName, classes }) {
  return (
    <FormControlLabel
      key={deployerName}
      value={deployerName}
      className={classes.deployer}
      control={<Radio color="primary" />}
      label={
        <Box className={clsx(classes.deployerLabel, classes[deployerName])}>
          <DeployerIcon deployer={deployerName} className={classes.icon} />
          <span>{deployerName}</span>
        </Box>
      }
    />
  );
}

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SampleCard({ closePopup, sample, isOpened, tags }) {
  const classes = useStyles();

  // Deployer selection
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
  const [selectedDeployer, setSelectedDeployer] = useState(Object.keys(deployers)[0]);
  const handleRadioChange = useCallback((event) => {
    setSelectedDeployer(event.target.value);
  }, []);

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
      open={isOpened}
      keepMounted
      TransitionComponent={Transition}
      scroll="body"
      maxWidth="lg"
      onClose={closePopup}
      aria-labelledby="sample-dialog-title"
      PaperProps={{ className: classes.root }}
      aria-describedby="sample-dialog-description">
      <DialogTitle disableTypography id="sample-dialog-title" className={classes.header}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={11}>
            <Grid container alignItems="center">
              <Typography variant="h5" className={classes.appName}>
                {sample.app_name}
              </Typography>
              <IconButton onClick={copyToClipboard}>
                <AiOutlineLink className={classes.copyLinkIcon} />
              </IconButton>
              <Popover
                elevation={2}
                open={showCopiedMessage}
                anchorEl={copiedAnchorEl}
                onClose={closeCopiedMessage}
                PaperProps={{ className: classes.copiedPaper }}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'left'
                }}>
                <Typography className={classes.copiedMessage}>Link copied!</Typography>
              </Popover>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid container justify="flex-end">
              <IconButton aria-label="close" onClick={closePopup}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.tags}>
            {tags}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          {sample.language.map((lang) => (
            <Grid item key={lang}>
              <Typography variant="body2" color="textSecondary" className={classes.language}>
                <LanguageIcon language={lang} className={classes.icon} />
                {lang}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Paper elevation={1} className={classes.details}>
          {isOpened && sample.youtube_url && (
            <CardMedia
              component="iframe"
              title="youtube-video"
              src={sample.youtube_url.replace('watch?v=', 'embed/')}
              className={classes.youtube}
            />
          )}
          <Box mt={3} mb={1}>
            {sample.quick_deploy && Object.keys(deployers).length && (
              <Button
                size="medium"
                className={clsx(classes.action, classes[`${selectedDeployer}Button`])}
                variant="contained"
                color="primary"
                component={Link}
                naked
                target="_blank"
                href={deployers[selectedDeployer]}>
                <DeployerIcon deployer={selectedDeployer} className={classes.icon} />
                Quick Deploy
              </Button>
            )}
            {sample.hosted_url && (
              <Button
                size="medium"
                className={classes.action}
                variant="contained"
                color="primary"
                component={Link}
                naked
                target="_blank"
                href={sample.hosted_url}>
                <HostedIcon className={classes.icon} />
                Hosted
              </Button>
            )}
            {sample.repo_url && (
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
            )}
            {sample.download_url && (
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
            )}
          </Box>
          {sample.quick_deploy && Object.keys(deployers).length >= 2 && (
            <Box className={classes.deploy}>
              <Typography variant="body1">Deploy with:</Typography>
              <RadioGroup
                row
                aria-label="deployer"
                name="deployer"
                value={selectedDeployer}
                onChange={handleRadioChange}>
                {Object.keys(deployers).map((deployerName) => (
                  <DeployerRadioButton
                    deployerName={deployerName}
                    classes={classes}
                    key={deployerName}
                  />
                ))}
              </RadioGroup>
            </Box>
          )}
          <DialogContentText id="sample-dialog-description" className={classes.description}>
            <span className={classes.descriptionHeader}>Description:</span>
            <br />
            {sample.description}
          </DialogContentText>
          {isOpened &&
            sample.app_image_urls.map((imageUrl, index) => (
              <img
                src={imageUrl}
                key={imageUrl}
                alt={`app_image_${index}`}
                className={classes.image}
              />
            ))}
          {isOpened && sample.markdown && <Markdown url={sample.markdown} />}
        </Paper>
      </DialogContent>
    </Dialog>
  );
}
