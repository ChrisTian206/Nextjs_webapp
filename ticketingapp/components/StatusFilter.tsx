import React from 'react'

const status: { label: string, value?: string }[] = [
    { label: "Open / Started" },
    { label: "Open", value: "OPEN" },
    { label: "Started", value: "STARTED" },
    { label: "Closed", value: "CLOSED" },
]

const StatusFilter = () => {
    return (
        <div>StatusFilter</div>
    )
}

export default StatusFilter