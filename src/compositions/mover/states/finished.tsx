import React from 'react'
import { useMoverStore } from '../../../stores/mover-store'
import { Layout } from '../../../components/layout'
import { Text } from '../../../components/text'
import { dirtyFolder } from '../../../files'
import { Button } from '../../../components/button'

interface Props {
    onDone: () => void
}

export function FinishedState(props: Props) {
    const { onDone } = props
    const name = useMoverStore((state) => state.handle?.name)
    const total = useMoverStore((state) => state.totalFiles)

    return (
        <Layout width={400} gap={20} stack>
            <Layout width={'100%'} horizontalAlignment={'left'}>
                <Text accent style={'title'}>
                    Finished
                </Text>
            </Layout>
            <Layout width={'100%'}>
                <Text style={'body-cramped'}>
                    <span style={{ color: 'var(--foreground)' }}>{name}</span>{' '}
                    was successfully cleaned! <br />
                    {total || 0} files were moved into the {dirtyFolder} folder.{' '}
                    <br />
                    <br />
                    Feel free to come back when you need to clean your folder
                    again, you won't even need internet access next time :)
                </Text>
            </Layout>
            <Layout gap={12} width={'100%'} horizontalAlignment={'right'}>
                <Button onClick={onDone} type={'primary'}>
                    awesome
                </Button>
            </Layout>
        </Layout>
    )
}
