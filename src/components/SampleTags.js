import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0, 0.5, 0.5, 0),
    fontWeight: 500,
    color: theme.palette.text.primary
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

export default function SampleTags({ sample, closePopup, updateTags, disabled }) {
  const classes = useStyles();

  const tags = useMemo(
    () =>
      ['redis_commands', 'redis_features', 'redis_modules', 'special_tags', 'verticals'].map(
        (filter) =>
          sample[filter].map((tag) => (
            <Chip
              size="small"
              label={tag}
              key={tag}
              variant="outlined"
              className={clsx('chip', classes.chip, classes[`chip_${filter}`])}
              onClick={() => {
                updateTags({ [filter]: { [tag]: true } });
                closePopup();
              }}
              disabled={disabled}
              color="secondary"
            />
          ))
      ),
    [sample, classes, updateTags, closePopup, disabled]
  );

  return <>{tags}</>;
}
