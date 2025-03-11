"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Sparkles, RefreshCw, CheckCircle2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SUGGESTIONS = [
  "Programming and AI",
  "Easy Cooking Hacks for Beginners",
  "Daily Productivity Habits",
  "Travel Packing Tips",
  "Simple DIY Home Decor Ideas",
  "Tech Tips for Everyday Life"
]

const TopicForm = ({onHandleInputChange}) => {
  const [title, setTitle] = useState("")
  const [topic, setTopic] = useState("")
  const [scripts, setScripts] = useState([])
  const [selectedScript, setSelectedScript] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  const generateScripts = async (topicText) => {
    try {
      setIsGenerating(true)
      setError("")
      setScripts([])
      setSelectedScript(null)

      const response = await fetch('/api/generate_script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topicText }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate scripts')
      }

      const data = await response.json()
      setScripts(data.scripts)
    } catch (err) {
      setError("Failed to generate scripts. Please try again.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCustomTopicSubmit = (e) => {
    e.preventDefault()
    if (!topic.trim()) {
      setError("Please enter a topic")
      return
    }
    generateScripts(topic)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onHandleInputChange('title', newTitle);
  };

  const handleTopicChange = (e) => {
    const newTopic = e.target.value;
    setTopic(newTopic);
    onHandleInputChange('topic', newTopic);
  };

  const handleSuggestionClick = (suggestion) => {
    setTopic(suggestion);
    onHandleInputChange('topic', suggestion);
  };

  const handleScriptSelect = (index) => {
    if (selectedScript === index.toString()) {
      setSelectedScript(null)
      onHandleInputChange('selectedScript', null)
    } else {
      setSelectedScript(index.toString())
      onHandleInputChange('selectedScript', scripts[index])
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
            Content Creation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Title Section */}
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Project Title
            </Label>
            <div className="flex gap-2">
              <Input
                id="title"
                placeholder="Enter a title for your project..."
                value={title}
                onChange={handleTitleChange}
                className="flex-1"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              This title will be used to identify your video project
            </p>
          </motion.div>

          {/* Divider */}
          <div className="border-t" />

          {/* Topic Selection Tabs */}
          <Tabs defaultValue="suggestions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="custom">Your Topic</TabsTrigger>
            </TabsList>

            <TabsContent value="suggestions" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SUGGESTIONS.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto py-3 px-4 text-left justify-start"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
              
              {/* Added Generate Button Section */}
              {topic && (
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex-1">
                    <Label className="text-base font-semibold mb-1 block">
                      Selected Topic
                    </Label>
                    <p className="text-sm text-muted-foreground">{topic}</p>
                  </div>
                  <Button
                    onClick={() => generateScripts(topic)}
                    disabled={isGenerating || !topic.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Script
                      </>
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="custom" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-base font-semibold">
                  Enter Your Topic
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your video topic..."
                    value={topic}
                    onChange={handleTopicChange}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleCustomTopicSubmit}
                    disabled={isGenerating || !topic.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Generated Scripts */}
          {scripts.length > 0 && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">
                  Choose Your Script
                </Label>
                {selectedScript && (
                  <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Script {parseInt(selectedScript) + 1} selected
                  </span>
                )}
              </div>
              <div className="space-y-4">
                {scripts.map((script, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`rounded-lg border p-4 transition-all cursor-pointer ${
                        selectedScript === index.toString()
                          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/50 shadow-md'
                          : 'hover:border-blue-200 hover:bg-gray-50/50 dark:hover:bg-gray-900/50'
                      }`}
                      onClick={() => handleScriptSelect(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Script {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`${
                            selectedScript === index.toString()
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                              : 'text-blue-600 hover:text-blue-700'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleScriptSelect(index);
                          }}
                        >
                          {selectedScript === index.toString() ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Selected
                            </>
                          ) : (
                            'Select Script'
                          )}
                        </Button>
                      </div>
                      <pre className="whitespace-pre-wrap text-sm">
                        {script.content}
                      </pre>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TopicForm
