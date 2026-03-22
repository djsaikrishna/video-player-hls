import {useEffect} from 'react';

import {LottieAnimationTypes} from '@/types/lottie-animation';
import {Lottie} from './styles';
// Remove dynamic import of lottie-web, we'll import it inside useEffect

const LottieAnimation = ({
  Width,
  Height,
  LoadingAnimation,
  ID,
  ...props
}: LottieAnimationTypes) => {
  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      import('lottie-web').then(LottieWeb => {
        const element = document.getElementById(`${ID}`);

        if (element) {
          LottieWeb.default.loadAnimation({
            container: element,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: LoadingAnimation,
          });
        }
      });
    }
  }, []);

  return <Lottie id={ID} Width={Width} Height={Height} style={props.style} />;
};

export default LottieAnimation;
