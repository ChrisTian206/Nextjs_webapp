import prisma from '@/prisma/db'
import dynamic from 'next/dynamic'
import React from 'react'

interface Props {
    params: { id: string }
}

/**
 * By default, nextjs renders pages on server, that's why it's so famous for. React + SSR
 * But we dont want everything to be SSR. Like the TicketForm below, cuz we need user interaction.
 * By using dynamic(), we can do partial rendering. Isn't it cool?
 */
const TicketForm = dynamic(() => import("@/components/TicketForm"), {
    ssr: false
})

const UpdateTicket = async ({ params }: Props) => {
    /** DB access & SSR
     * A little detail here. Normally when we build a React page, we access database using
     * axios to request data from backend api. But in nextjs, since we are doing SSR, we have
     * access to database directly. That's why we are able to do prisma.find() below w/o axios.
     */
    const ticket = await prisma?.ticket.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!ticket) {
        return <p className='text-destructive'>Ticket Not Found</p>
    }

    return (
        <TicketForm ticket={ticket} />
    )
}

export default UpdateTicket