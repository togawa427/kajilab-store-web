import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public/products');

const saveFile = (file: Express.Multer.File) => {
  const filePath = path.join(uploadDir, file.originalname);
  fs.writeFileSync(filePath, file.buffer);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const file = req.files?.[0];
    if (file) {
      try {
        saveFile(file);
        res.status(200).json({ message: 'File uploaded successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to upload file' });
      }
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}