import { Box, Chip, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  tags: {
    minHeight: '32px'
  },
  tag: {
    margin: theme.spacing(0, 1, 1, 0),
    transition: 'all .15s ease-in-out !important'
  },
  chip_type: {
    borderColor: theme.palette.filterCategoryColors.type.contrastText,
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.type.main} !important`
    }
  },
  chip_language: {
    borderColor: theme.palette.filterCategoryColors.language.contrastText,
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.language.main} !important`
    }
  },
  chip_contributed_by: {
    borderColor: theme.palette.filterCategoryColors.contributed_by.contrastText,
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.contributed_by.main} !important`
    }
  },
  chip_redis_modules: {
    borderColor: theme.palette.filterCategoryColors.redis_modules.contrastText,
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.redis_modules.main} !important`
    }
  },
  chip_verticals: {
    borderColor: theme.palette.filterCategoryColors.verticals.contrastText,
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.verticals.main} !important`
    }
  },
  chip_redis_features: {
    borderColor: theme.palette.filterCategoryColors.redis_features.contrastText,
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.redis_features.main} !important`
    }
  },
  chip_redis_commands: {
    borderColor: theme.palette.filterCategoryColors.redis_commands.contrastText,
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.redis_commands.main} !important`
    }
  },
  chip_special_tags: {
    borderColor: theme.palette.filterCategoryColors.special_tags.contrastText,
    '&:hover, &:active': {
      backgroundColor: `${theme.palette.filterCategoryColors.special_tags.main} !important`
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
                  className={clsx(classes.tag, classes[`chip_${filter}`])}
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
    <Box className={classes.tags}>
      {showClearFiltersChip && (
        <Grow in>
          <Chip
            label="Clear all filters"
            size="small"
            onClick={clearFilters}
            className={classes.tag}
          />
        </Grow>
      )}
      {textFilter && (
        <Grow in>
          <Chip
            label={textFilter}
            size="small"
            onDelete={() => updateTextFilter()}
            className={classes.tag}
          />
        </Grow>
      )}
      {tagChips}
    </Box>
  );
}
