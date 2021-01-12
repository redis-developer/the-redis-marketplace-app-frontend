import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
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
      background: 'linear-gradient(-45deg, #c1c1c1, #dbdbdd, #e4e4e4)',
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
    flex: '0 0 32%',
    marginBottom: theme.spacing(2.5),
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
    backgroundColor: (sampleStyle) => sampleStyle.light,
    color: (sampleStyle) => sampleStyle.main,
    '& p': {
      color: (sampleStyle) => sampleStyle.main
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
    backgroundColor: (sampleStyle) => sampleStyle.main,
    fontSize: '24px'
  },
  chip: {
    margin: theme.spacing(0, 0.5, 0.5, 0),
    fontWeight: 300
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

export default function SampleCard({ sample, updateTags, skeleton }) {
  const theme = useTheme();
  const sampleStyle = useMemo(
    () =>
      skeleton || sample.type === 'Building Block'
        ? theme.palette.buildingBlock
        : theme.palette.application,
    [sample.type, theme.palette.application, theme.palette.buildingBlock, skeleton]
  );
  const classes = useStyles(sampleStyle);
  const subheader = useMemo(() => sample.redis_features.join(', '), [sample.redis_features]);

  const [isOpened, setIsOpened] = useState(false);
  const openSamplePopup = useCallback(() => {
    setIsOpened(true);
  }, [setIsOpened]);
  const closeSamplePopup = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  const tags = useMemo(
    () =>
      ['redis_commands', 'redis_features', 'redis_modules', 'special_tags'].map(
        (filter) =>
          sample[filter].map((tag) => (
            <Chip
              size="small"
              label={tag}
              key={tag}
              className={classes.chip}
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
    [sample, classes.chip, updateTags, closeSamplePopup, skeleton]
  );

  return (
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
      <CardActionArea disabled={skeleton} onClick={openSamplePopup} className={classes.dialogLink}>
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
          <Typography variant="body2" color="textSecondary" className={classes.language}>
            <LanguageIcon language={sample.language} className={classes.languageIcon} />
            {sample.language}
          </Typography>
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
          sampleStyle={sampleStyle}
        />
      )}
    </Card>
  );
}
