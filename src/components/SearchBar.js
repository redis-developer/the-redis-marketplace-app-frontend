import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import Router from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';

import { useRequest } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '680px',
    width: '100%',
    margin: theme.spacing(4, 'auto'),
    padding: theme.spacing(0.25, 0.5),
    '& .MuiInputBase-root': {
      paddingRight: `${theme.spacing(1)}px !important`,
      background: 'white'
    }
  },
  iconButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
    height: '100%',
    position: 'absolute',
    right: 0,
    boxShadow: 'none',
    borderRadius: '0 4px 4px 0'
  },
  listBox: {
    padding: theme.spacing(0, 0, 5, 0),
    margin: 0,
    maxHeight: '420px',
    overflow: 'scroll',
    '&::after': {
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'fixed',
      right: 0,
      bottom: '4px',
      height: '44px',
      width: '100%',
      padding: theme.spacing(0.5),
      content: `url('/redisearch.png')`,
      backgroundColor: 'white',
      borderTop: `1px solid ${theme.palette.borderColor}`,
      borderRadius: theme.spacing(0, 0, 0.5, 0.5)
    },
    '& .MuiAutocomplete-groupUl': {
      borderBottom: `1px solid ${theme.palette.borderColor}`
    }
  },
  descriptionOptionAppName: {
    fontSize: '12px'
  }
}));

const LIMIT = 10;

export default function SearchBar({ updateTextFilter, setLinkedAppName }) {
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
  const { data, loading, error } = useRequest('/projects', suggestionParams, shouldFetch);

  const disabled = useMemo(() => autocompleteText.trim().length <= 2, [autocompleteText]);
  const options = useMemo(() => (!error && !disabled && !loading && data?.rows) || [], [
    error,
    disabled,
    data?.rows,
    loading
  ]);

  // Listener for typing
  const onInputChange = useCallback((e) => {
    setAutocompleteText(e.target.value || '');
  }, []);

  // Action for selecting an option
  const onSelect = useCallback(
    (e, value) => {
      if (value?.app_name) {
        const app_name = value.app_name.replace('<b>', '').replace('</b>', '');
        setLinkedAppName(app_name);
        updateTextFilter(app_name);
        Router.push({
          pathname: '/',
          query: { app_name }
        });
        setAutocompleteText('');
      }
    },
    [updateTextFilter, setLinkedAppName]
  );

  // Action for pressing enter without and option select
  const onKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter' && !disabled) {
        e.preventDefault();
        setAutocompleteText('');
        updateTextFilter(e.target.value.trim());
      }
    },
    [updateTextFilter, disabled]
  );

  // Action for pressing the IconButton
  const onIconButtonClick = useCallback(() => {
    setAutocompleteText('');
    updateTextFilter(autocompleteText.trim());
  }, [autocompleteText, updateTextFilter]);

  const getOptionLabel = useCallback((option) => {
    if (option?.app_name?.includes('<b>')) {
      return option.app_name.replace('<b>', '').replace('</b>', '');
    } else if (option?.description?.includes('<b>')) {
      return option.description.replace('<b>', '').replace('</b>', '');
    } else {
      return option;
    }
  }, []);

  const renderOption = useCallback(
    (option) => {
      if (option.app_name.includes('<b>')) {
        return <span dangerouslySetInnerHTML={{ __html: option.app_name }} />;
      } else if (option.description.includes('<b>')) {
        return (
          <Box>
            <Box className={classes.descriptionOptionAppName}>{option.app_name}</Box>
            <Box>
              <span dangerouslySetInnerHTML={{ __html: option.description }} />
            </Box>
          </Box>
        );
      }
    },
    [classes.descriptionOptionAppName]
  );

  const groupBy = useCallback((option) => {
    if (option.app_name.includes('<b>')) {
      return 'App Name';
    } else if (option.description.includes('<b>')) {
      return 'Description';
    }
  }, []);

  const renderInput = useCallback(
    (params) => (
      <TextField
        {...params}
        onKeyPress={onKeyPress}
        label="Search for a code sample"
        variant="outlined"
        inputProps={{
          ...params.inputProps,
          value: autocompleteText
        }}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              <Button
                variant="contained"
                type="button"
                color="primary"
                className={classes.iconButton}
                aria-label="search"
                disabled={disabled}
                onClick={onIconButtonClick}>
                <SearchIcon />
              </Button>
            </>
          )
        }}
      />
    ),
    [onKeyPress, autocompleteText, loading, classes.iconButton, disabled, onIconButtonClick]
  );

  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  return (
    <Autocomplete
      id="asynchronous-demo"
      className={classes.root}
      clearOnBlur={false}
      open={suggestionsOpen}
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
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      groupBy={groupBy}
      options={options}
      ListboxProps={{ className: classes.listBox }}
      loading={loading}
      filterOptions={(options) => options}
      renderInput={renderInput}
    />
  );
}
