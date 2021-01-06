import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import GetAppIcon from '@material-ui/icons/GetApp';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React, { useCallback, useMemo, useState } from 'react';

import { Link } from './';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 1, 1, 3),
    backgroundColor: (sampleStyle) => sampleStyle.light,
    color: (sampleStyle) => sampleStyle.main
  },
  content: {
    padding: theme.spacing(3)
  },
  description: {
    whiteSpace: 'pre-wrap'
  },
  image: {
    width: '100%'
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  actions: {
    flexWrap: 'wrap'
  },
  youtube: {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.tertiary.dark
    },
    '&:disabled': {
      backgroundColor: theme.palette.tertiary.light
    }
  },
  deploy: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: '0 0 100%',
    marginBottom: theme.spacing(1),
    '& p': {
      fontWeight: 800,
      paddingRight: theme.spacing(1)
    }
  }
}));

export default function SampleCard({ closeSamplePopup, sample, isOpened, sampleStyle }) {
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
      scroll="body"
      maxWidth="md"
      onClose={closeSamplePopup}
      aria-labelledby="sample-dialog-title"
      aria-describedby="sample-dialog-description">
      <DialogTitle disableTypography id="sample-dialog-title" className={classes.header}>
        <Typography variant="h6">{sample.app_name}</Typography>
        <IconButton aria-label="close" onClick={closeSamplePopup}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content} dividers>
        <DialogContentText id="sample-dialog-description" className={classes.description}>
          {sample.description}
        </DialogContentText>
        {sample.app_image_urls.map((imageUrl, index) => (
          <img src={imageUrl} key={imageUrl} alt={`app_image_${index}`} className={classes.image} />
        ))}
      </DialogContent>
      <DialogActions className={classes.actions}>
        {sample.quick_deploy && sample.deploy_buttons.length >= 2 && (
          <Box className={classes.deploy}>
            <Typography variant="body1">Deploy with:</Typography>
            <RadioGroup
              row
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
        {sample.youtube_url && (
          <Button
            size="small"
            variant="contained"
            className={classes.youtube}
            component={Link}
            naked
            target="_blank"
            href={sample.youtube_url}>
            <YouTubeIcon className={classes.buttonIcon} />
            YouTube
          </Button>
        )}
        {sample.download_url && (
          <Button
            size="small"
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
            size="small"
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
            size="small"
            variant="contained"
            color="primary"
            component={Link}
            naked
            target="_blank"
            href={sample.hosted_url}>
            <LanguageIcon className={classes.buttonIcon} />
            Hosted
          </Button>
        )}
        {sample.quick_deploy && sample.deploy_buttons.length && (
          <Button
            size="small"
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
      </DialogActions>
    </Dialog>
  );
}
