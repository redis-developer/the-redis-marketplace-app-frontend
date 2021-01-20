import { Box, Card, CardActionArea, CardContent, Grid, Grow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
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
    minHeight: '390px',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 7px 17px 0 rgba(0,0,0,.1)',
    borderRadius: '10px'
  },
  appName: {
    lineHeight: 1.5,
    marginBottom: theme.spacing(1)
  },
  description: {
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
  dialogLink: {
    display: 'flex',
    height: '100%',
    alignItems: 'flex-start',
    backgroundColor: theme.palette.card.light,
    color: theme.palette.card.main,
    '& p': {
      color: theme.palette.card.main
    },
    '&:hover, &:active': {
      textDecoration: 'none'
    }
  },
  secondaryContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
  },
  tags: {
    height: '91px',
    overflow: 'scroll'
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
      { scroll: false }
    );
  }, [sample.id]);
  const closePopup = useCallback(() => {
    setIsOpened(false);
    Router.push({ pathname: '/' }, null, { scroll: false });
  }, []);

  const tags = useMemo(
    () => <SampleTags sample={sample} closePopup={closePopup} updateTags={updateTags} />,
    [sample, updateTags, closePopup]
  );

  return (
    <Grow in={!loading} timeout={timeout}>
      <Card key={sample.id} className={classes.root}>
        <CardActionArea onClick={openSamplePopup} className={classes.dialogLink}>
          <CardContent>
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
        </CardActionArea>
        <CardContent className={classes.secondaryContent}>
          <Box className={classes.tags}>{tags}</Box>
          <Grid container className={classes.footer} wrap="nowrap">
            <Grid item xs={7}>
              <Grid container spacing={1}>
                {sample.language.map((lang) => (
                  <Grid item key={lang}>
                    <Typography variant="body2" color="textSecondary" className={classes.iconBox}>
                      <LanguageIcon language={lang} className={classes.icon} />
                      {lang}
                    </Typography>
                  </Grid>
                ))}{' '}
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container justify="flex-end">
                <Typography variant="body2" color="textSecondary" className={classes.iconBox}>
                  <ContributerIcon contributedBy={sample.contributed_by} className={classes.icon} />
                  {sample.contributed_by}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <SampleDialog tags={tags} sample={sample} closePopup={closePopup} isOpened={isOpened} />
      </Card>
    </Grow>
  );
}
