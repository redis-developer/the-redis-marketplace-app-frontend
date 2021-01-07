import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { FaCube, FaRegWindowRestore, FaUserCog, FaUsers } from 'react-icons/fa';
import { SiRedis } from 'react-icons/si';

import { LanguageIcon } from './';

export const staticFilters = [
  {
    category: { name: 'Language' },
    options: [
      { name: 'JavaScript', icon: <LanguageIcon language="JavaScript" className="filterIcon" /> },
      { name: 'Java', icon: <LanguageIcon language="Java" className="filterIcon" /> },
      { name: 'Python', icon: <LanguageIcon language="Python" className="filterIcon" /> },
      { name: 'GO', icon: <LanguageIcon language="GO" className="filterIcon" /> },
      { name: 'C#', icon: <LanguageIcon language="C#" className="filterIcon" /> },
      { name: 'Ruby', icon: <LanguageIcon language="Ruby" className="filterIcon" /> },
      { name: 'PHP', icon: <LanguageIcon language="PHP" className="filterIcon" /> }
    ]
  },
  {
    category: { name: 'Sample Type' },
    options: [
      { name: 'Building Block', icon: <FaCube className="filterIcon" /> },
      { name: 'Full App', icon: <FaRegWindowRestore className="filterIcon" /> }
    ]
  },
  {
    category: { name: 'Contributed By' },
    options: [
      { name: 'Redis Labs', icon: <SiRedis className="filterIcon" /> },
      { name: 'Community', icon: <FaUsers className="filterIcon" /> },
      { name: 'Partner', icon: <FaUserCog className="filterIcon" /> }
    ]
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .filterIcon': {
      marginRight: theme.spacing(1),
      height: '22px',
      width: '22px'
    }
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    paddingBottom: theme.spacing(1)
  },
  tagLabel: {
    transition: 'all .2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px'
  },
  tag: {
    '&:hover span, &:active span': {
      fontWeight: '600'
    }
  },
  tagsCategory: {
    marginBottom: theme.spacing(2.5)
  }
}));

export default function TagFilter({ className: classNameProps, dynamicFilters, ...rest }) {
  const classes = useStyles();
  const className = clsx(classNameProps, classes.root);
  const tags = useMemo(() => staticFilters.concat(dynamicFilters), [dynamicFilters]);

  return (
    <Box {...rest} className={className}>
      {tags.map(({ category, options }) => (
        <FormGroup key={category.name} className={classes.tagsCategory}>
          <Box className={classes.categoryHeader}>
            {category.icon}
            <span>{category.name}</span>
          </Box>
          {options.map((option) => (
            <FormControlLabel
              key={option.name}
              className={classes.tag}
              control={<Checkbox name={option.name} color="primary" />}
              label={
                <Box className={classes.tagLabel}>
                  {option.icon}
                  <span>{option.name}</span>
                </Box>
              }
            />
          ))}
        </FormGroup>
      ))}
    </Box>
  );
}
