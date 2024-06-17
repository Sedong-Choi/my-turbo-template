import { handlers } from "@/auth"
import { NextRequest, NextResponse } from "next/server";

 export const GET = (req:NextRequest,res: NextResponse)=>{

   //  console.log( 'nextauth GET request ',req);
   //  console.log( 'nextauth GET response ',res);
    return handlers.GET(req);
}     

 export const POST = (req:NextRequest,res: NextResponse)=>{
   //  console.log( 'nextauth POST request ',req);
   //  console.log( 'nextauth POST response ',res);
    return handlers.POST(req)
 }

export const runtime = "edge"