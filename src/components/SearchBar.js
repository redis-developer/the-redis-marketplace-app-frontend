import { Box, Grid, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useRequest } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '680px',
    width: '100%',
    margin: theme.spacing(4, 'auto'),
    padding: theme.spacing(0.25, 0.5),
    '& .MuiFormControl-root': {
      zIndex: 1301
    },
    '& .MuiFormLabel-root': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '85%'
    }
  },
  input: {
    boxSizing: 'border-box',
    paddingRight: `${theme.spacing(1)}px !important`,
    background: 'white',
    '& fieldset': {
      border: 'none !important'
    }
  },
  inputWithSuggestions: {
    borderRadius: '30px 30px 0 0',
    boxShadow: `0px -1px 0px ${theme.palette.borderColor} inset`
  },
  inputWithoutSuggestions: {
    borderRadius: '30px',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 0 10px 0 rgba(0,0,0,.1)'
  },
  icon: {
    color: theme.palette.icon
  },
  dropdown: {
    overflow: 'hidden',
    marginTop: '-57px',
    paddingTop: '57px',
    zIndex: 1,
    borderRadius: '30px',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 0 10px 0 rgba(0,0,0,.1)'
  },
  listBox: {
    padding: theme.spacing(0, 0, 5.25, 0),
    margin: 0,
    maxHeight: '45vh',
    overflow: 'scroll',
    '& .MuiAutocomplete-groupUl': {
      borderBottom: `1px solid ${theme.palette.borderColor}`
    }
  },
  footer: {
    alignItems: 'center',
    position: 'fixed',
    right: 0,
    zIndex: 1,
    bottom: '0px',
    minHeight: '44px',
    width: '100%',
    padding: theme.spacing(0.5, 2, 0.5, 2),
    backgroundColor: 'white',
    borderTop: `1px solid ${theme.palette.borderColor}`,
    borderRadius: '0 0 30px 30px',
    fontSize: '14px'
  },
  executeTime: {
    fontSize: '12px',
    fontWeight: 600
  },
  redisearch: {
    width: '28px',
    marginLeft: theme.spacing(0.5)
  },
  descriptionOptionAppName: {
    fontSize: '12px'
  }
}));

const LIMIT = 10;

