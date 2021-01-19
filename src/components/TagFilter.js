import { Box, Checkbox, FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo } from 'react';
import { FaCube, FaRegWindowRestore, FaUserCog, FaUsers } from 'react-icons/fa';
import { SiRedis } from 'react-icons/si';

import { useRequest } from '../hooks';
import { LanguageIcon } from './';

const staticFilters = [
  {
    category: {
      name: <Box className="category typeCategory">Sample Type</Box>,
      filter: 'type'
    },
    options: [
      { name: 'Building Block', icon: <FaCube className="filterIcon" /> },
      { name: 'Full App', icon: <FaRegWindowRestore className="filterIcon" /> }
    ]
  },
  {
    category: {
      name: <Box className="category languageCategory">Language</Box>,
      filter: 'language'
    },
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
    category: {
      name: <Box className="category contributedByCategory">Contributed By</Box>,
      filter: 'contributed_by'
    },
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
      height: '20px',
      width: '20px'
    },
    '& .category': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
      fontSize: '15px',
      fontWeight: 'bold',
      width: '100%',
      borderRadius: '0',
      padding: theme.spacing(2, 2, 2, 3),
      '&::before': {
        content: '""',
        width: '15px',
        height: '15px',
        borderRadius: '100%',
        position: 'absolute',
        left: 0
      }
    },
    '& .typeCategory::before': {
      backgroundColor: theme.palette.filterCategoryColors.type.main
    },
    '& .languageCategory::before': {
      backgroundColor: theme.palette.filterCategoryColors.language.main
    },
    '& .contributedByCategory::before': {
      backgroundColor: theme.palette.filterCategoryColors.contributed_by.main
    },
    '& .redisModulesCategory::before': {
      backgroundColor: theme.palette.filterCategoryColors.redis_modules.main
    },
    '& .verticalsCategory::before': {
      backgroundColor: theme.palette.filterCategoryColors.verticals.main
    },
    '& .redisFeaturesCategory::before': {
      backgroundColor: theme.palette.filterCategoryColors.redis_features.main
    },
    '& .redisCommandsCategory::before': {
      backgroundColor: theme.palette.filterCategoryColors.redis_commands.main
    },
    '& .specialTagsCategory::before': {
      backgroundColor: theme.palette.filterCategoryColors.special_tags.main
    }
  },
  categoryHeader: {
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
  },
  checkbox: {
    padding: theme.spacing(1)
  }
}));

export default function TagFilter({ updateTag, tags }) {
  const classes = useStyles();

  const { data } = useRequest({ url: '/projects/filters' });

  const dynamicFilters = useMemo(() => {
    const formattedFilters = [];
    if (data?.redis_modules?.length) {
      formattedFilters.push({
        category: {
          name: <Box className="category redisModulesCategory">Modules</Box>,
          filter: 'redis_modules'
        },
        options: data?.redis_modules.map((name) => ({ name }))
      });
    }
    if (data?.verticals?.length) {
      formattedFilters.push({
        category: {
          name: <Box className="category verticalsCategory">Verticals</Box>,
          filter: 'verticals'
        },
        options: data?.verticals.map((name) => ({ name }))
      });
    }
    if (data?.redis_features?.length) {
      formattedFilters.push({
        category: {
          name: <Box className="category redisFeaturesCategory">Features</Box>,
          filter: 'redis_features'
        },
        options: data?.redis_features.map((name) => ({ name }))
      });
    }
    if (data?.redis_commands?.length) {
      formattedFilters.push({
        category: {
          name: <Box className="category redisCommandsCategory">Commands</Box>,
          filter: 'redis_commands'
        },
        options: data?.redis_commands.map((name) => ({ name }))
      });
    }
    if (data?.special_tags?.length) {
      formattedFilters.push({
        category: {
          name: <Box className="category specialTagsCategory">Special Tags</Box>,
          filter: 'special_tags'
        },
        options: data?.special_tags.map((name) => ({ name }))
      });
    }
    return formattedFilters;
  }, [
    data?.redis_commands,
    data?.redis_features,
    data?.redis_modules,
    data?.special_tags,
    data?.verticals
  ]);

  const filters = useMemo(() => staticFilters.concat(dynamicFilters), [dynamicFilters]);

  return (
    <Grid container className={classes.root}>
      {filters.map(({ category, options }) => (
        <Grid item xs={6} sm={3} md={12} key={category.filter}>
          <FormGroup className={classes.tagsCategory}>
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
                    size="small"
                    className={classes.checkbox}
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
        </Grid>
      ))}
    </Grid>
  );
}
