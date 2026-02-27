const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Create a simple test image buffer (1x1 pixel PNG)
const testImageBuffer = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
    0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00,
    0xFE, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00,
    0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
]);

async function testUpload() {
    try {
        console.log('Testing upload to Cloudinary...');
        
        // Create form data
        const form = new FormData();
        form.append('file', testImageBuffer, {
            filename: 'test-image.png',
            contentType: 'image/png'
        });

        // Send request to your server
        const response = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: form,
            headers: {
                ...form.getHeaders()
            }
        });

        const responseText = await response.text();
        console.log('Raw response:', responseText);
        
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.log('Response is not JSON, showing raw text');
            return;
        }
        
        if (response.ok) {
            console.log('✅ Upload successful!');
            console.log('Response:', result);
            console.log('Image URL:', result.url);
        } else {
            console.log('❌ Upload failed:', result);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testUpload();
