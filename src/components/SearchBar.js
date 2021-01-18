import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
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
    bottom: '4px',
    minHeight: '44px',
    width: '100%',
    padding: theme.spacing(0.5, 0.5, 0.5, 2),
    backgroundColor: 'white',
    borderTop: `1px solid ${theme.palette.borderColor}`,
    borderRadius: theme.spacing(0, 0, 0.5, 0.5),
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

  const disabled = useMemo(() => autocompleteText.trim().length <= 2, [autocompleteText]);
  const options = useMemo(() => (!error && !disabled && !loading && data?.rows) || [], [
    error,
    disabled,
    data?.rows,
    loading
  ]);

  // Listener for typing
  const onInputChange = useCallback((e) => {
    setAutocompleteText(e?.target?.value || '');
  }, []);

  // Action for selecting an option
  const onSelect = useCallback(
    (e, value) => {
      if (value?.app_name) {
        const sample = { ...value };
        sample.app_name = value.app_name.replace('<b>', '').replace('</b>', '');
        sample.description = value.description.replace('<b>', '').replace('</b>', '');
        openLinkedSample(sample);
        setAutocompleteText('');
      }
    },
    [openLinkedSample]
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
    } else if (option?.app_name) {
      return option.app_name;
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

  const executeTime = useMemo(() => data?.executeTime, [data?.executeTime]);
  const AutocompletePaper = useCallback(
    ({ children, ...rest }) => (
      <Paper {...rest}>
        {children}
        {suggestionsOpen && !loading && !!options.length && (
          <Grid container className={classes.footer}>
            <Grid item xs={6}>
              <Typography variant="body2" className={classes.executeTime}>
                Execution time: {executeTime}s
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
      classes.footer,
      classes.executeTime,
      classes.redisearch,
      executeTime
    ]
  );

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
      PaperComponent={AutocompletePaper}
    />
  );
}
