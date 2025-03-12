"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Type } from "lucide-react";
import Head from 'next/head';

export const captionStyles = [
  {
    value: "modern",
    name: "Modern Clean",
    preview: "Sleek and minimal design",
    styles: {
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: "16px",
      color: "#FFFFFF",
      background: "rgba(0, 0, 0, 0.7)",
      padding: "12px 24px",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    }
  },
  {
    value: "neon",
    name: "Neon Glow",
    preview: "Vibrant and eye-catching",
    styles: {
      fontFamily: "'Audiowide', cursive",
      fontSize: "16px",
      color: "#00ff88",
      background: "rgba(0, 0, 0, 0.8)",
      padding: "10px 20px",
      borderRadius: "8px",
      textShadow: "0 0 10px #00ff88",
      border: "1px solid #00ff88"
    }
  },
  {
    value: "retro",
    name: "Retro Vibes",
    preview: "Classic vintage look",
    styles: {
      fontFamily: "'VT323', monospace",
      fontSize: "18px",
      color: "#FFE81F",
      background: "rgba(0, 0, 0, 0.9)",
      padding: "8px 16px",
      borderRadius: "0px",
      textShadow: "2px 2px 0px #FF4081",
      border: "2px solid #FFE81F"
    }
  },
  {
    value: "elegant",
    name: "Elegant Script",
    preview: "Sophisticated and stylish",
    styles: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "17px",
      color: "#FFF5E1",
      background: "rgba(0, 0, 0, 0.6)",
      padding: "15px 30px",
      borderRadius: "16px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      border: "1px solid rgba(255, 215, 0, 0.3)"
    }
  },
  {
    value: "comic",
    name: "Comic Pop",
    preview: "Fun and energetic",
    styles: {
      fontFamily: "'Bangers', cursive",
      fontSize: "18px",
      color: "#FFFFFF",
      background: "rgba(255, 86, 86, 0.9)",
      padding: "10px 20px",
      borderRadius: "25px",
      textShadow: "2px 2px 0px #000000",
      border: "3px solid #000000"
    }
  },
  {
    value: "cyberpunk",
    name: "Cyberpunk",
    preview: "Futuristic and bold",
    styles: {
      fontFamily: "'Orbitron', sans-serif",
      fontSize: "16px",
      color: "#00FFFF",
      background: "rgba(33, 33, 33, 0.9)",
      padding: "12px 24px",
      borderRadius: "4px",
      textShadow: "0 0 8px #00FFFF",
      border: "1px solid #00FFFF",
      boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)"
    }
  },
  {
    value: "minimal",
    name: "Minimal White",
    preview: "Clean and simple",
    styles: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "15px",
      color: "#FFFFFF",
      background: "rgba(0, 0, 0, 0.5)",
      padding: "8px 16px",
      borderRadius: "6px",
      boxShadow: "none",
      border: "none"
    }
  },
  {
    value: "gradient",
    name: "Gradient Pop",
    preview: "Colorful and modern",
    styles: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "16px",
      color: "#FFFFFF",
      background: "linear-gradient(135deg, rgba(255, 99, 71, 0.8), rgba(106, 90, 205, 0.8))",
      padding: "10px 20px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      border: "none"
    }
  },
  {
    value: "handwritten",
    name: "Handwritten",
    preview: "Personal and casual",
    styles: {
      fontFamily: "'Caveat', cursive",
      fontSize: "20px",
      color: "#FFFFFF",
      background: "rgba(0, 0, 0, 0.6)",
      padding: "12px 24px",
      borderRadius: "8px",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
      border: "none"
    }
  }
];

const Captions = ({onHandleInputChange, formData}) => {
  const [selectedStyle, setSelectedStyle] = useState(formData?.captionStyle?.value || null);

  useEffect(() => {
    setSelectedStyle(formData?.captionStyle?.value || null);
  }, [formData]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleStyleSelect = (style) => {
    const newStyle = selectedStyle === style.value ? null : style;
    setSelectedStyle(newStyle?.value || null);
    onHandleInputChange('captionStyle', newStyle);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=VT323&family=Playfair+Display&family=Bangers&family=Orbitron&family=DM+Sans&family=Poppins:wght@400;500&family=Caveat&display=swap');
      `}</style>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Caption Style
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {captionStyles.map((style, index) => (
              <motion.div
                key={style.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleStyleSelect(style)}
                className={`relative cursor-pointer group rounded-lg border p-4 transition-all ${
                  selectedStyle === style.value
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/50 shadow-sm"
                    : "hover:border-blue-200 hover:bg-gray-50/50 dark:hover:bg-gray-900/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  
                  <div className="flex-1">
                    <p className="font-medium text-sm">{style.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {style.preview}
                    </p>
                  </div>
                  {selectedStyle === style.value && (
                    <CheckCircle2 className="h-4 w-4 text-blue-500 absolute top-2 right-2" />
                  )}
                </div>

                {/* Caption Preview */}
                <div
                  className="mt-3 p-2 rounded bg-gray-900 dark:bg-gray-800"
                  style={{
                    fontFamily: style.styles.fontFamily,
                    fontSize: style.styles.fontSize,
                  }}
                >
                  <div
                    className="text-white text-center p-2 rounded"
                    style={{
                      ...style.styles,
                      background: style.styles.background,
                      padding: style.styles.padding,
                      borderRadius: style.styles.borderRadius,
                    }}
                  >
                    Your Video Caption
                  </div>
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
                  Selected Style:{" "}
                  {captionStyles.find((s) => s.value === selectedStyle)?.name}
                </p>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                  {
                    captionStyles.find((s) => s.value === selectedStyle)
                      ?.preview
                  }
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Captions;
