/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {useContext, useState, useEffect} from 'react';
import dynamic from 'next/dynamic';
import {NextSeo} from 'next-seo';
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';
import {ThemeContext} from 'styled-components';

import {Container} from '../styles/pages/index/styles';

const HotToast = dynamic(() => import('@/components/HotToast'));
const PlyrPlayer = dynamic(() => import('@/components/Plyr'), {
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '360px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ReactLoading width={40} type="bars" color="#fff" />
    </div>
  ),
});

export default function Home() {
  const [url, setUrl] = useState('');
  const [hasVideoParam, setHasVideoParam] = useState(false);
  const {colors} = useContext(ThemeContext);

  // Preenche automaticamente o campo se houver ?video= na URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const videoParam = params.get('video');
      if (videoParam) {
        setUrl(videoParam);
        setHasVideoParam(true);
      }
    }
  }, []);

  const clearInput = () => {
    toast('The input was cleaned', {
      id: 'clear-input',
      icon: '🧹',
      position: 'top-center',
      style: {
        borderRadius: '6px',
        padding: '16px',
        fontWeight: 500,
        fontSize: '14px',
        color: `${colors.white}`,
        boxShadow: '0px 7px 8px 2px rgb(0 0 0 / 41%)',
      },
    });
    setUrl('');
  };

  return (
    <>
      <NextSeo
        title="HLS Player"
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/favicon.svg',
          },
        ]}
      />

      <Container>
        <PlyrPlayer url={url} />

        {!hasVideoParam && (
          <footer>
            <div>
              <label htmlFor="video-url">Paste the url (M3U8)</label>
              <input
                id="video-url"
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
            </div>

            <hr />

            <button type="button" onClick={clearInput}>
              clear
            </button>
          </footer>
        )}
      </Container>

      <HotToast />
    </>
  );
}
