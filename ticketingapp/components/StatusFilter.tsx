"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'


//using ?: means 'value' might or might not have a value. If there is then it's a string. If not, ignore it.
const status: { label: string, value?: string }[] = [
    { label: "Open / Started" }, //This give users the option to not see CLSOED ticket.
    { label: "Open", value: "OPEN" },
    { label: "Started", value: "STARTED" },
    { label: "Closed", value: "CLOSED" },
]

const StatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    return (
        <>
            <Select defaultValue={searchParams.get("status") || ""}
                onValueChange={(status) => {
                    //When user select one of the options
                    const params = new URLSearchParams()
                    if (status) {
                        params.append('status', status)
                    }
                    const query = params.size ? `?${params.toString()}` : "0"
                    router.push(`/tickets${query}`)
                }}>

                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        {status.map((status) => (
                            <SelectItem
                                key={status.value || "0"} //status.value 可有可无
                                value={status.value || "0"}
                            >
                                {status.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default StatusFilter