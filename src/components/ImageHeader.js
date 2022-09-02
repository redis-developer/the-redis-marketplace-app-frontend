import { Grid, Grow, Typography } from '@material-ui/core';
import { Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { iconTool } from '../constants';

const useStyles = makeStyles(
  (theme) => ({
    iconArea: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: theme.spacing(2)
    },
    marketplace: {
      fontSize: '4.5rem',
      fontFamily: 'Mulish, sans-serif',
      fontWeight: 600,
      lineHeight: 1.2
    },
    subtitle1: {
      color: '#FFF',
      fontSize: '2.5rem',
      fontFamily: 'Mulish, sans-serif',
      fontWeight: 600,
      lineHeight: 1.5
    },
    title: {
      marginTop: theme.spacing(4)
    },
    iconToolWrapper: {
      margin: '5px 5px',
      width: '80px',
      height: '80px',
      minHeight: '80px',
      minWidth: '80px',
      position: 'relative'
    },
    iconToolOpen: {
      cursor: 'pointer',
      opacity: 1
    }
  }),
  {
    name: 'MuiImageHeaderStyles'
  }
);

const ImageHeader = ({ isOpen }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.iconArea} container>
      <Grid item md={6} className={classes.title}>
        <Typography component={'div'} className={classes.marketplace}>
          Redis Launchpad
        </Typography>
        <Typography component={'div'} className={classes.subtitle1}>
          Build fast apps faster{' '}
          <span role="img" aria-label="launch">
            🚀
          </span>
        </Typography>
        {/* <Typography component={'div'} className={classes.subtitle2}>
          Get started with 75+ sample apps.
        </Typography> */}
      </Grid>
      <Grid item md={6} style={{ maxWidth: '600px' }}>
        <Grid container>
          {iconTool[0].row.map(({ imgSrc }) => {
            let animationTime = Math.random() * 0.5;
            let animationTimeStr = animationTime.toString() + 's';
            return (
              <Grid item md={2} key={imgSrc}>
                <Zoom in={isOpen} style={{ transitionDelay: animationTimeStr }}>
                  <div className={classes.iconToolWrapper}>
                    <Image
                      layout="fill"
                      objectFit="contain"
                      className={classes.en}
                      src={imgSrc}
                      alt=""
                    />
                  </div>
                </Zoom>
              </Grid>
            );
          })}
        </Grid>
        <Grid container>
          {iconTool[1].row.map(({ imgSrc }) => {
            let animationTime = Math.random() * 0.5;
            let animationTimeStr = animationTime.toString() + 's';
            return (
              <Grid item md={2} key={imgSrc}>
                <Zoom in={isOpen} style={{ transitionDelay: animationTimeStr }}>
                  <div className={classes.iconToolWrapper}>
                    <Image
                      layout="fill"
                      objectFit="contain"
                      className={classes.iconToolOpen}
                      src={imgSrc}
                      alt=""
                    />
                  </div>
                </Zoom>
              </Grid>
            );
          })}
        </Grid>
        <Grid container>
          {iconTool[2].row.map(({ imgSrc }) => {
            let animationTime = Math.random() * 0.5;
            let animationTimeStr = animationTime.toString() + 's';
            return (
              <Grid item md={2} key={imgSrc}>
                <Zoom in={isOpen} style={{ transitionDelay: animationTimeStr }}>
                  <div className={classes.iconToolWrapper}>
                    <Image
                      layout="fill"
                      objectFit="contain"
                      className={classes.iconToolOpen}
                      src={imgSrc}
                      alt=""
                    />
                  </div>
                </Zoom>
              </Grid>
            );
          })}
        </Grid>
        <Grid container>
          {iconTool[3].row.map(({ imgSrc }) => {
            let animationTime = Math.random() * 0.5;
            let animationTimeStr = animationTime.toString() + 's';
            return (
              <Grid item md={2} key={imgSrc}>
                <Zoom in={isOpen} style={{ transitionDelay: animationTimeStr }}>
                  <div className={classes.iconToolWrapper}>
                    <Image
                      layout="fill"
                      objectFit="contain"
                      className={classes.iconToolOpen}
                      src={imgSrc}
                      alt=""
                    />
                  </div>
                </Zoom>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ImageHeader;
