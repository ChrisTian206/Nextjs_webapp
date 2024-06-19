import React from 'react'
import prisma from '@/prisma/db'
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status } from '@prisma/client';

interface SearchParams {
    status: Status
    page: string
}

const Ticket = async ({ searchParams }: { searchParams: SearchParams }) => {

    const ticketsCount = await prisma.ticket.count()
    //console.log("ticket count: ", ticketsCount)
    const pageSize = 7
    /** why ' ||1 '? What if searchParams is empty?
     * currentPage is page or 1. Because in the case where user jump from other page like Dashboard or profile
     * won't have the page param in the url, which could lead to failure.
     */
    const currentPage = parseInt(searchParams.page) || 1
    //console.log("current page: ", currentPage)

    const tickets = await prisma.ticket.findMany({
        take: pageSize,
        skip: (currentPage - 1) * pageSize
    });

    const validStatuses = Object.values(Status)

    /** What if searchParams is empty?
     * includes() returns a boolean. If searchParams is empty or not matching, then a false would be returned
     * which 'status' will result in undefined.
     */
    const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined


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