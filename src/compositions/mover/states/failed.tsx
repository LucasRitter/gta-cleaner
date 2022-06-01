import React from 'react'
import { useMoverStore } from '../../../stores/mover-store'
import { Layout } from '../../../components/layout'
import { Text } from '../../../components/text'
import { dirtyFolder } from '../../../files'
import { Button } from '../../../components/button'

export type FailureReason = 'permissions-not-granted' | 'requires-admin'

interface Props {
    onOk: () => void
    error: FailureReason
}

export function FailedState(props: Props) {
    const { onOk, error } = props
    const name = useMoverStore((state) => state.handle?.name)

    return (
        <Layout width={400} gap={20} stack>
            <Layout width={'100%'} horizontalAlignment={'left'}>
                <Text accent style={'title'}>
                    Failed
                </Text>
            </Layout>
            <Layout width={'100%'}>
                {error === 'permissions-not-granted' && (
                    <Text style={'body-cramped'}>
                        Please make sure to grant permissions to modify the
                        files in the game folder.
                    </Text>
                )}
                {error === 'requires-admin' && (
                    <Text style={'body-cramped'}>
                        It looks like your game is in a location where the
                        browser has no access to. <br />
                        <br />
                        The game must be installed at a location that requires
                        no admin permissions to write to. <br />
                        I'm afraid you will have to clean your folder yourself
                        :(
                    </Text>
                )}
            </Layout>
            <Layout gap={12} width={'100%'} horizontalAlignment={'right'}>
                <Button onClick={onOk} type={'secondary'}>
                    ok :(
                </Button>
            </Layout>
        </Layout>
    )
}
