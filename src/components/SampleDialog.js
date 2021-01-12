import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import GetAppIcon from '@material-ui/icons/GetApp';
import GitHubIcon from '@material-ui/icons/GitHub';
import HostedIcon from '@material-ui/icons/Language';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

import { LanguageIcon, Link } from './';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '10px',
    marginTop: theme.spacing(10)
  },
  header: {
    padding: theme.spacing(1, 1, 1, 3),
    backgroundColor: () => theme.palette.backgroundColor,
    color: (sampleStyle) => sampleStyle.main
  },
  appName: {
    paddingTop: theme.spacing(2),
    fontWeight: '600'
  },
  tags: {
    marginTop: theme.spacing(1)
  },
  content: {
    padding: theme.spacing(1, 3, 3, 3),
    backgroundColor: () => theme.palette.backgroundColor
  },
  details: {
    padding: theme.spacing(3)
  },
  description: {
    whiteSpace: 'pre-wrap',
    margin: theme.spacing(3, 0)
  },
  image: {
    width: '100%',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 7px 17px 0 rgba(0,0,0,.1)',
    marginBottom: theme.spacing(2)
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  action: {
    width: '100%',
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(2)
  },
  youtube: {
    border: 0,
    height: '460px',
    marginBottom: theme.spacing(2)
  },
  deploy: {
    marginBottom: theme.spacing(1),
    '& p': {
      fontWeight: 800,
      paddingRight: theme.spacing(1)
    }
  },
  language: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  languageIcon: {
    height: '20px',
    width: '20px',
    marginRight: theme.spacing(1)
  }
}));

export default function SampleCard({ closeSamplePopup, sample, isOpened, sampleStyle, tags }) {
  const classes = useStyles(sampleStyle);

  const firstDeployer = useMemo(
    () => ({
      link: sample.deploy_buttons[0][Object.keys(sample.deploy_buttons[0])[0]],
      name: Object.keys(sample.deploy_buttons[0])[0]
    }),
    [sample.deploy_buttons]
  );
  const [selectedDeployLink, setSelectedDeployLink] = useState(firstDeployer.link);
  const handleRadioChange = useCallback((event) => {
    setSelectedDeployLink(event.target.value);
  }, []);

  return (
    <Dialog
      open={isOpened}
      keepMounted
      TransitionComponent={Transition}
      scroll="body"
      maxWidth="lg"
      onClose={closeSamplePopup}
      aria-labelledby="sample-dialog-title"
      PaperProps={{ className: classes.root }}
      aria-describedby="sample-dialog-description">
      <DialogTitle disableTypography id="sample-dialog-title" className={classes.header}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={11}>
            <Typography variant="h5" className={classes.appName}>
              {sample.app_name}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Grid container justify="flex-end">
              <IconButton aria-label="close" onClick={closeSamplePopup}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.tags}>
            {tags}
          </Grid>
          <Typography variant="body2" color="textSecondary" className={classes.language}>
            <LanguageIcon language={sample.language} className={classes.languageIcon} />
            {sample.language}
          </Typography>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Paper elevation={1} className={classes.details}>
              <DialogContentText id="sample-dialog-description">
                {isOpened && sample.youtube_url && (
                  <CardMedia
                    component="iframe"
                    title="youtube-video"
                    src={sample.youtube_url.replace('watch?v=', 'embed/')}
                    className={classes.youtube}
                  />
                )}
                <Typography variant="body1" className={classes.description}>
                  {sample.description}
                </Typography>
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
            </Paper>
          </Grid>
          <Grid item xs={3}>
            {sample.quick_deploy && sample.deploy_buttons.length >= 2 && (
              <Box className={classes.deploy}>
                <Typography variant="body1">Deploy with:</Typography>
                <RadioGroup
                  aria-label="deployer"
                  name="deployer"
                  value={selectedDeployLink}
                  onChange={handleRadioChange}>
                  {sample.deploy_buttons.map((deployer) => (
                    <FormControlLabel
                      key={deployer[Object.keys(deployer)[0]]}
                      value={deployer[Object.keys(deployer)[0]]}
                      control={<Radio color="primary" />}
                      label={Object.keys(deployer)[0]}
                    />
                  ))}
                </RadioGroup>
              </Box>
            )}
            {sample.quick_deploy && sample.deploy_buttons.length && (
              <Button
                size="large"
                className={classes.action}
                variant="contained"
                color="primary"
                component={Link}
                naked
                target="_blank"
                href={selectedDeployLink}>
                <CloudDoneIcon className={classes.buttonIcon} />
                Quick Deploy
              </Button>
            )}
            {sample.download_url && (
              <Button
                size="large"
                className={classes.action}
                variant="contained"
                color="secondary"
                component={Link}
                naked
                target="_blank"
                href={sample.download_url}>
                <GetAppIcon className={classes.buttonIcon} />
                Download
              </Button>
            )}
            {sample.repo_url && (
              <Button
                size="large"
                className={classes.action}
                variant="contained"
                color="primary"
                component={Link}
                naked
                target="_blank"
                href={sample.repo_url}>
                <GitHubIcon className={classes.buttonIcon} />
                Repository
              </Button>
            )}
            {sample.hosted_url && (
              <Button
                size="large"
                className={classes.action}
                variant="contained"
                color="primary"
                component={Link}
                naked
                target="_blank"
                href={sample.hosted_url}>
                <HostedIcon className={classes.buttonIcon} />
                Hosted
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
