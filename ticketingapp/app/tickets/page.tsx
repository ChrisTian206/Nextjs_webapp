import React from 'react'
import prisma from '@/prisma/db'
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const Ticket = async () => {

    const tickets = await prisma.ticket.findMany();

    return (
        <div>
            <Link href={"/tickets/new"} className={buttonVariants({ variant: "outline" })}>+ Add</Link>
            <DataTable tickets={tickets} />
        </div>
    )
}

export default Ticket