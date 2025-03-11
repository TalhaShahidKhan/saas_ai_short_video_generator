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
    return result
  },
});
