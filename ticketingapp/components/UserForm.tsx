"use client" // client side render, because it requires user interactions.

import React, { useState } from 'react'
import { Form, FormControl, FormLabel, FormField, FormItem } from './ui/form'
import { ticketSchema } from '@/ValidationSchemas/ticket'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import { userSchema } from '@/ValidationSchemas/users'

//Using Shadcn UI, make sure to import the Comps from ui/<Comp>, NOT FROM redix

type UserFormData = z.infer<typeof userSchema>

interface Props {
    user?: User
}

const UserForm = ({ user }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter() //make sure to use the one from next/navigation

    const form = useForm<UserFormData>({
        resolver: zodResolver(userSchema)
    })

    const onSubmit = async (values: z.infer<typeof userSchema>) => {
        try {
            setIsSubmitting(true)
            setError("")

            if (user) {
                await axios.patch("/api/users/" + user.id, values)
                router.push(`/users/${user.id}`)
                router.refresh()
            } else {
                console.log(values)
                const newTicket = await axios.post("/api/users/", values)
                //console.log("newTicket here is: ", newTicket)
                router.push(`/tickets`)
                router.refresh()
            }
            //ps. if values is {values}, it failed zodValidation. It would say invalid type for every field.

            setIsSubmitting(false)

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
                        name="name"
                        defaultValue={user?.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fullname</FormLabel>
                                <FormControl>
                                    <Input placeholder='fullname...' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        defaultValue={user?.username}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder='username...' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' required={user ? false : true} placeholder='password...' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className='flex w-full space-x-4'>
                        <FormField
                            control={form.control}
                            name="role"
                            defaultValue={user?.role}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="role..." />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem value='ADMIN'>ADMIN</SelectItem>
                                            <SelectItem value='TECH'>TECH</SelectItem>
                                            <SelectItem value='USER'>USER</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                    </div>

                    <Button type='submit' disabled={isSubmitting}>
                        {
                            user ? "Update" : "Creat Account"
                        }
                    </Button>
                </form>
            </Form>
            <p className='text-destructive'>{error}</p>
        </div>

    )
}

export default UserForm