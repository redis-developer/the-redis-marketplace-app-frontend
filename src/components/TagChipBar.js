import { Box, Chip, Grid, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  tags: {
    minHeight: '40px'
  },
  tag: {
    margin: theme.spacing(0, 1, 2, 0)
  },
  chip_type: {
    color: theme.palette.filterCategoryColors.type.contrastText
  },
  chip_language: {
    color: theme.palette.filterCategoryColors.language.contrastText
  },
  chip_contributed_by: {
    color: theme.palette.filterCategoryColors.contributed_by.contrastText
  },
  chip_redis_modules: {
    color: theme.palette.filterCategoryColors.redis_modules.contrastText
  },
  chip_verticals: {
    color: theme.palette.filterCategoryColors.verticals.contrastText
  },
  chip_redis_features: {
    color: theme.palette.filterCategoryColors.redis_features.contrastText
  },
  chip_redis_commands: {
    color: theme.palette.filterCategoryColors.redis_commands.contrastText
  },
  chip_special_tags: {
    color: theme.palette.filterCategoryColors.special_tags.contrastText
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
    <Grid container className={classes.tags}>
      <Grid item xs={2}></Grid>
      <Grid item xs={10}>
        <Box>
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
      </Grid>
    </Grid>
  );
}
