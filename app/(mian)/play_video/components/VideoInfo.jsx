'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Calendar, User, Tag, Video, Volume2, Clock, Code } from 'lucide-react';
import moment from 'moment';

function VideoInfo({ videoData, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh] p-6">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="flex items-center justify-center h-[70vh] p-6">
        <p className="text-gray-500 dark:text-gray-400">No video data available</p>
      </div>
    );
  }

  const infoItems = [
    { 
      icon: <Tag className="h-5 w-5 text-blue-500" />, 
      label: "Title", 
      value: videoData.title 
    },
    { 
      icon: <Video className="h-5 w-5 text-green-500" />, 
      label: "Topic", 
      value: videoData.topic 
    },
    { 
      icon: <User className="h-5 w-5 text-purple-500" />, 
      label: "Created By", 
      value: videoData.createdBy 
    },
    { 
      icon: <Calendar className="h-5 w-5 text-orange-500" />, 
      label: "Created At", 
      value: moment(videoData._creationTime).format('MMMM Do YYYY, h:mm a') 
    },
    { 
      icon: <Volume2 className="h-5 w-5 text-red-500" />, 
      label: "Voice", 
      value: videoData.voice 
    },
    { 
      icon: <Clock className="h-5 w-5 text-indigo-500" />, 
      label: "Duration", 
      value: videoData.captionJson ? 
        `${(videoData.captionJson[videoData.captionJson.length-1].end).toFixed(1)} seconds` : 
        "Unknown" 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="h-full">
      <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Video Information
        </h2>
      </div>
      
      <div className="p-6 overflow-y-auto max-h-[calc(70vh-60px)]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoItems.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-3"
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Style badge */}
          {videoData.videoStyle && (
            <motion.div
              variants={itemVariants}
              className="flex items-center"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Style:</span>
              <span className="px-3 py-1 text-xs font-medium rounded-full" 
                style={{
                  backgroundColor: videoData.caption?.styles?.background || 'rgba(59, 130, 246, 0.1)',
                  color: videoData.caption?.styles?.color || '#3B82F6',
                  border: videoData.caption?.styles?.border || '1px solid #3B82F6'
                }}
              >
                {videoData.videoStyle}
              </span>
            </motion.div>
          )}

          {/* Script section */}
          {videoData.script && (
            <motion.div
              variants={itemVariants}
              className="mt-6"
            >
              <div className="flex items-center mb-3">
                <Code className="h-5 w-5 text-teal-500 mr-2" />
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Script</h3>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {videoData.script}
                </p>
              </div>
            </motion.div>
          )}
          
          {/* Image preview */}
          {videoData.images && videoData.images.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-6"
            >
              <div className="flex items-center mb-3">
                <svg className="h-5 w-5 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Images</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {videoData.images.slice(0, 3).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    <img 
                      src={image} 
                      alt={`Image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default VideoInfo;
