import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Grow,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Router from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { FaUserCog, FaUsers } from 'react-icons/fa';
import { SiRedis } from 'react-icons/si';

import { LanguageIcon, SampleDialog } from './';

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
  skeleton: {
    '& $subHeader, & $appName, & $description, & $avatar, & $language, & $contribution, & $chip': {
      color: 'transparent',
      background: 'linear-gradient(-45deg, #81c6ff, #c6e5ff, #d3ecff)',
      backgroundSize: '400% 400%',
      animation: '$gradient 3s ease infinite'
    },
    '& $subHeader, & $appName, & $description, & $language, & $contribution, ': {
      borderRadius: '5px'
    }
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 7px 17px 0 rgba(0,0,0,.1)',
    borderRadius: '10px'
  },
  appName: {
    lineHeight: 1.5,
    marginBottom: theme.spacing(1)
  },
  description: {
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  },
  contribution: {
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.borderColor}`
  },
  dialogLink: {
    padding: theme.spacing(1, 0),
    backgroundColor: theme.palette.card.light,
    color: theme.palette.card.main,
    '& p': {
      color: theme.palette.card.main
    },
    '&:hover': {
      textDecoration: 'none'
    }
  },
  header: {
    maxHeight: '35px',
    fontWeight: '500'
  },
  subHeader: {
    fontWeight: '600'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between'
  },
  avatar: {
    position: 'relative',
    top: '10px',
    zIndex: 1,
    backgroundColor: theme.palette.card.main,
    fontSize: '24px'
  },
  chip: {
    margin: theme.spacing(0, 0.5, 0.5, 0),
    fontWeight: 500
  },
  language: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  languageIcon: {
    height: '20px',
    width: '20px',
    marginRight: theme.spacing(1)
  },
  chip_redis_modules: {
    color: theme.palette.filterCategoryColors.redis_modules.contrastText
  },
  chip_verticals: {
    color: theme.palette.filterCategoryColors.verticals.contrastText
  },
  chip_redis_features: {
    color: theme.palette.filterCategoryColors.redis_features.contrastText
  },
  chip_redis_commands: {
    color: theme.palette.filterCategoryColors.redis_commands.contrastText
  },
  chip_special_tags: {
    color: theme.palette.filterCategoryColors.special_tags.contrastText
  }
}));

function CardIcon({ sample, ...rest }) {
  switch (sample.contributed_by) {
    case 'Community':
      return <FaUsers {...rest} />;
    case 'Partner':
      return <FaUserCog {...rest} style={{ marginLeft: '4px' }} />;
    default:
      return <SiRedis {...rest} />;
  }
}

export default function SampleCard({
  linkedAppName,
  sample,
  updateTags,
  skeleton,
  closeLinkedApp,
  timeout
}) {
  const classes = useStyles();

  const subheader = useMemo(() => sample.redis_features.join(', '), [sample.redis_features]);

  const [isOpened, setIsOpened] = useState(linkedAppName === sample.app_name);
  const openSamplePopup = useCallback(() => {
    setIsOpened(true);
    Router.push({
      pathname: '/',
      query: { app_name: sample.app_name }
    });
  }, [sample.app_name]);
  const closeSamplePopup = useCallback(() => {
    setIsOpened(false);
    if (linkedAppName) {
      closeLinkedApp();
    }
    Router.push({ pathname: '/' });
  }, [closeLinkedApp, linkedAppName]);

  const tags = useMemo(
    () =>
      ['redis_commands', 'redis_features', 'redis_modules', 'special_tags', 'verticals'].map(
        (filter) =>
          sample[filter].map((tag) => (
            <Chip
              size="small"
              label={tag}
              key={tag}
              className={clsx(classes.chip, classes[`chip_${filter}`])}
              onClick={() => {
                updateTags({ [filter]: { [tag]: true } });
                closeSamplePopup();
              }}
              disabled={skeleton}
              color="secondary"
            />
          ))
        // TODO: add quick deploy chip and filter: sample.quick_deploy ? ['Quick Deploy']
      ),
    [sample, classes, updateTags, closeSamplePopup, skeleton]
  );

  return (
    <Grow in timeout={timeout}>
      <Card key={sample.id} className={clsx(classes.root, skeleton && classes.skeleton)}>
        <CardHeader
          subheader={subheader}
          subheaderTypographyProps={{ variant: 'body2', className: classes.subHeader }}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {!skeleton && <CardIcon sample={sample} />}
            </Avatar>
          }
          className={classes.header}
        />
        <CardActionArea
          disabled={skeleton}
          onClick={openSamplePopup}
          className={classes.dialogLink}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2" className={classes.appName}>
              {sample.app_name}
            </Typography>
            <Typography variant="body2" className={classes.description}>
              {sample.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent className={classes.content}>
          <Box>
            <Grid container spacing={1}>
              {sample.language.map((lang) => (
                <Grid item key={lang}>
                  <Typography variant="body2" color="textSecondary" className={classes.language}>
                    {!skeleton && <LanguageIcon language={lang} className={classes.languageIcon} />}
                    {lang}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            {tags}
          </Box>
          <Typography variant="body2" color="textSecondary" className={classes.contribution}>
            By {sample.contributed_by}
          </Typography>
        </CardContent>
        {!skeleton && (
          <SampleDialog
            tags={tags}
            sample={sample}
            closeSamplePopup={closeSamplePopup}
            isOpened={isOpened}
          />
        )}
      </Card>
    </Grow>
  );
}
