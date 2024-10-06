import fs from "fs"
import path from "path"

exports.handler = async (event) => {
    const { folder } = event.queryStringParameters;

    if (!folder) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Folder parameter is required' }),
        };
    }

    const filePath = path.join(__dirname, '../songs', folder, 'info.json');

    try {
        const data = fs.readFileSync(filePath);
        return {
            statusCode: 200,
            body: data.toString(),
        };
    } catch (error) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Folder not found' }),
        };
    }
};
