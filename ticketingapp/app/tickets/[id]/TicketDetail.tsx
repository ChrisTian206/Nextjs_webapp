import React from 'react'
import { Ticket } from '@prisma/client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import TicketStatusBadge from '@/components/TicketStatusBadge'
import TicketPriority from '@/components/TicketPriority'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'


interface Props {
    ticket: Ticket
}

const TicketDetail = ({ ticket }: Props) => {
    return (
        <div className='lg:grid lg:grid-cols-4'>
            <Card className='mx-4 mb-4 lg:col-span-3 lg:mr-4'>
                <div className='flex justify-between m-2'>
                    <TicketStatusBadge status={ticket.status} />
                    <TicketPriority priority={ticket.priority} />
                </div>
                <CardHeader>
                    <CardTitle>{ticket.title}</CardTitle>
                    <CardDescription>
                        Created At:{" "}
                        {ticket.createdAt.toLocaleDateString('en-US', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        })}</CardDescription>
                </CardHeader>

                {/* tailwindCSS prose: can be used to beautify md input */}
                <CardContent className='prose dark:prose-invert'>
                    <ReactMarkdown>{ticket.description}</ReactMarkdown>
                </CardContent>
                <CardFooter>
                    Updated At:{" "}
                    {ticket.updatedAt.toLocaleDateString('en-US', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })}
                </CardFooter>
            </Card>

            <div className='mx-4 flex lg:flex-col lg:mx-0 gap-2'>
                <Link href={`/tickets/update/${ticket.id}`} className={`${buttonVariants({ variant: 'default' })}`}>
                    Edit Ticket
                </Link>

                <Link href={`/tickets/update/${ticket.id}`} className={`${buttonVariants({ variant: 'default' })}`}>
                    Delete Ticket
                </Link>
            </div>

        </div>
    )
}

export default TicketDetail