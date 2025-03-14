import { v } from "convex/values";
const { mutation, query } = require("./_generated/server");

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
    credits: v.number()
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
      status: 'pending'
    });
    await ctx.db.patch(args.uid,{
      credits:(args.credits)-1
    })
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
      status:'completed'
    });
    return result
  },
});


export const GetVideoList = query({
    args: {
        uid: v.id('users')
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('videoData')
            .filter(q => q.eq(q.field('uid'), args.uid))
            .order('desc')
            .collect();
        return result;
    }
});

export const GetVideoDataById = query({
    args: {
        videoId: v.id('videoData')
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.get(args.videoId)
        return result
    }
});
