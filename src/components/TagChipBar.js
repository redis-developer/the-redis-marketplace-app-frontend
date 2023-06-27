import { Box, Chip, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  chips: {
    minHeight: '32px'
  },
  chip: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.executionTimeBackground,
    margin: theme.spacing(0, 0.5, 0.5, 0),
    fontWeight: 500
  },
  tag: {
    position: 'relative',
    '& span': {
      padding: theme.spacing(0.25, 1, 0.25, 2)
    },
    transition: 'all .15s ease-in-out !important',
    '&::before': {
      content: '""',
      width: theme.spacing(1),
      height: theme.spacing(1),
      borderRadius: '100%',
      position: 'absolute',
      left: theme.spacing(0.5)
    }
  },
  chip_type: {
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.type.main} !important`
    },
    '&::before': {
      backgroundColor: theme.palette.filterCategoryColors.type.main
    }
  },
  chip_language: {
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.language.main} !important`
    },
    '&::before': {
      backgroundColor: theme.palette.filterCategoryColors.language.main
    }
  },
  chip_contributed_by: {
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.contributed_by.main} !important`
    },
    '&::before': {
      backgroundColor: theme.palette.filterCategoryColors.contributed_by.main
    }
  },
  chip_redis_features: {
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.redis_features.main} !important`
    },
    '&::before': {
      backgroundColor: theme.palette.filterCategoryColors.redis_features.main
    }
  },
  chip_verticals: {
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.verticals.main} !important`
    },
    '&::before': {
      backgroundColor: theme.palette.filterCategoryColors.verticals.main
    }
  },
  chip_redis_use_cases: {
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.redis_use_cases.main} !important`
    },
    '&::before': {
      backgroundColor: theme.palette.filterCategoryColors.redis_use_cases.main
    }
  },
  chip_redis_commands: {
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.redis_commands.main} !important`
    },
    '&::before': {
      backgroundColor: theme.palette.filterCategoryColors.redis_commands.main
    }
  },
  chip_special_tags: {
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.special_tags.main} !important`
    },
    '&::before': {
      backgroundColor: theme.palette.filterCategoryColors.special_tags.main
    }
  }
}));

export default function TagChipBar({
  tags,
  textFilter,
  updateTextFilter,
  updateTag,
  clearFilters
}) {
  const classes = useStyles();

  const tagChips = useMemo(
    () =>
      Object.keys(tags)
        .map((filter) =>
          Object.keys(tags[filter])
            .filter((tag) => tags[filter][tag])
            .map((tag) => (
              <Grow in key={tag}>
                <Chip
                  label={tag}
                  size="small"
                  variant="outlined"
                  onDelete={() => updateTag({ filter, tag, value: false })}
                  className={clsx(classes.tag, classes.chip, classes[`chip_${filter}`])}
                />
              </Grow>
            ))
        )
        .flat(),
    [tags, classes, updateTag]
  );

  const showClearFiltersChip = useMemo(
    () => !!(tagChips.length > 1 || (textFilter && tagChips.length)),
    [tagChips.length, textFilter]
  );

  return (
    <Box className={classes.chips}>
      {showClearFiltersChip && (
        <Grow in>
          <Chip
            label="Clear all filters"
            size="small"
            onClick={clearFilters}
            className={classes.chip}
          />
        </Grow>
      )}
      {textFilter && (
        <Grow in>
          <Chip
            label={textFilter}
            size="small"
            onDelete={() => updateTextFilter('')}
            className={classes.chip}
          />
        </Grow>
      )}
      {tagChips}
    </Box>
  );
}
