import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useCallback, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import api from '../api';
import { useRequest } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '550px',
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
  }
}));

export default function SearchBar({ updateTextFilter }) {
  const classes = useStyles();

  // searchText for pressing the IconButton
  const [searchText, setSearchText] = useState();

  // autocompleteText for fetching suggestions
  const [autocompleteText, setAutocompleteText] = useState();
  const [debouncedAutocompleteText] = useDebounce(autocompleteText, 300);
  const suggestionParams = useMemo(
    () => ({
      search_text: debouncedAutocompleteText,
      max: 5,
      fuzzy: true
    }),
    [debouncedAutocompleteText]
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
      loading={loading}
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
