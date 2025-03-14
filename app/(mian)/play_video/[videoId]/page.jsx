'use client'
import React, { useEffect, useState } from 'react';
import RemotionPlayer from '../components/RemotionPlayer';
import VideoInfo from '../components/VideoInfo';
import { useParams } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Download, Heart } from 'lucide-react';
import Link from 'next/link';

function PlayVideo() {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const convex = useConvex();
  
  useEffect(() => {
    if (videoId) {
      GetVideoDataById();
    }
  }, [videoId]);
  
  const GetVideoDataById = async () => {
    try {
      setIsLoading(true);
      const result = await convex.query(api.videoData.GetVideoDataById, {
        videoId: videoId
      });
      setVideoData(result);
    } catch (error) {
      console.error("Error fetching video data:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button and title */}
        <div className="flex items-center justify-between mb-8">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Link href="/dashboard" className="mr-4">
              <button className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {videoData?.title || "Video Player"}
            </h1>
          </motion.div>
          
          {!isLoading && videoData && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex space-x-2"
            >
              
            </motion.div>
          )}
        </div>
        
        {/* Main content */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Video player card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Preview
              </h2>
            </div>
            <div className="flex items-center justify-center p-6">
              <RemotionPlayer videoData={videoData} />
            </div>
          </div>
          
          {/* Video info card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <VideoInfo videoData={videoData} isLoading={isLoading} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PlayVideo;
