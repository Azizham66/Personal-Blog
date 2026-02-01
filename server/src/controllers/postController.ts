import Post from "../models/Post.model.ts";
import type { Request, Response } from "express";
import type { IPost } from "../models/Post.model.ts";
import { Types } from "mongoose";

const getPosts = async (req: Request, res: Response) => {
    try {
        const posts: IPost[] = await Post.find().sort({ createdAt: -1});
        res.status(200).json(posts);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(new  Types.ObjectId(req.params.id)); 
        if (!post) {
            return res.status(404).json( { message: "Post not found" } );
        }

        res.status(200).json(post);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export interface PostRequestBody {
    title: string;
    content: string;
    author: string;
    tags?: string[];
}
const savePost = async (req: Request, res: Response) => {
    try {
        const { title, content, author, tags } = req.body as PostRequestBody;
        if (!title) {
            return  res.status(400).json({ message: "Title is required" });
        } 
        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }
        if (!author) {
            return res.status(400).json({ message: "Author is required" });
        }
        
        const newPost = new Post({
            title, 
            content,
            author,
            tags,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const updatePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(new Types.ObjectId(req.params.id));
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const { title, content, tags} = req.body as Partial<PostRequestBody>;
        const updatedPost = await Post.findOneAndUpdate(
            { _id: new Types.ObjectId(req.params.id)},
            { title: title ?? post.title, content: content ?? post.content, tags: tags ?? post.tags },
            { new: true },
        );
        if (!updatedPost) {
            if (!updatedPost) {
                res.status(500).json({ message: "Failed to update post" });
            }
        }

        res.status(200).json(updatedPost);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const deletePost = async (req: Request, res: Response) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(new Types.ObjectId(req.params.id));
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found or already deleted" });
        }
        res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { getPosts, getPostById, savePost, updatePost, deletePost };