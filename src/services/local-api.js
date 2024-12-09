import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function getLocalApi() {
  // Lire le fichier JSON
  const filePath = path.join(process.cwd(), 'public', 'emulate-datas', 'game-tags', 'game-tags.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContents);

  return NextResponse.json(data);
}