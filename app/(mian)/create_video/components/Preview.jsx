"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

function Preview({ formData }) {
  return (
    <motion.div className="lg:sticky lg:top-8 max-h-[90vh] flex flex-col">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          {/* Phone-like Container */}
          <div className="mx-auto h-full flex flex-col max-w-[400px] justify-center">
            {/* 9:16 Container with Phone Frame */}
            <div 
              className="relative w-full rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl ring-1 ring-gray-900/5"
              style={{
                maxHeight: 'calc(90vh - 120px)', // Account for header and padding
                aspectRatio: '9/16'
              }}
            >
              {/* Content Container */}
              <div className="absolute inset-0">
                {/* Video Style Preview */}
                <div className="relative w-full h-full">
                  {formData?.videoStyle ? (
                    <Image
                      src={formData.videoStyle.image}
                      alt={formData.videoStyle.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                      <p className="text-center px-4">
                        Select a video style to preview your short video
                      </p>
                    </div>
                  )}

                  {/* Caption Preview */}
                  {formData?.captionStyle && (
                    <div className="absolute bottom-8 left-4 right-4">
                      <div
                        style={{
                          ...formData.captionStyle.styles,
                          background: formData.captionStyle.styles.background,
                          padding: formData.captionStyle.styles.padding,
                          borderRadius: formData.captionStyle.styles.borderRadius,
                        }}
                        className="text-center"
                      >
                        {formData.title || "Your Video Caption"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Voice Preview */}
            {formData?.voice && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Voice: {formData.voice.name}
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Preview
