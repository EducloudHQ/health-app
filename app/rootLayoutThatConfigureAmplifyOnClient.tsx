"use client";

import outputs from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs, {
  ssr: true, // required when using Amplify with Next.js
});
// Amplify.configure({
//   ...Amplify.getConfig(),
//   Geo: {
//     LocationService: {
//       maps: {
//         items: {
//           myMap: {
//             // REQUIRED - Amazon Location Service Map resource name
//             style: 'VectorEsriStreets' // REQUIRED - String representing the style of map resource
//           }
//         },
//         default: '<your-preferred-default-map>' // REQUIRED - Amazon Location Service Map resource name to set as default
//       },
//       searchIndices: {
//         items: ['<your-geo-index>'], // REQUIRED - Amazon Location Service Place Index name
//         default: '<your-default-index>' // REQUIRED - Amazon Location Service Place Index name to set as default
//       },
//       geofenceCollections: {
//         items: ['<your-geo-collection>'], // REQUIRED - Amazon Location Service Geofence Collection name
//         default: '<your-default-collection>' // REQUIRED - Amazon Location Service Geofence Collection name to set as default
//       },
//       region: 'us-east-1' // REQUIRED - Amazon Location Service Region
//     }
//   }
// })
export default function RootLayoutThatConfiguresAmplifyOnTheClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
