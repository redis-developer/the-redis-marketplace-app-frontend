import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo } from 'react';
import { FaCube, FaRegWindowRestore, FaUserCog, FaUsers } from 'react-icons/fa';
import { SiRedis } from 'react-icons/si';

import { useRequest } from '../hooks';
import { LanguageIcon } from './';

const staticFilters = [
  {
    category: { name: 'Language', filter: 'language' },
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
    category: { name: 'Sample Type', filter: 'type' },
    options: [
      { name: 'Building Block', icon: <FaCube className="filterIcon" /> },
      { name: 'Full App', icon: <FaRegWindowRestore className="filterIcon" /> }
    ]
  },
  {
    category: { name: 'Contributed By', filter: 'contributed_by' },
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
    fontSize: '16px',
    fontWeight: 'bold',
    paddingBottom: theme.spacing(1)
  },
  tagLabel: {
    transition: 'all .2s ease-in-out',
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

export default function TagFilter({ updateTag, tags }) {
  const classes = useStyles();

  const { data } = useRequest('/projects/filters');
  const dynamicFilters = useMemo(() => {
    const formattedFilters = [];
    if (data?.redis_modules?.length) {
      formattedFilters.push({
        category: { name: 'Modules', filter: 'redis_modules' },
        options: data?.redis_modules.map((name) => ({ name }))
      });
    }
    if (data?.redis_commands?.length) {
      formattedFilters.push({
        category: { name: 'Commands', filter: 'redis_commands' },
        options: data?.redis_commands.map((name) => ({ name }))
      });
    }
    if (data?.redis_features?.length) {
      formattedFilters.push({
        category: { name: 'Features', filter: 'redis_features' },
        options: data?.redis_features.map((name) => ({ name }))
      });
    }
    if (data?.special_tags?.length) {
      formattedFilters.push({
        category: { name: 'Special Tags', filter: 'special_tags' },
        options: data?.special_tags.map((name) => ({ name }))
      });
    }
    return formattedFilters;
  }, [data?.redis_commands, data?.redis_features, data?.redis_modules, data?.special_tags]);
  const filters = useMemo(() => staticFilters.concat(dynamicFilters), [dynamicFilters]);

  return (
    <Box className={classes.root}>
      {filters.map(({ category, options }) => (
        <FormGroup key={category.name} className={classes.tagsCategory}>
          <Grid className={classes.categoryHeader} container alignItems="center">
            {category.icon}
            {category.name}
          </Grid>
          {options.map((option) => (
            <FormControlLabel
              key={option.name}
              className={classes.tag}
              checked={!!tags[category.filter]?.[option.name]}
              control={
                <Checkbox
                  name={option.name}
                  color="primary"
                  onChange={(e) =>
                    updateTag({
                      filter: category.filter,
                      tag: e.target.name,
                      value: e.target.checked
                    })
                  }
                />
              }
              label={
                <Grid className={classes.tagLabel} container alignItems="center">
                  {option.icon}
                  {option.name}
                </Grid>
              }
            />
          ))}
        </FormGroup>
      ))}
    </Box>
  );
}
