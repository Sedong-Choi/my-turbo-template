import { userExists } from "@repo/ui/Utils";
import { NextResponse } from "next/server";

// import for mock data update logic
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { userTable } from "@repo/ui/mock";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../../../../../../packages/ui/src/mock/user.ts');
export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    const exists = userExists(email);

    if (exists) {
      return NextResponse.json({ message: "User already exists" },{status:409});
    }

    // Update mock data
    const userList = userTable;
    const newUser = { id: userList.length + 1, email, password, name };
    userList.push(newUser);

    fs.writeFileSync(
      filePath,
      `export const userTable = ${JSON.stringify(userList, null, 2)}`
    );

  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
