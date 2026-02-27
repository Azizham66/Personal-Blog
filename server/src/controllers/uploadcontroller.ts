import multer from 'multer';
import path from 'path';
import type { Request, Response } from 'express';

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (_, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage });

type UploadRequest = Request & { file?: Express.Multer.File };

export const uploadController = (req: UploadRequest, res: Response) => {
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

        // Generate file URL
        const baseUrl = process.env.SERVER_URL || 'https://blogapi.techazizo.site';
        const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

        // Return success response
        res.status(200).json({ 
            message: 'File uploaded successfully',
            url: fileUrl,
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size
        });

    } catch (error: any) {
        res.status(500).json({ 
            error: 'Upload failed',
            message: 'An error occurred while uploading the file'
        });
    }
};