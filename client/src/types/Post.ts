export type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    tags: string[];
    createdAt: string | Date;
    updatedAt: string | Date;
}