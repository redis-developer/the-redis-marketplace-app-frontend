import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  categoryHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: theme.spacing(1, 0)
  },
  tagsCategory: {
    marginBottom: theme.spacing(2)
  }
}));

export default function TagFilter({ tags, ...rest }) {
  const classes = useStyles();

  return (
    <Box {...rest}>
      {tags.map(({ category, options }) => (
        <FormGroup key={category} className={classes.tagsCategory}>
          <Box className={classes.categoryHeader}>{category}</Box>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              control={<Checkbox name={option} color="primary" />}
              label={option}
            />
          ))}
        </FormGroup>
      ))}
    </Box>
  );
}
