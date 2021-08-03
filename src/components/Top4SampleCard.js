import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';

// import { FaCube, FaRegWindowRestore, FaUserCog, FaUsers } from 'react-icons/fa';
// import { SiRedis } from 'react-icons/si';
import { SampleDialog, Top4SampleTags } from './';

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
    minHeight: '600px',
    background: `url(${'./cardImages/generic.png'}) no-repeat center`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 7px 17px 0 rgba(0,0,0,.1)',
    borderRadius: '10px',
    transition: 'box-shadow .15s',
    '&:hover': {
      boxShadow: '0 1px 5px 0 rgba(0,0,0,.37), 0 7px 17px 0 rgba(0,0,0,.1)',
      '& $primaryContent': {
        backgroundColor: 'rgb(0,0,0,0.7)'
      }
    }
  },
  appName: {
    lineHeight: 1.5,
    marginBottom: theme.spacing(0.5)
  },
  description: {
    marginTop: theme.spacing(0.5),
    fontSize: '15px',
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': 4,
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
    paddingTop: theme.spacing(2.5),
    minHeight: '40%',
    backgroundColor: 'rgb(0,0,0,0.5)',
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
    paddingBottom: `${theme.spacing(2)}px !important`,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
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

// function TypeIcon({ type, ...rest }) {
//   switch (type) {
//     case 'Building Block':
//       return <FaCube {...rest} />;
//     case 'Full App':
//       return <FaRegWindowRestore {...rest} />;
//     default:
//       return null;
//   }
// }

// function ContributerIcon({ contributedBy, ...rest }) {
//   switch (contributedBy) {
//     case 'Community':
//       return <FaUsers {...rest} />;
//     case 'Partner':
//       return <FaUserCog {...rest} style={{ marginLeft: '4px' }} />;
//     default:
//       return <SiRedis {...rest} />;
//   }
// }

export default function Top4SampleCard({ sample, updateTags }) {
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
    () => <Top4SampleTags sample={sample} closePopup={closePopup} updateTags={updateTags} />,
    [sample, updateTags, closePopup]
  );

  return (
    <Box height={1}>
      <Card key={sample.id + 'Top4'} className={classes.root}>
        <Box onClick={openSamplePopup} className={classes.actionArea}>
          <CardContent></CardContent>
          <CardContent className={classes.primaryContent}>
            <Grid container wrap="nowrap" alignItems="baseline">
              <Grid item>
                <Typography component={'div'} gutterBottom variant="h6" className={classes.appName}>
                  {sample.app_name.length > 30
                    ? sample.app_name.slice(0, 30) + '...'
                    : sample.app_name}
                </Typography>
              </Grid>
            </Grid>
            <Typography component={'div'} variant="body2" className={classes.description}>
              {sample.description.length > 50
                ? sample.description.slice(0, 50) + '...'
                : sample.description}
            </Typography>
          </CardContent>
        </Box>
        <SampleDialog tags={tags} sample={sample} closePopup={closePopup} isOpened={isOpened} />
      </Card>
    </Box>
  );
}
