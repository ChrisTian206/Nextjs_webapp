"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const MainNavLinks = () => {

    const links = [
        { label: "Dashboard", href: '/' },
        { label: "Tickets", href: '/tickets' },
        { label: "Users", href: "/users" },
    ]

    const currPath = usePathname()
    //console.log(currPath)
    return (
        <div className='flex item-center gap-2'>
            {links.map((link) => {
                return (
                    <Link href={link.href}
                        className={`navbar-link ${currPath == link.href &&
                            "cursor-default text-primary/70 hover:text-primary/45 "}`}
                        key={link.label}>
                        {link.label}
                    </Link>
                )
            })
            }
        </div>
    )
}

export default MainNavLinks