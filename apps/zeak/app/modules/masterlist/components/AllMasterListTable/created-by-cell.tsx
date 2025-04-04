import React from 'react'
import { useEffect } from 'react'
import { useFetcher } from '@remix-run/react'
import { TextCell } from '@zeak/datatable'

export default function CreatedByCell({ createdBy }: { createdBy: string }) {
    const fetcher = useFetcher<{ user: any }>()

    useEffect(() => {
        fetcher.load(`/api/user/${createdBy}`)
    }, [createdBy])

    const user = fetcher.data?.user?.[0]

    return (
        <TextCell text={user?.firstName + ' ' + user?.lastName} />
    )
}
