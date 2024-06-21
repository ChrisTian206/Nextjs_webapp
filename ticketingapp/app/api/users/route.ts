import { userSchema } from "@/ValidationSchemas/users";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = userSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const isUserAlreadyExist = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    })

    if (isUserAlreadyExist) {
        return NextResponse.json({ message: "User already existed." }, { status: 409 })
    }

    const hashPw = await bcrypt.hash(body.password, 3)
    body.password = hashPw

    const newUser = await prisma.user.create({
        data: { ...body }
    })

    return NextResponse.json(newUser, { status: 201 })
}