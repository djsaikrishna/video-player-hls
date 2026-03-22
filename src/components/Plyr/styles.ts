import styled from 'styled-components';

export const VideoWrapper = styled.main<{$full?: boolean}>`
  width: ${({$full}) => ($full ? '100vw' : '640px')};
  height: ${({$full}) => ($full ? '100vh' : 'auto')};
  max-height: ${({$full}) => ($full ? '100vh' : '360px')};
  min-height: ${({$full}) => ($full ? '100vh' : 'unset')};
  min-width: ${({$full}) => ($full ? '100vw' : 'unset')};
  position: ${({$full}) => ($full ? 'fixed' : 'relative')};
  top: ${({$full}) => ($full ? '0' : 'unset')};
  left: ${({$full}) => ($full ? '0' : 'unset')};
  z-index: ${({$full}) => ($full ? '9999' : '1')};
  background: ${({$full}) => ($full ? '#000' : 'transparent')};

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  box-shadow: ${({$full}) =>
    $full ? 'none' : '0px 30px 20px -10px rgb(0 0 0 / 47%)'};

  video#player {
    width: ${({$full}) => ($full ? '100vw' : '640px')};
    height: ${({$full}) => ($full ? '100vh' : '360px')};
    min-width: ${({$full}) => ($full ? '100vw' : '640px')};
    min-height: ${({$full}) => ($full ? '100vh' : '360px')};
    max-width: 100vw;
    max-height: 100vh;

    object-fit: ${({$full}) => ($full ? 'cover' : 'contain')};

    /* RESPONSIVE */
    ${({$full}) =>
      !$full &&
      `
      @media (max-width: 540px) {
        min-width: 495px;
        min-height: 277px;
      }
      @media (max-width: 415px) {
        min-width: 339px;
        min-height: 191px;
      }
      @media (max-width: 320px) {
        min-width: 297px;
        min-height: 167px;
      }
      @media (max-width: 280px) {
        min-width: 261px;
        min-height: 145px;
      }
      @media (max-height: 568px) and (orientation: landscape) {
        min-width: 542px;
        min-height: 305px;
      }
    `}
  }

  /* PLYR CSS */

  .plyr {
    --plyr-color-main: ${props => props.theme.colors.secondary};
    --plyr-menu-color: ${props => props.theme.colors.secondary};
    --plyr-menu-background: ${props => props.theme.colors.white};
    --plyr-video-control-color: ${props => props.theme.colors.white};
    --plyr-video-control-color-hover: ${props => props.theme.colors.white};
    --plyr-video-controls-background: transparent;
    --plyr-video-control-background-hover: ${props =>
      props.theme.colors.secondary};

    --plyr-control-icon-size: 18px;

    .plyr__video-wrapper .plyr__poster {
      background-size: cover;
    }

    /* BUTTON LARGE PALY */
    .plyr__control--overlaid {
      width: 110px;
      height: 110px;

      display: flex !important;
      align-items: center;
      justify-content: center;

      background: rgb(211 211 211 / 53%);

      svg {
        width: 40px;
        height: 40px;
      }
    }

    /* RESPONSIVE */

    @media (max-width: 540px) {
      --plyr-control-icon-size: 14px;

      .plyr__control--overlaid {
        width: 90px;
        height: 90px;
      }

      .plyr__time {
        font-size: 12px;
      }
    }
    @media (max-width: 415px) {
      --plyr-control-icon-size: 12px;

      .plyr__control--overlaid {
        width: 87px;
        height: 87px;
      }

      .plyr__time {
        font-size: 10px;
      }
    }
    @media (max-width: 320px) {
      --plyr-control-icon-size: 10px;

      .plyr__control--overlaid {
        width: 67px;
        height: 67px;

        svg {
          width: 25px;
          height: 25px;
        }
      }
    }
    @media (max-width: 280px) {
      --plyr-control-icon-size: 7px;

      .plyr__control--overlaid {
        width: 67px;
        height: 67px;

        svg {
          width: 25px;
          height: 25px;
        }
      }

      .plyr__time {
        font-size: 8px;
      }
    }
  }

  .plyr__controls {
    display: flex;
    flex-direction: column;
    opacity: 0; // removed whit js => opacity: 1;

    width: 100%;

    /* PROGRESS BAR */
    .plyr__progress input[type='range'] {
      appearance: none;
      color: ${props => props.theme.colors.white};

      transition: opacity 0.4s;
      opacity: 0.8;

      &::-webkit-slider-thumb {
        appearance: none;
        opacity: 0;
      }
      &::-webkit-slider-runnable-track {
        appearance: none;
      }

      &:hover {
        opacity: 1;
      }
    }

    /* MENU */
    .plyr__menu {
      button {
        background: transparent;
        transition: opacity 0.4s;
        opacity: 0.8;

        &:hover,
        :active {
          opacity: 1;
        }
      }

      div.plyr__menu__container div {
        background: ${props => props.theme.colors.white};
        border-radius: 4px;

        button[data-plyr='settings'],
        button.plyr__control--back,
        button[data-plyr='speed'],
        [data-plyr='capture'] {
          &:hover {
            color: ${props => props.theme.colors.pink};
          }
        }
      }
    }

    /* Remove background color hover */
    [data-plyr='rewind'],
    [data-plyr='play'],
    [data-plyr='fast-forward'],
    [data-plyr='pip'],
    [data-plyr='fullscreen'] {
      background: transparent;
      opacity: 0.8;
      transition: opacity 0.4s;
      &:hover {
        opacity: 1;
      }
    }

    /* CONTROLS  rewind | forward */
    [data-plyr='rewind'] {
      svg {
        width: 15px;
      }
      margin-right: -7px;
    }

    [data-plyr='fast-forward'] {
      svg {
        width: 15px;
      }
      margin-left: -7px;
      margin-right: 7px;

      @media (max-width: 411px) {
        margin-right: 0px;
      }
    }

    /* VOLUME */
    .plyr__volume {
      width: 100%;

      @media (max-width: 415px) {
        min-width: 60px;
      }

      > button {
        opacity: 0.8;
        transition: opacity 0.4s;
        &:hover {
          opacity: 1;
          background: transparent;
        }
      }

      input[type='range'] {
        appearance: none;
        width: 50px;
        color: ${props => props.theme.colors.white};
        cursor: col-resize;

        opacity: 0.8;
        transition: opacity 0.4s;

        &::-webkit-slider-thumb {
          appearance: none;
          opacity: 0;
        }
        &::-webkit-slider-runnable-track {
          appearance: none;
          height: 10px;
        }
        &:hover {
          opacity: 1;
        }

        /* RESPONSIVE */

        @media (max-width: 415px) {
          width: 30px;
        }
        @media (max-width: 320px) {
          &::-webkit-slider-runnable-track {
            height: 8px;
          }
        }
      }
    }

    /* RESPONSIVE */

    @media (max-width: 280px) {
      --plyr-control-spacing: 6px;
    }
  }

  div.top_row {
    width: 100%;
  }

  div.bottom_row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      &:first-child {
        gap: 0.5rem;
      }
      &:last-child {
        /* align-items: center; */
        justify-content: flex-end;
      }
    }

    /* RESPONSIVE */

    @media (max-width: 415px) {
      .content {
        &:first-child {
          gap: 0rem;
        }
      }
    }
  }

  /* RESPONSIVE */

  @media (max-width: 540px) {
    width: 495px;
  }
  @media (max-width: 415px) {
    width: 339px;
  }
  @media (max-width: 320px) {
    width: 297px;
  }
  @media (max-width: 280px) {
    width: 261px;
  }

  @media (max-height: 568px) and (orientation: landscape) {
    width: 542px;
    margin-top: 1rem;
  }
`;
