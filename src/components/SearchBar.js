import { CircularProgress, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React, { useCallback, useMemo, useState } from 'react';

import api from '../api';
import { useRequest } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '680px',
    margin: theme.spacing(4, 'auto'),
    padding: theme.spacing(0.25, 0.5),
    '& .MuiInputBase-root': {
      paddingRight: `${theme.spacing(1)}px !important`,
      background: 'white'
    }
  },
  iconButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(0.5)
  },
  listBox: {
    padding: 0,
    marginBottom: 0,
    '&::after': {
      display: 'flex',
      justifyContent: 'flex-end',
      borderTop: `1px solid ${theme.palette.borderColor}`,
      padding: theme.spacing(0.5),
      content: `url('/redisearch.png')`
    }
  }
}));

export default function SearchBar({ updateTextFilter }) {
  const classes = useStyles();

  // searchText for pressing the IconButton
  const [searchText, setSearchText] = useState();

  // autocompleteText for fetching suggestions
  const [autocompleteText, setAutocompleteText] = useState();
  const suggestionParams = useMemo(
    () => ({
      search_text: autocompleteText,
      max: 10,
      fuzzy: true
    }),
    [autocompleteText]
  );
  // Only fetch API for suggestions when more than 2 characters pressed
  const shouldFetch = useCallback(
    (params) => params.search_text && params.search_text.length > 2,
    []
  );
  const { data: options, loading } = useRequest(
    '/projects/suggestion',
    suggestionParams,
    shouldFetch
  );

  // Listener for typing
  const onInputChange = useCallback((e) => {
    setSearchText(e.target.value);
    setAutocompleteText(e.target.value);
  }, []);

  // Listener for selecting an option
  const onSelect = useCallback(
    (e, value) => {
      if (value?.suggestion) {
        api
          .post('/projects/suggestion', { term: value.suggestion, dictonary: value.dictonary })
          .catch(() => {});
        setSearchText(value.suggestion);
        updateTextFilter(value.suggestion);
      }
    },
    [updateTextFilter]
  );

  // Listener for pressing enter
  const onKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setSearchText(e.target.value);
        updateTextFilter(e.target.value);
      }
    },
    [updateTextFilter]
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
      getOptionLabel={(option) => option?.suggestion || option}
      options={options || []}
      ListboxProps={{ className: classes.listBox }}
      loading={loading}
      filterOptions={(options) => options}
      renderInput={(params) => (
        <TextField
          {...params}
          onKeyPress={onKeyPress}
          label="Search for a code sample"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                <IconButton
                  type="button"
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={() => updateTextFilter(searchText)}>
                  <SearchIcon />
                </IconButton>
              </>
            )
          }}
        />
      )}
    />
  );
}
