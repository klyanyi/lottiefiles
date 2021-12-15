import * as React from 'react';

import lottie from 'lottie-web';

const Lottie = function (
  this: any,
  props: {
    id: string;
    name: string;
    lottieUrl: string;
  }
) {
  const { id, name, lottieUrl } = props;

  const lottieContainer = React.useRef<HTMLDivElement>(null);

  const [svgNode, setSvgNode] = React.useState<any>();

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
  }, []);

  React.useEffect(() => {
    setSvgNode(lottieContainer.current?.childNodes);
  }, [lottieContainer.current]);

  const onClick = () => {
    // convert SVG element to plain string
    const svgString = new XMLSerializer().serializeToString(svgNode.item(0));

    window.postMessage(
      'nativeLog',
      JSON.stringify({
        svgString,
        name,
        id,
      })
    );
  };

  return (
    <div className="lf-card" onClick={onClick}>
      <div className="lf-lottie" ref={lottieContainer} />
      <span className="lf-card-caption">
        {name} {id}
      </span>
    </div>
  );
};

export default Lottie;
