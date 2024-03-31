import { writeFile, mkdir } from 'fs/promises';
import * as path from 'path';

const saveToJson = async (obj: object, filePath: string): Promise<void> => {
  try {
    const dir = path.dirname(filePath);
    await mkdir(dir, { recursive: true });
    await writeFile(filePath, JSON.stringify(obj, null, 2));
  } catch (error) {
    if (error instanceof Error && error.message.includes('ENOENT')) {
      throw new Error('Invalid file path');
    }
    throw error;
  }
};

export default saveToJson;
