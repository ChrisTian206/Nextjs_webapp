import React from 'react'
import prisma from '@/prisma/db'
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status, Ticket } from '@prisma/client';

export interface SearchParams {
    status: Status
    page: string
    orderBy: keyof Ticket
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {

    const pageSize = 7
    /** why ' ||1 '? What if searchParams is empty?
     * currentPage is page or 1. Because in the case where user jump from other page like Dashboard or profile
     * won't have the page param in the url, which could lead to failure.
     */
    const currentPage = parseInt(searchParams.page) || 1
    //console.log("current page: ", currentPage)

    const validStatuses = Object.values(Status)

    /** What if searchParams is empty?
     * includes() returns a boolean. If searchParams is empty or not matching, then a false would be returned
     * which 'status' will result in undefined.
     */
    const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined

    let where = {} //setting a dynamic SQL condition; remember SQL grabbing data is SELECT ... FROM ... WHERE ... and more.
    if (status) {
        where = { status: status } // if there's a status, then grab data with that status
    } else {
        where = {
            NOT: [{ status: "CLOSED" }] //Lecture original:  NOT: [{ status: "CLOSED" as Status }] 
            /** Difference between having 'as Status' or not.
             * Both works. Without it, Prisma still perfectly understands what to extract.
             * With it, it tells TypeScript "CLOSED" is not just a string, it's a value in the Status. 
             * It keeps TypeScript error checker happy. Makes DX better.
             */
        }
    }

    const tickets = await prisma.ticket.findMany({
        where,
        take: pageSize,
        skip: (currentPage - 1) * pageSize
    });


    /** MISTAKE: const ticketsCount = tickets.length
     * If done this way, ticketsCount will be some number less than 7 cuz 
     * tickets are dynamically changed. It will retrive 7 tickets once at a time upon changing pages.
     */

    const ticketsCount = await prisma.ticket.count({ where })
    //console.log("ticket count: ", ticketsCount)

    return (
        <div>
            <div className='flex justify-between items-center'>
                <Link href={"/tickets/new"} className={buttonVariants({ variant: "outline" })}>+ Add</Link>
                <StatusFilter />
            </div>
            <DataTable tickets={tickets} searchParams={searchParams} />

            {/* CSR */}
            <Pagination itemCount={ticketsCount} currentPage={currentPage} pageSize={pageSize} />
            {/*  */}
        </div>
    )
}

export default Tickets