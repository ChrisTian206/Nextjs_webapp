"use client"

import React from 'react'
import { Button } from './ui/button'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    itemCount: number,
    currentPage: number,
    pageSize: number,
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {

    const pageCount = Math.ceil(itemCount / pageSize) //ceil() rounds up to whole number
    const router = useRouter()
    const searchParams = useSearchParams()


    if (pageCount <= 1) {
        return null
    }

    const changePage = (pageNum: number) => {
        const params = new URLSearchParams(searchParams)
        //console.log("Params: ", params)
        params.set("page", pageNum.toString())
        router.push("?" + params.toString())
    }

    return (
        <div className='text-center my-2'>
            <Button variant="outline" disabled={currentPage === 1}
                onClick={() => changePage(1)}>
                <ChevronFirst />
            </Button>
            <Button variant="outline" disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}>
                <ChevronLeft />
            </Button>
            <span className='mx-3'>
                Page {currentPage} of {pageCount}
            </span>
            <Button variant="outline" disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage + 1)}>
                <ChevronRight />
            </Button>
            <Button variant="outline" disabled={currentPage === pageCount}
                onClick={() => changePage(pageCount)}>
                <ChevronLast />
            </Button>
        </div>
    )
}


export default Pagination