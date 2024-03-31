import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import saveToJson from '../app';

describe('saveToJson', () => {
  const testDir = path.join(__dirname, 'test-output');
  const testFile = path.join(testDir, 'test.json');

  beforeEach(async () => {
    // Create the test directory before each test
    await fs.promises.mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    // Clean up the test directory after each test
    await fs.promises.rm(testDir, { recursive: true, force: true });
  });

  it('should save the object to the specified file', async () => {
    const data = { name: 'John Doe', age: 30 };
    await saveToJson(data, testFile);

    // Check if the file exists
    expect(fs.existsSync(testFile)).toBe(true);

    // Read the file and compare the contents
    const savedData = JSON.parse(
      fs.readFileSync(testFile, 'utf-8'),
    ) as { name: string; age: number };
    expect(savedData).toEqual(data);
  });

  it('should create the directory if it does not exist', async () => {
    const nestedDir = path.join(testDir, 'nested');
    const nestedFile = path.join(nestedDir, 'test.json');
    const data = { name: 'Jane Smith', age: 25 };

    await saveToJson(data, nestedFile);

    // Check if the nested directory and file exist
    expect(fs.existsSync(nestedDir)).toBe(true);
    expect(fs.existsSync(nestedFile)).toBe(true);

    // Read the file and compare the contents
    const savedData = JSON.parse(
      fs.readFileSync(nestedFile, 'utf-8'),
    ) as { name: string; age: number };
    expect(savedData).toEqual(data);
  });

  it('should throw an error if the file path is invalid', async () => {
    const invalidFile = path.join(testDir, 'invalid', 'test.json');
    const data = { name: 'Alice', age: 35 };

    await expect(saveToJson(data, invalidFile)).rejects.toThrow('Invalid file path');
  });
});
