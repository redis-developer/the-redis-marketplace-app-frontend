import { Box, Card, CardContent, Grid, Grow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FaCube, FaRegWindowRestore, FaUserCog, FaUsers } from 'react-icons/fa';
import { SiRedis } from 'react-icons/si';

import { LanguageIcon, SampleDialog, SampleTags } from './';

const useStyles = makeStyles((theme) => ({
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%'
    },
    '50%': {
      backgroundPosition: '100% 50%'
    },
    '100%': {
      backgroundPosition: '0% 50%'
    }
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '380px',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 7px 17px 0 rgba(0,0,0,.1)',
    borderRadius: '10px',
    transition: 'box-shadow .15s',
    '&:hover': {
      boxShadow: '0 1px 5px 0 rgba(0,0,0,.37), 0 7px 17px 0 rgba(0,0,0,.1)',
      '& $primaryContent': {
        backgroundColor: theme.palette.card.dark
      }
    }
  },
  appName: {
    lineHeight: 1.5,
    marginBottom: theme.spacing(1)
  },
  description: {
    marginTop: theme.spacing(1),
    fontSize: '15px',
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': 6,
    '-webkit-box-orient': 'vertical'
  },
  footer: {
    paddingTop: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.borderColor}`
  },
  actionArea: {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  primaryContent: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.palette.card.main,
    color: theme.palette.card.contrastText,
    transition: 'all .15s',
    '& p': {
      color: theme.palette.card.contrastText
    },
    '&:hover, &:active': {
      textDecoration: 'none'
    }
  },
  secondaryContent: {
    paddingBottom: `${theme.spacing(2)}px !important`
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
  }
}));

function TypeIcon({ type, ...rest }) {
  switch (type) {
    case 'Building Block':
      return <FaCube {...rest} />;
    case 'Full App':
      return <FaRegWindowRestore {...rest} />;
    default:
      return null;
  }
}

function ContributerIcon({ contributedBy, ...rest }) {
  switch (contributedBy) {
    case 'Community':
      return <FaUsers {...rest} />;
    case 'Partner':
      return <FaUserCog {...rest} style={{ marginLeft: '4px' }} />;
    default:
      return <SiRedis {...rest} />;
  }
}

export default function SampleCard({ sample, updateTags, timeout, loading }) {
  const classes = useStyles();

  const [isOpened, setIsOpened] = useState(false);
  const openSamplePopup = useCallback(() => {
    setIsOpened(true);
    Router.push(
      {
        pathname: '/',
        query: { id: sample.id }
      },
      null,
      { scroll: false, shallow: true }
    );
  }, [sample.id]);
  const closePopup = useCallback(() => {
    setIsOpened(false);
    Router.push({ pathname: '/' }, null, { scroll: false, shallow: true });
  }, []);

  const tags = useMemo(
    () => <SampleTags sample={sample} closePopup={closePopup} updateTags={updateTags} />,
    [sample, updateTags, closePopup]
  );

  return (
    <Grow in={!loading} timeout={{ enter: timeout, exit: 150 }}>
      <Box height={1}>
        <Card key={sample.id} className={classes.root}>
          <Box onClick={openSamplePopup} className={classes.actionArea}>
            <CardContent className={classes.primaryContent}>
              <Grid container wrap="nowrap" alignItems="baseline">
                <Grid item>
                  <TypeIcon type={sample.type} className={classes.icon} />
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6" component="h2" className={classes.appName}>
                    {sample.app_name}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" className={classes.description}>
                {sample.description}
              </Typography>
            </CardContent>
            <CardContent className={classes.secondaryContent}>
              <Scrollbars style={{ height: 91 }} autoHide>
                {tags}
              </Scrollbars>
              <Grid container className={classes.footer} wrap="nowrap">
                <Grid item xs={7}>
                  <Grid container spacing={1}>
                    {sample.language.map((lang) => (
                      <Grid item key={lang}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className={classes.iconBox}>
                          <LanguageIcon language={lang} className={classes.icon} />
                          {lang}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid container justify="flex-end">
                    <Typography variant="body2" color="textSecondary" className={classes.iconBox}>
                      <ContributerIcon
                        contributedBy={sample.contributed_by}
                        className={classes.icon}
                      />
                      {sample.contributed_by}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
          <SampleDialog tags={tags} sample={sample} closePopup={closePopup} isOpened={isOpened} />
        </Card>
      </Box>
    </Grow>
  );
}
