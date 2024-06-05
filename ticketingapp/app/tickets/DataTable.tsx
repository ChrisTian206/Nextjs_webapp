import React from 'react'
import { Ticket } from '@prisma/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Props {
    tickets: Ticket[]
}

const DataTable = ({ tickets }: Props) => {

    console.log(`Totol of ${tickets.length} Tickets printed from DataTable: `)
    return (
        <div className='w-full mt-5'>
            <div className='rounded-md sm:border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tickets ? tickets.map((ticket) => {
                            return (
                                <TableRow key={ticket.id} data-href='/'>
                                    <TableCell>{ticket.title}</TableCell>
                                    <TableCell>{ticket.status}</TableCell>
                                    <TableCell>{ticket.priority}</TableCell>
                                    <TableCell>{ticket.createdAt.toLocaleDateString('en-US', {
                                        year: '2-digit',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default DataTable