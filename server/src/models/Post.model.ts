import { Schema, model, Document} from 'mongoose';

export interface IPost extends Document {
    title: string;
    content: string;
    author: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
    title: { type: String, required: true},
    content: { type: String, required: true},
    author: {type: String, required: false},
    tags: { type: [String], required: false},

}
, { timestamps: true });

const Post = model<IPost>('Post', PostSchema);

export default Post;