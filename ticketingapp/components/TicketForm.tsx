"use client"

import React from 'react'
import { Form, FormControl, FormLabel, FormField, FormItem } from './ui/form'
import { ticketSchema } from '@/ValidationSchemas/ticket'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type TicketFormData = z.infer<typeof ticketSchema>

const TicketForm = () => {

    const form = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema)
    })

    const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
        console.log(values)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="title"
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
                        render={({ field }) => (
                            <SimpleMDE />
                        )} />

                    <div className='flex w-full space-x-4'>
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="status..." />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value='OPEN'>Open</SelectItem>
                                                <SelectItem value='STARTED'>Started</SelectItem>
                                                <SelectItem value='CLOSED'>Closed</SelectItem>
                                            </SelectContent>
                                        </FormControl>
                                    </Select>
                                </FormItem>
                            )} />
                    </div>
                </form>
            </Form>
        </>

    )
}

export default TicketForm