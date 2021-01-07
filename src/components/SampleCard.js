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
import React, { useCallback, useMemo, useState } from 'react';

import { LanguageIcon, SampleDialog } from './';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 32%',
    marginBottom: theme.spacing(2.5),
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 7px 17px 0 rgba(0,0,0,.1)',
    borderRadius: '10px'
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
    fontWeight: '800'
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
    backgroundColor: (sampleStyle) => sampleStyle.main
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

export default function SampleCard(sample) {
  const theme = useTheme();
  const sampleStyle = useMemo(
    () =>
      sample.type === 'Building Block' ? theme.palette.buildingBlock : theme.palette.application,
    [sample.type, theme.palette.application, theme.palette.buildingBlock]
  );
  const classes = useStyles(sampleStyle);
  const subheader = useMemo(() => sample.redis_features.join(', '), [sample.redis_features]);

  const tags = useMemo(
    () =>
      [
        ...sample.redis_commands,
        ...sample.redis_features,
        ...sample.redis_modules,
        ...sample.special_tags,
        ...(sample.quick_deploy ? ['Quick Deploy'] : [])
      ].map((tag) => (
        <Chip
          size="small"
          label={tag}
          key={tag}
          className={classes.chip}
          onClick={() => console.log(`TODO: filter for ${tag}`)}
          color="secondary"
        />
      )),
    [
      classes.chip,
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
        subheaderTypographyProps={{ variant: 'body2', className: classes.subHeader }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        className={classes.header}
      />
      <CardActionArea onClick={openSamplePopup} className={classes.dialogLink}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
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
      <SampleDialog
        tags={tags}
        sample={sample}
        closeSamplePopup={closeSamplePopup}
        isOpened={isOpened}
        sampleStyle={sampleStyle}
      />
    </Card>
  );
}
