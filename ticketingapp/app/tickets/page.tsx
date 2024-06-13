import React from 'react'
import prisma from '@/prisma/db'
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

const Ticket = async () => {

    const tickets = await prisma.ticket.findMany();

    return (
        <div>
            <Link href={"/tickets/new"} className={buttonVariants({ variant: "outline" })}>+ Add</Link>
            <DataTable tickets={tickets} />

            {/* CSR */}
            <Pagination itemCount={50} currentPage={3} pageSize={5} />
            {/*  */}
        </div>
    )
}

export default Ticket