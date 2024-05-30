'use client'
//whenever it need users to interact with something in this page/component
//we need to have 'use client'. Pages or Comps are rendered on the server by default.

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'



const ToggleMode = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    })

    if (!mounted) {
        <Button variant='outline' size='icon' disabled={true} >
        </Button>
    }

    const dark = theme === 'dark'

    return (
        <Button variant='outline' size='icon' onClick={() => setTheme(`${dark ? 'light' : 'dark'}`)} >
            {dark ? (<Sun className='hover:cursor-pointer hover:text-primary' />) : (<Moon className='hover:cursor-pointer hover:text-primary' />)}
        </Button>
    )
}

export default ToggleMode