import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0, 0.5, 0.5, 0),
    fontWeight: 500
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
