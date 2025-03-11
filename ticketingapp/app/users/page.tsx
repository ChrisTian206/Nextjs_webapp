import UserForm from '@/components/UserForm'
import prisma from '@/prisma/db'
import React from 'react'
import DataTableSimple from './data-table-simple'

const User = async () => {
  const users = await prisma.user.findMany()

  return (
    <div>
      <UserForm />
      <DataTableSimple users={users} />
    </div>
  )
}

export default User