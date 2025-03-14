'use client'
import { useAuthContext } from "@/components/basic/theme-provider";
import { api } from "@/convex/_generated/api";
import { useConvex, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PlusCircle, Video, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

function VideoList() {
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    
    const videoList = useQuery(api.videoData.GetVideoList, 
        user ? { uid: user._id } : 'skip'
    );

    useEffect(() => {
        if (videoList !== undefined) {
            setLoading(false);
        }
    }, [videoList]);

    if (loading || videoList === undefined) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!videoList.length) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center min-h-[400px] p-8"
            >
                <Video className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No Videos Yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                    Create your first AI-powered video and bring your content to life!
                </p>
                <Link href="/create_video">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <PlusCircle className="h-5 w-5 mr-2" />
                        Create Your First Video
                    </Button>
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Your Videos
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoList.map((video, index) => (
                    <motion.div
                        key={video._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={`/play_video/${video._id}`}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader className="p-4">
                                    <CardTitle className="text-lg font-semibold truncate">
                                        {video.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 space-y-4">
                                    {/* Video Preview */}
                                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                        {video.status === 'pending' ? (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
                                                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center px-4">
                                                    Generating your video...
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                    This may take a few minutes
                                                </p>
                                            </div>
                                        ) : video.images && video.images.length > 0 ? (
                                            <Image
                                                src={video.images[0]}
                                                alt={video.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <Video className="h-8 w-8 text-gray-400" />
                                            </div>
                                        )}
                                        {/* Status Badge */}
                                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                                            video.status === 'completed' 
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                        }`}>
                                            {video.status === 'completed' ? 'Completed' : 'Processing'}
                                        </div>
                                    </div>

                                    {/* Video Details */}
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            Topic: {video.topic}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            Created at: {moment(video._creationTime).fromNow()}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default VideoList;
