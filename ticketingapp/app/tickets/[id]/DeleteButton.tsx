"use client"

import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface Props {
    ticketId: number
}

const DeleteButton = ({ ticketId }: Props) => {

    //it's next/navigate useRouter(). This can be used to navigate user back to table once delete action is complete
    const router = useRouter()

    const [error, setError] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteHandler = async () => {
        try {
            setIsDeleting(true)
            //using axios instead of prisma, cuz we are doing client side rendering
            await axios.delete("/api/tickets/" + ticketId)
            router.push("/tickets")
            router.refresh() //To update table
        } catch (err) {
            setIsDeleting(false)
            setError("Error Occur.")
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger
                    className={buttonVariants({ variant: "destructive" })}
                    disabled={isDeleting}
                >Delete Ticket</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your ticket
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className={buttonVariants({ variant: "destructive" })}
                            disabled={isDeleting}
                            onClick={deleteHandler}
                        >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <p className='text-destructive'>{error}</p>
        </>
    )
}

export default DeleteButton