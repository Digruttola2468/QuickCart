import dbConnect from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await dbConnect();

        const products = await Product.find();

        if (products.length === 0) {
            return NextResponse.json({ success: false, message: "No products found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: products }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    }
}