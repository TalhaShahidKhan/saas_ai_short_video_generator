import { v } from "convex/values";
const { mutation } = require("./_generated/server");

export const CreateNewVideoData = mutation({
  args: {
    title: v.string(),
    caption: v.any(),
    script: v.string(),
    topic: v.string(),
    voice: v.string(),
    videoStyle: v.string(),
    uid: v.id("users"),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("videoData", {
      title: args.title,
      caption: args.caption,
      script: args.script,
      topic: args.topic,
      voice: args.voice,
      videoStyle: args.videoStyle,
      uid: args.uid,
      createdBy: args.createdBy,
    });
    return result;
  },
});

export const UpdateVideoData = mutation({
  args: {
    recordId: v.id("videoData"),
    images: v.optional(v.any()),
    audioUrl: v.optional(v.string()),
    captionJson: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.recordId, {
      images: args.images,
      audioUrl: args.audioUrl,
      captionJson: args.captionJson,
    });
    return result
  },
});
