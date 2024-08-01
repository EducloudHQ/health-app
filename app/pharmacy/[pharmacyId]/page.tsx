"use client";

import Navbar from "@/components/common-components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../../amplify/data/resource";
import { useEffect, useState } from "react";
import { createMap } from 'maplibre-gl-js-amplify';
import 'maplibre-gl/dist/maplibre-gl.css';
import { drawPoints } from 'maplibre-gl-js-amplify';
import { useSearchParams } from "next/navigation";


export default function Pharmacy({ params }: any) {
  const searchParams = useSearchParams();
  const client = generateClient<Schema>();
  const [drugs, setDrugs]: any = useState([]);
  const [pharmacy, setPharmacy]: any = useState({})
  const bucketName = "https://amplify-d2yrv03l6hwvow-ma-amplifyteamdrivebucket28-ts944jk2zo40.s3.amazonaws.com/pictures"

  const pharmlng = parseFloat(searchParams.get('pharmlng')!);
  const pharmlat = parseFloat(searchParams.get('pharmlat')!);
  const loclng = parseFloat(searchParams.get('loclng')!);
  const loclat = parseFloat(searchParams.get('loclat')!);
  const pharmName = searchParams.get('pharmName')!;

  useEffect(() => {
    initializeMap();
  }, []);

  async function initializeMap() {
    const map = await createMap({
      container: 'map', // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/
      center: [loclng, loclat], 
      zoom: 16
    });

    map.on('load', function () {
      drawPoints(
        'mySourceName', 
        [
          {
            coordinates: [loclng, loclat],
            title: 'Your current location',
          },
          {
            coordinates: [pharmlng, pharmlat],
            title: pharmName
          }
        ], 
        map,
        {
          showCluster: true,
          unclusteredOptions: {
            showMarkerPopup: true
          },
          clusterOptions: {
            showCount: true
          }
        }
      );
    });
  }

  return (
    <div className="h-[100%] w-[100%]">
      <Navbar />
      <script type="text/javascript" src="/script.js"></script>
      <div className="h-[100vh]" id="map"></div>
      <Footer />
    </div>
  );
}

