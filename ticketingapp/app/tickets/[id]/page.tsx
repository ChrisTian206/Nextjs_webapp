import React from 'react'
import prisma from '@/prisma/db'
import { NextResponse } from 'next/server'
import TicketDetail from './TicketDetail'

interface Props {
    params: { id: string }
}

const ViewTicket = async ({ params }: Props) => {

    /** DB access & SSR
     * A little detail here. Normally when we build a React page, we access database using
     * axios to request data from backend api. But in nextjs, since we are doing SSR, we have
     * access to database directly. That's why we are able to do prisma.find() below w/o axios.
     */
    const ticket = await prisma.ticket.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!ticket) {
        return <p className='text-destructive'>Ticket Not Found</p>
    }
    return (
        <TicketDetail ticket={ticket} />
    )
}
export default ViewTicket