import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0, 0.5, 0.5, 0),
    fontWeight: 500,
    color: theme.palette.text.primary,
    '& span': {
      padding: theme.spacing(0.25, 1, 0.25, 2)
    },
    '&::before': {
      content: '""',
      width: theme.spacing(1),
      height: theme.spacing(1),
      borderRadius: '100%',
      position: 'absolute',
      left: theme.spacing(0.5)
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

export default function SampleTags({ sample, closePopup, updateTags, disabled }) {
  const classes = useStyles();
  let keynum = 0;
  const tags = useMemo(
    () =>
      ['redis_commands', 'redis_use_cases', 'redis_features', 'special_tags', 'verticals'].map(
        (filter) =>
          sample[filter].map((tag) => {
            keynum++;
            return (
              <Chip
                size="small"
                label={tag}
                key={tag + keynum}
                variant="outlined"
                className={clsx(classes.chip, classes[`chip_${filter}`])}
                onClick={(e) => {
                  e.stopPropagation();
                  updateTags({ [filter]: { [tag]: true } });
                  closePopup();
                }}
                disabled={disabled}
                color="secondary"
              />
            );
          })
      ),
    [sample, classes, updateTags, closePopup, disabled, keynum]
  );

  return <>{tags}</>;
}
