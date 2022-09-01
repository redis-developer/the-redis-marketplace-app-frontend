import { Box, Grow, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useRef, useState } from 'react';

import { Link } from './';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: '100%'
    },
    menuList: {
      display: 'flex',
      padding: theme.spacing(4, 3.5, 4.5, 3.5),
      boxShadow:
        '0 100px 80px 0 rgba(0,0,0,.07), 0 41.8px 33.4px 0 rgba(0,0,0,.05), 0 22.3px 17.9px 0 rgba(0,0,0,.04), 0 12.5px 10px 0 rgba(0,0,0,.04), 0 6.7px 5.3px 0 rgba(0,0,0,.03), 0 2.8px 2.2px 0 rgba(0,0,0,.02)'
    },
    menuTitle: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      fontWeight: '600',
      padding: theme.spacing(0, 1.5),
      cursor: 'default'
    },
    category: {
      width: '200px'
    },
    categoryTitle: {
      paddingLeft: theme.spacing(2),
      fontWeight: '600',
      fontSize: '15px',
      paddingBottom: theme.spacing(1),
      color: theme.palette.appBar.contrastText,
      cursor: 'default'
    },
    menuItem: {
      padding: theme.spacing(0.25, 2),
      '&:hover, &:active': {
        background: theme.palette.appBar.main
      },
      '&:hover p, &:active p': {
        fontWeight: '600'
      }
    },
    linkTitle: {
      color: theme.palette.appBar.contrastText,
      fontSize: '14px',
      transition: 'all .2s ease-in-out'
    }
  }),
  {
    name: 'MuiToolbarMenuStyle'
  }
);

export default function ToolbarMenu({ menuTitle, menuCategories }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box onMouseLeave={handleClose} className={classes.root}>
      <Typography
        component={'div'}
        variant="body2"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        className={classes.menuTitle}
        onMouseOver={handleOpen}>
        {menuTitle}
      </Typography>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom-start"
        disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={0} square>
              <MenuList
                autoFocusItem={open}
                onMouseLeave={handleClose}
                id="menu-list-grow"
                className={classes.menuList}>
                {menuCategories.map(({ categoryTitle, links }) => (
                  <Box key={categoryTitle} className={classes.category}>
                    <Typography component={'div'} className={classes.categoryTitle}>
                      {categoryTitle}
                    </Typography>
                    {links.map(({ linkTitle, link }) => (
                      <MenuItem
                        className={classes.menuItem}
                        onClick={handleClose}
                        key={linkTitle}
                        component={Link}
                        naked
                        target="_blank"
                        href={link}>
                        <Typography component={'div'} variant="body2" className={classes.linkTitle}>
                          {linkTitle}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Box>
                ))}
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
