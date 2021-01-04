import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useMemo, useState } from 'react';

import SampleDialog from './SampleDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '0 0 31%',
    marginBottom: theme.spacing(5),
    boxShadow: '1px 3px 30px 5px rgba(0,0,0,.07)',
    borderRadius: '5px'
  },
  description: {
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  },
  contribution: {
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(4),
    borderTop: `1px solid ${theme.palette.borderColor}`
  },
  appName: {
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical'
  },
  dialogLink: {
    padding: theme.spacing(1, 0),
    backgroundColor: (style) => style.light,
    color: (style) => style.main,
    '& p': {
      color: (style) => style.main
    },
    '&:hover': {
      textDecoration: 'none'
    }
  },
  header: {
    maxHeight: '35px'
  },
  avatar: {
    position: 'relative',
    top: '10px',
    zIndex: 1,
    backgroundColor: (style) => style.main
  },
  chip: {
    margin: theme.spacing(0, 0.5, 0.5, 0),
    fontWeight: 300
  },
  language: {
    marginBottom: theme.spacing(1)
  }
}));

export default function SampleCard(sample) {
  const theme = useTheme();
  const classes = useStyles(
    sample.type === 'Building Block' ? theme.palette.buildingBlock : theme.palette.application
  );
  const subheader = useMemo(() => sample.redis_features.join(', '), [sample.redis_features]);

  const tags = useMemo(
    () => [
      ...sample.redis_commands,
      ...sample.redis_features,
      ...sample.redis_modules,
      ...sample.special_tags,
      ...(sample.quick_deploy ? ['Quick Deploy'] : [])
    ],
    [
      sample.quick_deploy,
      sample.redis_commands,
      sample.redis_features,
      sample.redis_modules,
      sample.special_tags
    ]
  );

  const [isOpened, setIsOpened] = useState(false);
  const openSamplePopup = useCallback(() => {
    setIsOpened(true);
  }, [setIsOpened]);
  const closeSamplePopup = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  return (
    <Card key={sample.id} className={classes.root}>
      <CardHeader
        subheader={subheader}
        subheaderTypographyProps={{ variant: 'body2' }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        className={classes.header}
      />
      <CardActionArea onClick={openSamplePopup} className={classes.dialogLink}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" className={classes.appName}>
            {sample.app_name}
          </Typography>
          <Typography variant="body2" className={classes.description}>
            {sample.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="textSecondary" className={classes.language}>
          {sample.language}
        </Typography>
        {tags.map((tag) => (
          <Chip
            size="small"
            label={tag}
            key={tag}
            className={classes.chip}
            onClick={() => console.log(`TODO: filter for ${tag}`)}
            color="secondary"
          />
        ))}
        <Typography variant="body2" color="textSecondary" className={classes.contribution}>
          By {sample.contributed_by}
        </Typography>
      </CardContent>
      <SampleDialog sample={sample} closeSamplePopup={closeSamplePopup} isOpened={isOpened} />
    </Card>
  );
}
