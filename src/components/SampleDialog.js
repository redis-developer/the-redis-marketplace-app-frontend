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
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useCallback, useMemo, useState } from 'react';

import Link from '../../src/components/Link';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 1, 1, 3),
    backgroundColor: (style) => style.light,
    color: (style) => style.main
  },
  content: {
    padding: theme.spacing(3)
  },
  actions: {
    flexWrap: 'wrap'
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

export default function SampleCard({ closeSamplePopup, sample, isOpened }) {
  const theme = useTheme();
  const classes = useStyles(
    sample.type === 'Building Block' ? theme.palette.buildingBlock : theme.palette.application
  );

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
        <DialogContentText id="sample-dialog-description">{sample.description}</DialogContentText>
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
        {sample.download_url && (
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            naked
            href={sample.download_url}>
            Download
          </Button>
        )}
        {sample.repo_url && (
          <Button variant="contained" color="primary" component={Link} naked href={sample.repo_url}>
            Repository
          </Button>
        )}
        {sample.hosted_url && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            naked
            href={sample.hosted_url}>
            Hosted
          </Button>
        )}
        {sample.quick_deploy && sample.deploy_buttons.length && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            naked
            href={selectedDeployLink}>
            Quick Deploy
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
