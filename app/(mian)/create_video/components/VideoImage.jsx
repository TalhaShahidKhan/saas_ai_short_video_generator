"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"

export const VIDEO_STYLES = [
  {
    name: "Realistic",
    image: "/realistic.jpg",
    description: "High-quality realistic video style"
  },
  {
    name: "Cinematic",
    image: "/cinamatic.jpg",
    description: "Professional cinematic look"
  },
  {
    name: "Cartoon",
    image: "/cartoon.jpg",
    description: "Animated cartoon style"
  },
  {
    name: "Anime",
    image: "/anime.jpg",
    description: "Japanese anime style"
  },
  {
    name: "Cyberpunk",
    image: "/cyberpunk.jpg",
    description: "Futuristic cyberpunk aesthetic"
  },
  
]

const VideoImage = ({ onHandleInputChange }) => {
  const [selectedStyle, setSelectedStyle] = useState(null)

  const handleStyleSelect = (style) => {
    const newStyle = selectedStyle === style.name ? null : style;
    setSelectedStyle(newStyle?.name || null);
    onHandleInputChange('videoStyle', newStyle);
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Video Style
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base font-semibold">
              Choose Your Video Style
            </Label>
            <p className="text-sm text-muted-foreground">
              Select a style that best matches your video's theme
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {VIDEO_STYLES.map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleStyleSelect(style)}
                className={`relative cursor-pointer group rounded-lg overflow-hidden ${
                  selectedStyle === style.name 
                    ? 'ring-2 ring-blue-500 ring-offset-2' 
                    : 'hover:ring-2 hover:ring-blue-400 hover:ring-offset-2'
                }`}
              >
                <div className="aspect-video relative">
                  <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-colors ${
                    selectedStyle === style.name 
                      ? 'bg-black/20' 
                      : 'group-hover:bg-black/10'
                  }`} />
                  
                  {/* Selection Indicator */}
                  {selectedStyle === style.name && (
                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Style Info */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-medium text-sm">
                    {style.name}
                  </p>
                  <p className="text-white/80 text-xs line-clamp-1">
                    {style.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedStyle && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">
                  Selected Style: {selectedStyle}
                </p>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                  {VIDEO_STYLES.find(s => s.name === selectedStyle)?.description}
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default VideoImage
