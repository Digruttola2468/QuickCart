import dbConnect from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        
        const { userId } = getAuth(request);

        const { cartData } = await request.json();

        await dbConnect();
        cosnole.log(cartData);
        
        const user = await User.findByIdAndUpdate(userId, { cartItems: cartData });
        console.log(user);
        if (!user) 
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

        return NextResponse.json({ success: true, message: "Cart updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}