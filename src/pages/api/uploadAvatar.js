import formidable from 'formidable';
import { Client, ID, InputFile, Permission, Role, Storage } from 'node-appwrite';

export const config = {
    api: {
        bodyParser: false, // required for file uploads
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = formidable();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'File parse error' });
        }

        const file = files.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
            .setKey(process.env.NEXT_PUBLIC_APPWRITE_SERVER_API_KEY); // Only use server keys in API routes

        const storage = new Storage(client);

        try {
            const uploaded = await storage.createFile({
                bucketId: process.env.NEXT_PUBLIC_BUCKET_ID,
                fileId: ID.unique(),
                file: InputFile.fromPath(file.filepath, file.originalFilename),
                permissions: [
                    Permission.read(Role.any()), // Or customize as needed
                    Permission.write(Role.user('USER_ID')), // Or current user's id
                ]
            });


            const fileUrl = `${client.endpoint}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${uploaded.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
            return res.status(200).json({ url: fileUrl });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