export default function SearchBar({ updateTextFilter, openLinkedSample }) {
  const classes = useStyles();

  // autocompleteText for fetching suggestions
  const [autocompleteText, setAutocompleteText] = useState('');
  const suggestionParams = useMemo(
    () => ({
      text_filter: autocompleteText.trim(),
      limit: LIMIT,
      highlight: true
    }),
    [autocompleteText]
  );
  // Only fetch API for suggestions when more than 2 characters pressed
  const shouldFetch = useCallback(
    (params) => params.text_filter && params.text_filter.length > 2,
    []
  );
  const { data, loading, error } = useRequest({
    url: '/projects',
    params: suggestionParams,
    shouldFetch
  });

  const options = useMemo(
    () =>
      (!error &&
        !loading &&
        autocompleteText.trim().length > 2 &&
        data?.rows
          .map((sample) => {
            // Get group and label for each option
            if (sample.app_name.includes('<b>')) {
              sample.group = 'App Name';
              sample.label = sample.app_name;
            } else if (sample.description.includes('<b>')) {
              sample.group = 'Description';
              sample.label = sample.description;
            } else if (
              sample.redis_commands.some((redis_command) => redis_command.includes('<b>'))
            ) {
              sample.group = 'Redis Commands';
              sample.label = sample.redis_commands.join(', ');
            } else if (
              sample.redis_features.some((redis_feature) => redis_feature.includes('<b>'))
            ) {
              sample.group = 'Redis Features';
              sample.label = sample.redis_features.join(', ');
            } else if (sample.redis_modules.some((redis_module) => redis_module.includes('<b>'))) {
              sample.group = 'Redis Modules';
              sample.label = sample.redis_modules.join(', ');
            } else if (sample.special_tags.some((special_tag) => special_tag.includes('<b>'))) {
              sample.group = 'Special Tags';
              sample.label = sample.special_tags.join(', ');
            } else if (sample.verticals.some((vertical) => vertical.includes('<b>'))) {
              sample.group = 'Verticals';
              sample.label = sample.verticals.join(', ');
            } else if (sample.language.some((language) => language.includes('<b>'))) {
              sample.group = 'Language';
              sample.label = sample.language.join(', ');
            } else if (sample.type.includes('<b>')) {
              sample.group = 'Type';
              sample.label = sample.description;
            } else if (sample.contributed_by.includes('<b>')) {
              sample.group = 'Contributed By';
              sample.label = sample.contributed_by;
            }
            // Replace bold HTML tags
            sample.app_name = sample.app_name.replace('<b>', '').replace('</b>', '');
            sample.description = sample.description.replace('<b>', '').replace('</b>', '');
            sample.type = sample.type.replace('<b>', '').replace('</b>', '');
            sample.contributed_by = sample.contributed_by.replace('<b>', '').replace('</b>', '');
            sample.language = sample.language.map((language) =>
              language.replace('<b>', '').replace('</b>', '')
            );
            sample.redis_commands = sample.redis_commands.map((redis_command) =>
              redis_command.replace('<b>', '').replace('</b>', '')
            );
            sample.redis_features = sample.redis_features.map((redis_feature) =>
              redis_feature.replace('<b>', '').replace('</b>', '')
            );
            sample.redis_modules = sample.redis_modules.map((redis_module) =>
              redis_module.replace('<b>', '').replace('</b>', '')
            );
            sample.special_tags = sample.special_tags.map((special_tag) =>
              special_tag.replace('<b>', '').replace('</b>', '')
            );
            sample.verticals = sample.verticals.map((vertical) =>
              vertical.replace('<b>', '').replace('</b>', '')
            );
            return sample;
          })
          .sort((a, b) => a.group.localeCompare(b.group))) ||
      [],
    [error, data?.rows, loading, autocompleteText]
  );

  // Listener for typing
  const { callback: deouncedUpdateTextFilter } = useDebouncedCallback((text) => {
    updateTextFilter(text);
  }, 300);
  const onInputChange = useCallback(
    (e) => {
      setAutocompleteText(e?.target?.value || '');
      if (e?.target?.value?.length > 2 || e?.target?.value === '') {
        deouncedUpdateTextFilter(e.target.value.trim());
      }
    },
    [deouncedUpdateTextFilter]
  );

  // Action for selecting an option
  const onSelect = useCallback(
    (e, value) => {
      if (value?.app_name) {
        openLinkedSample(value);
        setAutocompleteText('');
      }
    },
    [openLinkedSample]
  );

  // Action for pressing enter without and option highlighted
  const onKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setAutocompleteText('');
        updateTextFilter(e.target.value.trim());
      }
    },
    [updateTextFilter]
  );

  const renderOption = useCallback(
    (option) => {
      if (option.group === 'App Name') {
        return <span dangerouslySetInnerHTML={{ __html: option.label }} />;
      } else {
        return (
          <Box>
            <Box className={classes.descriptionOptionAppName}>{option.app_name}</Box>
            <Box>
              <span dangerouslySetInnerHTML={{ __html: option.label }} />
            </Box>
          </Box>
        );
      }
    },
    [classes.descriptionOptionAppName]
  );

  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const renderInput = useCallback(
    (params) => (
      <TextField
        {...params}
        onKeyPress={onKeyPress}
        placeholder="Search app names, descriptions, Redis commands, languages, ect"
        variant="outlined"
        inputProps={{
          ...params.inputProps,
          value: autocompleteText
        }}
        InputProps={{
          ...params.InputProps,
          className: clsx(
            classes.input,
            suggestionsOpen && (loading || !!options.length)
              ? classes.inputWithSuggestions
              : classes.inputWithoutSuggestions
          ),
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={classes.icon} />
            </InputAdornment>
          )
        }}
      />
    ),
    [
      onKeyPress,
      suggestionsOpen,
      loading,
      options.length,
      autocompleteText,
      classes.inputWithSuggestions,
      classes.inputWithoutSuggestions,
      classes.input,
      classes.icon
    ]
  );

  const AutocompletePaper = useCallback(
    ({ children, ...rest }) => (
      <Paper {...rest} className={classes.dropdown} elevation={0}>
        {children}
        {suggestionsOpen && !loading && !!options.length && (
          <Grid container className={classes.footer}>
            <Grid item xs={6}>
              <Typography variant="body2" className={classes.executeTime}>
                Execution time: {data?.executeTime}s
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end" alignItems="center" wrap="nowrap">
                Powered by: Redisearch
                <img src="/redisearch.svg" alt="redisearch" className={classes.redisearch} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    ),
    [
      suggestionsOpen,
      loading,
      options.length,
      classes.dropdown,
      classes.footer,
      classes.executeTime,
      classes.redisearch,
      data?.executeTime
    ]
  );

  return (
    <Autocomplete
      id="asynchronous-demo"
      className={classes.root}
      clearOnBlur={false}
      open={suggestionsOpen && (loading || !!options.length)}
      onOpen={() => {
        setSuggestionsOpen(true);
      }}
      onClose={() => {
        setSuggestionsOpen(false);
      }}
      onInputChange={onInputChange}
      onChange={onSelect}
      disableClearable
      freeSolo
      getOptionSelected={() => false}
      getOptionLabel={(option) => option?.label || option}
      renderOption={renderOption}
      groupBy={(option) => option.group}
      options={options}
      ListboxProps={{ className: classes.listBox }}
      loading={loading}
      filterOptions={(options) => options}
      renderInput={renderInput}
      PaperComponent={AutocompletePaper}
    />
  );
}
