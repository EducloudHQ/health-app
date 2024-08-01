import { NextRequest, NextResponse } from "next/server";
import { LocationClient, SearchPlaceIndexForTextCommand } from "@aws-sdk/client-location";
export async function GET(req: NextRequest, res: any) {
  console.log(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY)
  console.log(process.env.NEXT_PUBLIC_AWS_SECCRET_KEY)
  console.log(process.env.NEXT_PUBLIC_INDEX_NAME)

  const client = new LocationClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECCRET_KEY!
    }
  });

  const place = "Pharmacy";
  const longitude = parseFloat(req.url.split('?')[1].split('&')[0].split('=')[1])
  const latitude = parseFloat(req.url.split('?')[1].split('&')[1].split('=')[1])

  const command = new SearchPlaceIndexForTextCommand({
    IndexName: process.env.NEXT_PUBLIC_INDEX_NAME,
    Text: place,
    MaxResults: 5,
    BiasPosition: [longitude, latitude],
  });

  try {
    const response = await client.send(command);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error searching for place:", error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}