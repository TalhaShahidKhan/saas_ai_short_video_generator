import React from 'react';
import {Composition} from 'remotion';
import RemotionComposition from '../components/remotion/RemotionComposition';
 
export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="youtubeShortvideo"
        component={RemotionComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};