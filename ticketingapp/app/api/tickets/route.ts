import { ticketSchema } from "@/ValidationSchemas/ticket";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()

    //safeParse() is a z.object method
    const validation = ticketSchema.safeParse(body)

    console.log("validation from tickets api: ", validation?.error)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newTicket = await prisma.ticket.create({
        data: { ...body }
    })

    return NextResponse.json(newTicket, { status: 201 });
}