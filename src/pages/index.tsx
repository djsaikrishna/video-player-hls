'use client';
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

const HotToast = dynamic(() => import('@/components/HotToast'), {
  ssr: false,
});
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
  ssr: false,
});

export default function Home() {
  const [url, setUrl] = useState('');
  const [hasVideoParam, setHasVideoParam] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [aspect, setAspect] = useState<'cover' | 'fill' | 'contain'>('contain');
  const {colors} = useContext(ThemeContext);

  // Preenche automaticamente o campo se houver ?video= na URL e verifica ?full=1 e ?aspect=cover|fill|contain
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const videoParam = params.get('video');
      const fullParam = params.get('full');
      const aspectParam = params.get('aspect');
      if (videoParam) {
        setUrl(videoParam);
        setHasVideoParam(true);
      }
      if (fullParam === '1') {
        setIsFull(true);
      } else {
        setIsFull(false);
      }
      if (
        aspectParam === 'cover' ||
        aspectParam === 'fill' ||
        aspectParam === 'contain'
      ) {
        setAspect(aspectParam);
      } else {
        setAspect('contain');
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

      <Container $full={isFull}>
        <PlyrPlayer url={url} full={isFull} aspect={aspect} />

        {!hasVideoParam && !isFull && (
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
