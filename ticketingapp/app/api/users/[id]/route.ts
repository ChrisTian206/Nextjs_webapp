import { userSchema } from "@/ValidationSchemas/users";
import prisma from "@/prisma/db";
import bcryt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Props) {
    const body = await request.json()
    const validation = userSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!user) {
        return NextResponse.json({ message: "User not existed." }, { status: 404 })
    }

    if (body?.password) {
        const hashedPw = await bcryt.hash(body.password, 3)
        body.password = hashedPw;
    }

    if (user.username !== body.username) {
        const duplicateUsername = await prisma.user.findUnique({
            where: {
                username: body.username
            }
        })
        if (!duplicateUsername) {
            return NextResponse.json({ message: "User already exist" }, { status: 409 })
        }
    }

    const updateUser = await prisma.user.update({
        where: { id: user.id },
        data: { ...body }
    })

    return NextResponse.json(updateUser)
}

