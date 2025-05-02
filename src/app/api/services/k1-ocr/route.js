import { NextResponse } from "next/server";
import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    // Parse the incoming request form data
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "Missing required files" },
        { status: 400 }
      );
    }

    // Convert File to Buffer (Next.js does not have direct file streams)
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Save buffers to temporary files (Next.js API routes don't support streams)
    const filePath = path.join("/tmp", file.name);

    fs.writeFileSync(filePath, fileBuffer);

    let imageData = fs.readFileSync(filePath);

    // Make the API request
    const response = await axios.post(
      "https://api.azapi.ai/ind0009b",
      imageData,
      {
        headers: {
          Authorization: `${process.env.API_KEY}`,
          "Content-Type": "image/jpeg",
        },
        maxBodyLength: Infinity,
      }
    );

    // Delete temporary files
    fs.unlinkSync(filePath);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: error.response ? error.response.data : error.message },
      { status: 500 }
    );
  }
}
