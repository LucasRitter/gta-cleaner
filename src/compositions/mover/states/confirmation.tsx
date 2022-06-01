import React from 'react'
import { useMoverStore } from '../../../stores/mover-store'
import { Layout } from '../../../components/layout'
import { Text } from '../../../components/text'
import { dirtyFolder } from '../../../files'
import { Button } from '../../../components/button'

interface Props {
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmationState(props: Props) {
    const { onConfirm, onCancel } = props
    const name = useMoverStore((state) => state.handle?.name)
    const fileCount = useMoverStore((state) => state.totalFiles)

    return (
        <Layout width={400} gap={20} stack>
            <Layout width={'100%'} horizontalAlignment={'left'}>
                <Text accent style={'title'}>
                    Notice
                </Text>
            </Layout>
            <Layout width={'100%'}>
                <Text style={'body-cramped'}>
                    <span style={{ color: 'var(--foreground)' }}>{name}</span>{' '}
                    will be cleaned, which will move {fileCount} files into a
                    new folder called "{dirtyFolder}". Is that ok?
                </Text>
            </Layout>
            <Layout gap={12} width={'100%'} horizontalAlignment={'right'}>
                <Button onClick={onCancel} type={'secondary'}>
                    no
                </Button>
                <Button onClick={onConfirm} type={'primary'}>
                    clean it
                </Button>
            </Layout>
        </Layout>
    )
}
