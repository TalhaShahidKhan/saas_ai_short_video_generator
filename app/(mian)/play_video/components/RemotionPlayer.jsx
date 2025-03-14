'use client'
import React, { useState } from 'react';
import { Player } from "@remotion/player";
import RemotionComposition from '@/components/remotion/RemotionComposition';
import { Loader2 } from 'lucide-react';

function RemotionPlayer({ videoData }) {
    const [durationInFrame, setDurationInFrame] = useState(100); // Default to a minimum value
    
    // If videoData is undefined, show a loading state
    if (!videoData) {
        return (
            <div className="flex items-center justify-center h-[70vh] bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Loading video data...</p>
            </div>
        );
    }
    
    return (
        <div>
            <Player
                component={RemotionComposition}
                durationInFrames={Math.max(100, Number(durationInFrame.toFixed(0)))}
                compositionWidth={720}
                compositionHeight={1280}
                fps={30}
                controls
                style={{
                    width: '25vw',
                    height: '70vh'
                }}
                inputProps={{
                    videoData: videoData,
                    setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
                }}
            />
        </div>
    );
}

export default RemotionPlayer;
