import * as React from 'react';

import lottie from 'lottie-web';

const Lottie = function (
  this: any,
  props: {
    id: string;
    name: string;
    lottieUrl: string;
    gifUrl: string;
  }
) {
  const { id, name, lottieUrl, gifUrl } = props;

  const lottieContainer = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!lottieContainer.current?.hasChildNodes()) {
      lottie.loadAnimation({
        container: lottieContainer.current!,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: lottieUrl,
      });
    }
  });

  const onClick = () => {
    window.postMessage('nativeLog', gifUrl);
  };

  return (
    <div className="lf-card">
      <div
        className="lf-lottie"
        ref={lottieContainer}
        onClick={onClick.bind(this)}
      />
      <span className="lf-card-caption">
        {name} {id}
      </span>
    </div>
  );
};

export default Lottie;
