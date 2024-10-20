'use server';

import { newOrder } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createOrder(data) {
    await newOrder(data.userId, data.items);
    return redirect('/login');
}