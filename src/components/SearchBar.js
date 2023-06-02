import {
  Box,
  Grid,
  Input,
  InputAdornment,
  Paper,
  Popper,
  TextField,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { Scrollbars } from 'react-custom-scrollbars';
import scrollIntoView from 'scroll-into-view-if-needed';
import { useDebouncedCallback } from 'use-debounce';

import { useRequest } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    // maxWidth: '680px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '10px',
    paddingRight: `${theme.spacing(1)}px !important`,
    background: 'white',
    marginTop: '10px',
    paddingLeft: '15px',
    // margin: theme.spacing(4, 'auto', 3),
    padding: theme.spacing(0.25, 0.5),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(3, 'auto', 4)
    },
    '& .MuiFormControl-root': {
      zIndex: 1301
    },
    '& .MuiFormLabel-root': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '85%'
    },
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  logoRedis: {
    display: 'flex',
    alignSelf: 'stretch',
    marginTop: '10px',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(3, 'auto', 4)
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    background: '#FFF',
    flexDirection: 'column',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    padding: '0px 10px',
    alignItems: 'center',
    boxShadow: '-3px 0px 3px 1px #323954'
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
    borderRadius: '5px 5px 0 0'
  },
  inputWithoutSuggestions: {
    borderRadius: '5px'
  },
  icon: {
    color: theme.palette.icon,
    width: '40px',
    height: '40px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  dropdown: {
    overflow: 'hidden',
    marginTop: '-57px',
    paddingTop: '57px',
    paddingLeft: '0',
    zIndex: 1,
    borderRadius: '5px',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07), 0 0 10px 0 rgba(0,0,0,.1)'
  },
  listBox: {
    padding: theme.spacing(0, 0, 5.25, 0),
    margin: 0,
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
    fontWeight: 600,
    color: 'white'
  },
  redisearch: {
    width: '28px',
    marginLeft: theme.spacing(0.5)
  },
  descriptionOptionAppName: {
    fontSize: '12px'
  },
  scrollBarThumb: {
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    borderRadius: 'inherit'
  },
  scrollBarTrack: {
    right: '2px',
    bottom: '2px',
    top: '2px',
    borderRadius: '3px',
    zIndex: 2
  }
}));

const LIMIT = 10;

export default function SearchBar({ textFilter, updateTextFilter, openLinkedSample }) {
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

  // clear the autocomplete when textfilter is cleared
  useEffect(() => {
    if (!textFilter) {
      setAutocompleteText('');
    }
  }, [textFilter]);
  // Only fetch API for suggestions when more than 2 characters pressed
  const preCheckParams = useCallback(
    (params) => params.text_filter && params.text_filter.length > 2,
    []
  );
  const { data, loading, error } = useRequest({
    url: '/projects',
    params: suggestionParams,
    preCheckParams
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
          .sort((a, b) => (a.group ? a.group.localeCompare(b.group) : -1))) ||
      [],
    [error, data?.rows, loading, autocompleteText]
  );

  // Listener for typing
  const { callback: debouncedUpdateTextFilter } = useDebouncedCallback((text) => {
    updateTextFilter(text);
  }, 300);
  const onInputChange = useCallback(
    (e) => {
      setAutocompleteText(e?.target?.value || '');
      if (e?.target?.value?.length > 2 || e?.target?.value === '') {
        debouncedUpdateTextFilter(e.target.value.trim());
      }
    },
    [debouncedUpdateTextFilter]
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

  // Action for clicking on the searchbar
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const onOpen = useCallback(() => {
    if (isSmallScreen) {
      scrollIntoView(document.getElementById('search-bar'), {
        block: 'start',
        behavior: 'smooth'
      });
    }
    setSuggestionsOpen(true);
  }, [isSmallScreen]);

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
        placeholder="Search app names, descriptions, Redis commands, languages, etc"
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

  //   const ScrollBarThumb = useCallback(
  //     (props) => <div {...props} className={classes.scrollBarThumb} />,
  //     [classes.scrollBarThumb]
  //   );
  //   const ScrollBarTrack = useCallback(
  //     (props) => <div {...props} className={classes.scrollBarTrack} />,
  //     [classes.scrollBarTrack]
  //   );

  //   const AutocompletePaper = useCallback(
  //     ({ children, ...rest }) => (
  //       <Paper {...rest} className={classes.dropdown} elevation={0}>
  //         <Scrollbars
  //           universal={true}
  //           autoHide
  //           autoHeight
  //           autoHeightMax="50vh"
  //           renderThumbVertical={ScrollBarThumb}
  //           renderTrackVertical={ScrollBarTrack}>
  //           {children}
  //         </Scrollbars>
  //         {suggestionsOpen && !loading && !!options.length && (
  //           <Grid container className={classes.footer}>
  //             <Grid item xs={6}>
  //               <Typography component={'div'} variant="body2" className={classes.executeTime}>
  //                 Search time: {data?.executeTime} secs
  //               </Typography>
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Grid container justify="flex-end" alignItems="center" wrap="nowrap">
  //                 Powered by Redis
  //                 <Image
  //                   width={28}
  //                   height={23}
  //                   src="/redisearch.svg"
  //                   alt="redisearch"
  //                   className={classes.redisearch}
  //                 />
  //               </Grid>
  //             </Grid>
  //           </Grid>
  //         )}
  //       </Paper>
  //     ),
  //     [
  //       classes.dropdown,
  //       classes.footer,
  //       classes.executeTime,
  //       classes.redisearch,
  //       ScrollBarThumb,
  //       ScrollBarTrack,
  //       suggestionsOpen,
  //       loading,
  //       options.length,
  //       data?.executeTime
  //     ]
  //   );

  const AutocompletePopper = useCallback(
    ({ children, ...rest }) => (
      <Popper
        {...rest}
        modifiers={{
          flip: {
            enabled: false
          }
        }}>
        {children}
      </Popper>
    ),
    []
  );

  return (
    <Grid
      style={{
        display: 'flex',
        alignItems: 'center'
      }}>
      <Autocomplete
        id="search-bar"
        autoComplete={false}
        className={classes.root}
        clearOnBlur={false}
        // open={suggestionsOpen && (loading || !!options.length)}
        open={false}
        onOpen={onOpen}
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
        // PaperComponent={AutocompletePaper}
        PopperComponent={AutocompletePopper}
      />
      <Grid className={classes.logoRedis}>
        <Image
          width={28}
          height={23}
          src="/redisearch.svg"
          alt="redisearch"
          className={classes.redisearch}
        />
        <Grid container style={{ fontSize: '0.8rem', marginTop: '5px' }}>
          Powered by Redis
        </Grid>
      </Grid>
    </Grid>
  );
}
