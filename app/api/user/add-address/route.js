import dbConnect from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        
        const { userId } = getAuth(request);
        const { address } = await request.json();
        
        if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        
        await dbConnect();

        const newAddress = await Address.create({...address, userId});

        return NextResponse.json({ success: true, data: newAddress, message: "Address added successfully" }, { status: 201 });


    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    }
}