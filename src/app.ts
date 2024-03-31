import { writeFile, mkdir } from 'fs/promises';
import * as path from 'path';

const saveToJson = async (obj: object, filePath: string): Promise<void> => {
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });
  await writeFile(filePath, JSON.stringify(obj, null, 2));
};

export default saveToJson;
