import { generateClient } from "aws-amplify/api";
import { type Schema } from "@/amplify/data/resource";
import { useEffect, useState } from "react";


export default function DashboardCard(){
    const [drugs, setDrugs] = useState<Array<Schema["Drug"]["type"]>>([])
    const [pharmacies, setPharmacies] = useState<Array<Schema["Pharmacy"]["type"]>>([])
    const [healthCares, setHealthCares] = useState<Array<Schema["HealthCareProvider"]["type"]>>([])
    const client = generateClient<Schema>();

    useEffect(()=>{
        listDrugs()
        listPharmacies(),
        listHealthUnits()
    }, [])

    const listDrugs = async ()=>{
        try {
            client.models.Drug.observeQuery().subscribe({
              next: (data) => setDrugs([...data.items]),
            });
            
          } catch (err) {
            console.log(err);
          }
    }
    const listPharmacies = async ()=>{
        try {
            client.models.Pharmacy.observeQuery().subscribe({
              next: (data) => setPharmacies([...data.items]),
            });
            
          } catch (err) {
            console.log(err);
          }
    }
    const listHealthUnits = async ()=>{
        try {
            client.models.HealthCareProvider.observeQuery().subscribe({
              next: (data) => setHealthCares([...data.items]),
            });
            
          } catch (err) {
            console.log(err);
          }
    }
    return (
        <div className="flex justify-evenly flex-wrap gap-4 p-4 sm:ml-64">
        <div className="h-[100px] w-[180px] bg-blue-700 rounded-xl relative overflow-hidden">
          <div className="flex justify-center">
            <p className="my-5 text-white font-bold"> {drugs.length}+</p>
          </div>
          <div className="bg-black/40 w-full absolute bottom-0 flex justify-center py-1 text-white">
            Total Drugs
          </div>
        </div>
        <div className="h-[100px] w-[180px] bg-blue-700 rounded-xl relative overflow-hidden">
          <div className="bg-black/40 w-full absolute bottom-0 flex justify-center py-1 text-white">
            Total Users
          </div>
        </div>
        <div className="h-[100px] w-[180px] bg-blue-700 rounded-xl relative overflow-hidden">
        <div className="flex justify-center">
            <p className="my-5 text-white font-bold"> {pharmacies.length}+</p>
          </div>
          <div className="bg-black/40 w-full absolute bottom-0 flex justify-center py-1 text-white">
            Total Pharmacies
          </div>
        </div>
        <div className="h-[100px] w-[180px] bg-blue-700 rounded-xl relative overflow-hidden">
        <div className="flex justify-center">
            <p className="my-5 text-white font-bold"> {healthCares.length}+</p>
          </div>
          <div className="bg-black/40 w-full absolute bottom-0 flex justify-center py-1 text-white">
            Health Cares
          </div>
        </div>
      </div>
    )
}