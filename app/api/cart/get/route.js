import dbConnect from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET(request) {
    try {
        
        const {userId} = getAuth(request);

        await dbConnect();

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const {cartItems} = user;

        return NextResponse.json({ success: true, data: cartItems }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}