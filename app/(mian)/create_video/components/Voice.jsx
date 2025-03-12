"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Volume2 } from "lucide-react"

export const voiceOptions = [
  {
    value: "af_alloy",
    name: "Alloy (Female)",
  },
  {
    value: "af_aoede",
    name: "Aoede (Female)",
  },
  {
    value: "af_bella",
    name: "Bella (Female)",
  },
  {
    value: "af_jessica",
    name: "Jessica (Female)",
  },
  {
    value: "af_kore",
    name: "Kore (Female)",
  },
  {
    value: "bm_daniel",
    name: "Daniel (Male)",
  },
  {
    value: "bm_fable",
    name: "Fable (Male)",
  },
  {
    value: "bm_george",
    name: "George (Male)",
  },
  {
    value: "bm_lewis",
    name: "Lewis (Male)",
  },
  {
    value: "bm_psi",
    name: "Psi (Male)",
  },
]

const Voice = ({onHandleInputChange, formData}) => {
  const [selectedVoice, setSelectedVoice] = useState(formData?.voice?.value || null);
  
  useEffect(() => {
    setSelectedVoice(formData?.voice?.value || null);
  }, [formData]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const handleVoiceSelect = (voice) => {
    const newVoice = selectedVoice === voice.value ? null : voice;
    setSelectedVoice(newVoice?.value || null);
    onHandleInputChange('voice', newVoice);
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
            Voice Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {voiceOptions.map((voice, index) => (
              <motion.div
                key={voice.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleVoiceSelect(voice)}
                className={`relative cursor-pointer group rounded-lg border p-4 transition-all ${
                  selectedVoice === voice.value 
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/50 shadow-sm' 
                    : 'hover:border-blue-200 hover:bg-gray-50/50 dark:hover:bg-gray-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    selectedVoice === voice.value
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    <Volume2 className={`h-4 w-4 ${
                      selectedVoice === voice.value
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {voice.name.split(' ')[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {voice.name.includes('Female') ? 'Female Voice' : 'Male Voice'}
                    </p>
                  </div>
                  {selectedVoice === voice.value && (
                    <CheckCircle2 className="h-4 w-4 text-blue-500 absolute top-2 right-2" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {selectedVoice && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">
                  Selected Voice: {voiceOptions.find(v => v.value === selectedVoice)?.name}
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Voice
