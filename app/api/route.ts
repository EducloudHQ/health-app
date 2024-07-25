import { NextRequest, NextResponse } from "next/server";
import { LocationClient, SearchPlaceIndexForTextCommand } from "@aws-sdk/client-location";
import { secret } from "@aws-amplify/backend";
export async function GET(req: NextRequest, res: any) {
  const client = new LocationClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: secret("AWS_ACCESS_KEY").resolve.toString(),
      secretAccessKey: secret("AWS_SECCRET_KEY").resolve.toString()
    }
  });

  const place = "Pharmacy";
  const longitude = parseFloat(req.url.split('?')[1].split('&')[0].split('=')[1])
  const latitude = parseFloat(req.url.split('?')[1].split('&')[1].split('=')[1])

  const command = new SearchPlaceIndexForTextCommand({
    IndexName: secret("INDEX_NAME").resolve.toString(),
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