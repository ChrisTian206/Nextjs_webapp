import UserForm from '@/components/UserForm'
import prisma from '@/prisma/db'
import { setGlobal } from 'next/dist/trace'
import React from 'react'

interface Props {
    params: { id: string }
}

const UpdateUser = async ({ params }: Props) => {

    const user = await prisma?.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!user) {
        return <p className='text-destructive'>User not found</p>
    }

    //UserForm is expecting a complete user obj, but we dont want to
    //pass the pw along with it, so we set it to "". It's on the server
    //side, so it should be safe.
    user.password = ""

    return (
        <>
            <UserForm user={user} />
        </>
    )
}

export default UpdateUser