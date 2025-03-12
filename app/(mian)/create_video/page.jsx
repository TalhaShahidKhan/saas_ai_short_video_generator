"use client";

import { motion } from "framer-motion";
import TopicForm from "./components/Topic";
import VideoImage from "./components/VideoImage";
import Voice from "./components/Voice";
import Captions from "./components/Captions";
import { useState } from "react";
import Preview from "./components/Preview";
import { Button } from "@/components/ui/button";
import { Loader2, VideoIcon, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthContext } from "@/components/basic/theme-provider";

function CreateNewVideo() {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    selectedScript: null,
    videoStyle: null,
    voice: null,
    captionStyle: null,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const CreateInitialVideoData = useMutation(api.videoData.CreateNewVideoData);
  const { user } = useAuthContext();

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    // Clear any existing errors/success when form is modified
    setError(null);
    setSuccess(null);
  };

  const validateFormData = () => {
    const requiredFields = {
      title: "Title",
      topic: "Topic",
      selectedScript: "Script",
      videoStyle: "Video Style",
      voice: "Voice",
      captionStyle: "Caption Style",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field]) {
        setError(`Please select a ${label} before generating the video.`);
        return false;
      }
    }
    return true;
  };

  const handleGenerateVideo = async () => {
    setError(null);
    setSuccess(null);

    if (!validateFormData()) return;

    try {
      setIsGenerating(true);
      const resp = await CreateInitialVideoData({
        title: formData.title,
        topic: formData.topic,
        script: formData.selectedScript.content,
        videoStyle: formData.videoStyle.name,
        voice: formData.voice.value,
        caption: formData.captionStyle,
        uid: user._id,
        createdBy: user.email,
      });

      console.log(resp)
      const response = await fetch("/api/generate_video_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          topic: formData.topic,
          script: formData.selectedScript,
          videoStyle: formData.videoStyle,
          voice: formData.voice,
          captionStyle: formData.captionStyle,
          recordId:resp
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate video");
      }

      

      setSuccess(
        "Your video generation has started. You'll be notified when it's ready."
      );

      // Reset all form data and notify child components
      handleResetForm();
      
    } catch (error) {
      console.error("Error generating video:", error);
      setError("Failed to generate video. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetForm = () => {
    // Reset main form data
    setFormData({
      title: "",
      topic: "",
      selectedScript: null,
      videoStyle: null,
      voice: null,
      captionStyle: null,
    });
    // Increment resetKey to trigger component resets
    setResetKey(prev => prev + 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto py-8 px-4"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
      >
        Create New Video
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <TopicForm 
            key={`topic-${resetKey}`}
            onHandleInputChange={handleInputChange} 
            formData={formData}
          />
          <VideoImage 
            key={`video-${resetKey}`}
            onHandleInputChange={handleInputChange} 
            formData={formData}
          />
          <Voice 
            key={`voice-${resetKey}`}
            onHandleInputChange={handleInputChange} 
            formData={formData}
          />
          <Captions 
            key={`captions-${resetKey}`}
            onHandleInputChange={handleInputChange} 
            formData={formData}
          />

          {/* Generate Video Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4"
          >
            <Button
              onClick={handleGenerateVideo}
              disabled={isGenerating}
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Video...
                </>
              ) : (
                <>
                  <VideoIcon className="mr-2 h-5 w-5" />
                  Generate Video
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Preview 
            key={`preview-${resetKey}`}
            formData={formData} 
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CreateNewVideo;
