import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';

import { Link } from './';

const useStyles = makeStyles((theme) => ({
  resultsHeader: {
    marginBottom: '40px'
  },
  resultsBody: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    '&::after': {
      content: '""',
      flex: '0 0 31%'
    }
  },
  sampleCard: {
    flex: '0 0 31%',
    marginBottom: '40px',
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
    paddingTop: '10px',
    marginTop: '30px',
    borderTop: `1px solid ${theme.palette.borderColor}`
  },
  appName: {
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical'
  },
  cardLink: {
    padding: '10px 0',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  cardHeader: {
    maxHeight: '35px'
  },
  cardAvatar: {
    position: 'relative',
    top: '10px',
    zIndex: 1
  },
  application: {
    '& $cardAvatar': {
      backgroundColor: theme.palette.application.main
    },
    '& $cardLink': {
      backgroundColor: theme.palette.application.light,
      color: theme.palette.application.main,
      '& p': {
        color: theme.palette.application.main
      }
    }
  },
  integration: {
    '& $cardAvatar': {
      backgroundColor: theme.palette.integration.main
    },
    '& $cardLink': {
      backgroundColor: theme.palette.integration.light,
      color: theme.palette.integration.main,
      '& p': {
        color: theme.palette.integration.main
      }
    }
  },
  buildingBlock: {
    '& $cardAvatar': {
      backgroundColor: theme.palette.buildingBlock.main
    },
    '& $cardLink': {
      backgroundColor: theme.palette.buildingBlock.light,
      color: theme.palette.buildingBlock.main,
      '& p': {
        color: theme.palette.buildingBlock.main
      }
    }
  }
}));

export default function Results({ samples, ...rest }) {
  const classes = useStyles();

  return (
    <div {...rest}>
      <Typography variant="h5" className={classes.resultsHeader}>
        Results:
      </Typography>
      <div className={classes.resultsBody}>
        {samples.map((sample) => {
          const cardClass = clsx(
            classes.sampleCard,
            sample.type === 'Integration'
              ? classes.integration
              : sample.type === 'Building Block'
              ? classes.buildingBlock
              : classes.application
          );
          return (
            <Card key={sample.id} className={cardClass}>
              <CardHeader
                subheader={sample.type}
                subheaderTypographyProps={{ variant: 'body2' }}
                avatar={
                  <Avatar aria-label="recipe" className={classes.cardAvatar}>
                    R
                  </Avatar>
                }
                className={classes.cardHeader}
              />
              <CardActionArea
                className={classes.cardLink}
                component={Link}
                href={`/samples/${sample.id}`}>
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
                <Typography variant="body2" color="textSecondary">
                  {sample.language}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={classes.contribution}>
                  By {sample.contributed_by}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
