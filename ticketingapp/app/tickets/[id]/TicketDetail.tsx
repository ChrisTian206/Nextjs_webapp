import React from 'react'
import { Ticket } from '@prisma/client'
interface Props {
    ticket: Ticket
}

const TicketDetail = ({ ticket }: Props) => {
    return (
        <>
            <h1>{ticket.title}</h1>
            <h2>{ticket.description}</h2>
            <h2>{ticket.status}</h2>
            <h2>{ticket.priority}</h2>
        </>
    )
}

export default TicketDetail