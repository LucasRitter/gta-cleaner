import React from 'react'
import { useMoverStore } from '../../../stores/mover-store'
import { Layout } from '../../../components/layout'
import { Text } from '../../../components/text'
import { ProgressBar } from '../../../components/progress'

interface Props {
    hasPermission: boolean
    count: number
}

export function ProgressState(props: Props) {
    const { hasPermission, count } = props
    const store = useMoverStore()
    const totalNumber = useMoverStore((state) => state.totalFiles)

    return (
        <Layout width={400} gap={10} stack>
            <Text style={'tiny'}>
                {hasPermission
                    ? store.currentFile || 'working on it...'
                    : 'waiting for permissions...'}
            </Text>
            <ProgressBar current={count || 0} totalCount={totalNumber || 1} />
        </Layout>
    )
}
