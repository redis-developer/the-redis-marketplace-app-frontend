import { Box, Checkbox, FormControlLabel, FormGroup, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useMemo, useState } from 'react';
import { FaCube, FaRegWindowRestore, FaUserCog, FaUsers } from 'react-icons/fa';
import { IoChevronDownCircle, IoChevronUpCircleSharp } from 'react-icons/io5';
import { SiRedis } from 'react-icons/si';

import { LanguageIcon } from './';

const staticFilters = [
  {
    category: {
      name: <Box className="category typeCategory">App Types</Box>,
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
      { name: 'PHP', icon: <LanguageIcon language="PHP" className="filterIcon" /> },
      { name: 'NodeJS', icon: <LanguageIcon language="NodeJS" className="filterIcon" /> }
    ]
  },
  {
    category: {
      name: <Box className="category contributedByCategory">Contributed By</Box>,
      filter: 'contributed_by'
    },
    options: [
      { name: 'Redis', filter: 'Redis Labs', icon: <SiRedis className="filterIcon" /> },
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
      width: '20px',
      color: theme.palette.icon
    },
    '& .category': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
      fontSize: '15px',
      fontWeight: 'bold',
      color: theme.palette.text.secondary,
      width: '100%',
      borderRadius: '0',
      padding: theme.spacing(1, 2, 1, 3),
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
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  checkbox: {
    padding: theme.spacing(1)
  },
  iconButton: {
    color: theme.palette.icon,
    padding: theme.spacing(1)
  }
}));

const REDIS_COMMANDS_LIMIT = 5;

const VERTICALS_PREFERRED_ORDER = [
  'Financial Services',
  'Retail',
  'Gaming',
  'Healthcare',
  'Others'
];
const reorderVericals = (verticals) => {
  const newVerticals = VERTICALS_PREFERRED_ORDER.filter((v) => verticals.includes(v));

  verticals.forEach((v) => {
    if (!VERTICALS_PREFERRED_ORDER.includes(v)) {
      newVerticals.push(v);
    } else {
      // skip
    }
  });

  return newVerticals;
};

export default function TagFilter({ updateTag, tags, filtersData }) {
  const classes = useStyles();

  const dynamicFilters = useMemo(() => {
    const formattedFilters = [];
    formattedFilters.push(staticFilters[1]);
    if (filtersData?.verticals?.length) {
      formattedFilters.push({
        category: {
          name: <Box className="category verticalsCategory">Verticals</Box>,
          filter: 'verticals'
        },
        options: reorderVericals(filtersData?.verticals).map((name) => ({ name }))
      });
    }

    if (filtersData?.redis_modules?.length) {
      formattedFilters.push({
        category: {
          name: <Box className="category redisModulesCategory">Modules</Box>,
          filter: 'redis_modules'
        },
        options: filtersData?.redis_modules.map((name) => ({ name }))
      });
    }
    formattedFilters.push(staticFilters[0]);

    formattedFilters.push(staticFilters[2]);

    if (filtersData?.redis_features?.length) {
      formattedFilters.push({
        category: {
          name: <Box className="category redisFeaturesCategory">Features</Box>,
          filter: 'redis_features'
        },
        options: filtersData?.redis_features.map((name) => ({ name }))
      });
    }
    if (filtersData?.redis_commands?.length) {
      formattedFilters.push({
        category: {
          name: <Box className="category redisCommandsCategory">Commands</Box>,
          filter: 'redis_commands'
        },
        options: filtersData?.redis_commands.map((name) => ({ name }))
      });
    }
    if (filtersData?.special_tags?.length) {
      formattedFilters.push({
        category: {
          name: <Box className="category specialTagsCategory">Special Tags</Box>,
          filter: 'special_tags'
        },
        options: filtersData?.special_tags.map((name) => ({ name }))
      });
    }
    return formattedFilters;
  }, [
    filtersData?.redis_commands,
    filtersData?.redis_features,
    filtersData?.redis_modules,
    filtersData?.special_tags,
    filtersData?.verticals
  ]);

  const [showAllCommands, setShowAllCommands] = useState(false);
  const toggleCommands = useCallback(() => setShowAllCommands((show) => !show), []);

  const filters = dynamicFilters;

  return (
    <Grid container className={classes.root} px={{ xs: 1, md: 6 }} pt={{ xs: 1, md: 6 }}>
      {filters.map(({ category, options }) => (
        <Grid item xs={6} sm={3} md={12} key={category.filter}>
          <FormGroup className={classes.tagsCategory}>
            <Grid container alignItems="center">
              {category.icon}
              {category.name}
            </Grid>
            {options.map(
              (option, i) =>
                (category.filter !== 'redis_commands' ||
                  showAllCommands ||
                  i < REDIS_COMMANDS_LIMIT) && (
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
                            tag: option.filter ?? e.target.name,
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
                )
            )}
            {category.filter === 'redis_commands' && options.length > REDIS_COMMANDS_LIMIT && (
              <Box ml={4}>
                <IconButton onClick={toggleCommands} className={classes.iconButton}>
                  {showAllCommands ? <IoChevronUpCircleSharp /> : <IoChevronDownCircle />}
                </IconButton>
              </Box>
            )}
          </FormGroup>
        </Grid>
      ))}
    </Grid>
  );
}
