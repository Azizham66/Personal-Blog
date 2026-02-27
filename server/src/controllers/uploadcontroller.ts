import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import type { Request, Response } from 'express';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Use memory storage for multer
const storage = multer.memoryStorage();
export const upload = multer({ storage });

type UploadRequest = Request & { file?: Express.Multer.File };

export const uploadController = async (req: UploadRequest, res: Response) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ 
                error: 'No file uploaded',
                message: 'Please select a file to upload'
            });
        }

        // Validate file size (optional: add size limit)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (req.file.size > maxSize) {
            return res.status(413).json({ 
                error: 'File too large',
                message: 'File size must be less than 10MB'
            });
        }

        // Upload to Cloudinary
        const result = await new Promise<any>((resolve, reject) => {
            if (!req.file) {
                reject(new Error('No file provided'));
                return;
            }
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'blog-uploads'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(req.file.buffer);
        });

        // Return success response
        res.status(200).json({ 
            message: 'File uploaded successfully',
            url: result.secure_url
        });

    } catch (error: any) {
        console.error('Upload error details:', error);
        res.status(500).json({ 
            error: 'Upload failed',
            message: 'An error occurred while uploading the file',
            details: error.message
        });
    }
};