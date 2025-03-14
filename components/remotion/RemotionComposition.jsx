"use client";

import { useEffect, useMemo, useCallback } from "react";
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

function RemotionComposition({ videoData, setDurationInFrame }) {
  const captions = videoData?.captionJson;
  const capStyles = videoData?.caption?.styles;
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const imageList = videoData?.images;
  
  // Calculate total duration once with useMemo
  const totalDuration = useMemo(() => {
    if (captions && captions.length > 0) {
      return captions[captions.length - 1].end * fps;
    }
    return 100; // Default duration
  }, [captions, fps]);
  
  // Update parent component with duration
  useEffect(() => {
    if (totalDuration > 0) {
      setDurationInFrame(totalDuration);
    }
  }, [totalDuration, setDurationInFrame]);

  // Calculate frames per image
  const framesPerImage = useMemo(() => {
    if (imageList && imageList.length > 0) {
      return Math.ceil(totalDuration / imageList.length);
    }
    return totalDuration;
  }, [totalDuration, imageList]);

  // Get current caption based on frame
  const currentCaption = useMemo(() => {
    if (!captions) return "";
    
    const currentTime = frame / fps;
    const caption = captions.find(
      (item) => currentTime >= item?.start && currentTime <= item?.end
    );
    return caption ? caption.word : "";
  }, [captions, frame, fps]);

  // If data is not loaded yet
  if (!videoData || !captions || !imageList) {
    return (
      <AbsoluteFill style={{ backgroundColor: "#111", justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: "#fff", fontSize: "24px" }}>Loading video data...</p>
      </AbsoluteFill>
    );
  }

  return (
    <div>
      <AbsoluteFill>
        {imageList.map((item, index) => {
          const startFrame = index * framesPerImage;
          
          return (
            <Sequence
              key={`image-${index}`}
              from={startFrame}
              durationInFrames={framesPerImage}
            >
              <AnimatedImage 
                image={item} 
                duration={framesPerImage}
                index={index}
              />
            </Sequence>
          );
        })}
      </AbsoluteFill>
      
      <AbsoluteFill style={{ 
            background: capStyles.background,
            border: capStyles.border,
            borderRadius: "1000px",
            boxShadow: capStyles.boxShadow,
            color: capStyles.color,
            fontFamily: capStyles.fontFamily,
            fontSize: "75px",
            justifyContent:'center',
            textShadow: capStyles.textShadow,
            height: 100,
            textAlign: 'center',
            top:undefined,
            bottom: 50
       }}>
        <h2>{currentCaption}</h2>
      </AbsoluteFill>
      
      {videoData.audioUrl && <Audio src={videoData.audioUrl} />}
    </div>
  );
}

// Separate component for animated images
const AnimatedImage = ({ image, duration, index }) => {
  const frame = useCurrentFrame();
  
  // Create a zoom effect that alternates between images
  const scale = interpolate(
    frame,
    [0, duration / 2, duration],
    index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  return (
    <AbsoluteFill>
      <Img 
        src={image}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

export default RemotionComposition;
