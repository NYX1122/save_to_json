import { writeFile } from 'fs/promises';

const saveToJson = async (obj: object, dir: string): Promise<void> => {
  await writeFile(dir, JSON.stringify(obj, null, 2));
};

export default saveToJson;
