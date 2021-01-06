import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useRef, useState } from 'react';

import { Link } from './';

const useStyles = makeStyles((theme) => ({
  menuList: {
    display: 'flex',
    padding: theme.spacing(7, 7, 4, 4)
  },
  menuTitle: {
    fontWeight: '600',
    padding: theme.spacing(0, 1.5)
  },
  category: {
    maxWidth: '200px'
  },
  categoryTitle: {
    paddingLeft: theme.spacing(2),
    fontWeight: '600',
    fontSize: '15px',
    paddingBottom: theme.spacing(1),
    color: theme.palette.appBar.contrastText
  },
  menuItem: {
    padding: theme.spacing(0.25, 2),
    '&:hover, &:active': {
      background: theme.palette.appBar.main
    },
    '&:hover p, &:active p': {
      fontWeight: '700'
    }
  },
  linkTitle: {
    color: theme.palette.appBar.contrastText,
    fontSize: '14px',
    transition: 'all .2s ease-in-out'
  }
}));

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
    <Box onMouseLeave={handleClose}>
      <Typography
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
            <Paper>
              <MenuList
                autoFocusItem={open}
                onMouseLeave={handleClose}
                id="menu-list-grow"
                className={classes.menuList}>
                {menuCategories.map(({ categoryTitle, links }) => (
                  <Box key={categoryTitle} className={classes.category}>
                    <Typography className={classes.categoryTitle}>{categoryTitle}</Typography>
                    {links.map(({ linkTitle, link }) => (
                      <MenuItem
                        className={classes.menuItem}
                        onClick={handleClose}
                        key={linkTitle}
                        component={Link}
                        naked
                        target="_blank"
                        href={link}>
                        <Typography variant="body2" className={classes.linkTitle}>
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
