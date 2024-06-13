"use client" // client side render, because it requires user interactions.

import React, { useState } from 'react'
import { Form, FormControl, FormLabel, FormField, FormItem } from './ui/form'
import { ticketSchema } from '@/ValidationSchemas/ticket'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Ticket } from '@prisma/client'

//Using Shadcn UI, make sure to import the Comps from ui/<Comp>, NOT FROM redix

type TicketFormData = z.infer<typeof ticketSchema>

interface Props {
    ticket?: Ticket
}

const TicketForm = ({ ticket }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter() //make sure to use the one from next/navigation

    const form = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema)
    })

    const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
        try {
            setIsSubmitting(true)
            setError("")

            if (ticket) {
                await axios.patch("/api/tickets/" + ticket.id, values)
                router.push(`/tickets/${ticket.id}`)
                router.refresh()
                //Here is why this refresh() is needed:
                /**
                 * Client-side Navigation: When using useRouter from next/navigation to navigate back to the Table page, Next.js performs a client-side navigation, which means it doesn't automatically trigger a full page reload or a re-fetch of data unless configured to do so.
                 * Caching: Depending on how the data fetching is set up, the data might be cached and not automatically updated on client-side navigation.
                 * Lack of Data Re-fetch Trigger: If your data fetching logic doesn't have a mechanism to re-fetch the data upon navigation, the Table page will display the old data it initially fetched.
                 */
            } else {
                const newTicket = await axios.post("/api/tickets/", values)
                //console.log("newTicket here is: ", newTicket)
                router.push(`/tickets/${newTicket.data.id}`)
                router.refresh()
            }
            //ps. if values is {values}, it failed zodValidation. It would say invalid type for every field.

            setIsSubmitting(false)
            //always a good practice to reset it back
            //cases are when user has slow speed, they might be confused.


        } catch (error) {
            console.log("error onSubmit: ", error)
            setError("Error Occured, please try again later.")
            setIsSubmitting(false)
        }
    }

    return (
        <div className='rounded-md border w-full p-4'>
            {error && <h1 className='text-red-500 text-center'>{error}</h1>}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField
                        control={form.control}
                        name="title"
                        defaultValue={ticket?.title}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ticket Title</FormLabel>
                                <FormControl>
                                    <Input placeholder='Ticket title...' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Controller
                        name='description'
                        control={form.control}
                        defaultValue={ticket?.description}
                        render={({ field }) => (
                            <SimpleMDE placeholder='description' {...field} />
                        )} />

                    <div className='flex w-full space-x-4'>
                        <FormField
                            control={form.control}
                            name="status"
                            defaultValue={ticket?.status}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="status..." />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem value='OPEN'>Open</SelectItem>
                                            <SelectItem value='STARTED'>Started</SelectItem>
                                            <SelectItem value='CLOSED'>Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                    </div>

                    <div className='flex w-full space-x-4'>
                        <FormField
                            control={form.control}
                            name="priority"
                            defaultValue={ticket?.priority}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="priority..." />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem value='LOW'>Low</SelectItem>
                                            <SelectItem value='MEDIUM'>Medium</SelectItem>
                                            <SelectItem value='HIGH'>High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                    </div>

                    <Button type='submit' disabled={isSubmitting}>
                        {
                            ticket ? "Update Ticket" : "Submit Ticket"
                        }
                    </Button>
                </form>
            </Form>
        </div>

    )
}

export default TicketForm