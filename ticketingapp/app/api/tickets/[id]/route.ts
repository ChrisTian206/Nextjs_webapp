import { ticketSchema } from "@/ValidationSchemas/ticket";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Props) {
    //Getting data in the request, use await
    //Inside the body is the newly updated data for this ticket. Of course we are gonna validate it.
    const body = await request.json()
    const validation = ticketSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const ticket = await prisma.ticket.findUnique({
        //"where" is SQL parameter
        //using parseInt because [id] in url is in the format of string
        where: { id: parseInt(params.id) }
    })

    if (!ticket) {
        return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 })
    }

    const updateTicket = await prisma.ticket.update({
        where: { id: ticket.id },
        data: {
            ...body
        }
    });

    return NextResponse.json(updateTicket)
}

export async function DELETE(request: NextRequest, { params }: Props) {

    const ticket = await prisma.ticket.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!ticket) {
        return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 })
    }

    await prisma.ticket.delete({
        where: { id: ticket.id },
    }).catch((err) => {
        return NextResponse.json({ message: "Failed to delete", error: err }, { status: 500 })
    })

    return NextResponse.json({ message: "Ticket is deleted" })
}
