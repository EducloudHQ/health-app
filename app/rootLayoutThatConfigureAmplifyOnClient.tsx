"use client";

import outputs from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs, {
  ssr: true, // required when using Amplify with Next.js
});
Amplify.configure({
  ...Amplify.getConfig(),
  Interactions: {
    LexV2: {
      HotelBooking: {
        aliasId: "TSTALIASID",
        botId: "ZY0IXSSN8H",
        localeId: "en_US",
        region: "us-east-1",
      },
    },
  },
});

export default function RootLayoutThatConfiguresAmplifyOnTheClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
