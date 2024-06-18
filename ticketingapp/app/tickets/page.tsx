import React from 'react'
import prisma from '@/prisma/db'
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';

interface SearchParams {
    page: string
}

const Ticket = async ({ searchParams }: { searchParams: SearchParams }) => {

    const ticketsCount = await prisma.ticket.count()
    //console.log("ticket count: ", ticketsCount)
    const pageSize = 7
    /** why ' ||1 '
     * currentPage is page or 1. Because in the case where user jump from other page like Dashboard or profile
     * won't have the page param in the url, which could lead to failure.
     */
    const currentPage = parseInt(searchParams.page) || 1
    //console.log("current page: ", currentPage)

    const tickets = await prisma.ticket.findMany({
        take: pageSize,
        skip: (currentPage - 1) * pageSize
    });


    return (
        <div>
            <Link href={"/tickets/new"} className={buttonVariants({ variant: "outline" })}>+ Add</Link>
            <StatusFilter />
            <DataTable tickets={tickets} />

            {/* CSR */}
            <Pagination itemCount={ticketsCount} currentPage={currentPage} pageSize={pageSize} />
            {/*  */}
        </div>
    )
}

export default Ticket