import React from 'react'
import { Picker } from './components/picker'
import { Dropper } from './components/picker/dropper'
import { Mover } from './compositions/mover'
import { useMoverStore } from './stores/mover-store'
import { Layout } from './components/layout'
import { Text } from './components/text'
import classes from './App.module.scss'

export function App() {
    const [handle, setHandle] = React.useState<
        FileSystemDirectoryHandle | undefined
    >(undefined)

    const resetMoverStore = useMoverStore((store) => store.reset)

    const handlePicker = async (handle?: FileSystemHandle) => {
        if (!handle) {
            return
        }

        if (handle.kind !== 'directory') {
            alert('Please select a directory')
            return
        }

        setHandle(handle as FileSystemDirectoryHandle)
    }

    if (!window.showDirectoryPicker) {
        return (
            <Layout stack width={'100vw'} height={'100vh'} gap={24}>
                <Text accent style={'heading'}>
                    Oh no!
                </Text>
                <Layout width={'min(300px, 100%)'}>
                    <Text style={'body'} align={'center'}>
                        It looks like you're using a browser that doesn't
                        support the{' '}
                        <a href={'https://wicg.github.io/file-system-access/'}>
                            File System Access API
                        </a>
                        .
                        <br />
                        <br />
                        Please use a more recent Chromium-based browser like
                        Chrome or Edge in order to use this tool.
                        <br />
                        <br />
                        <Text style={'tiny'} color={'var(--foreground-dim)'}>
                            Note: Brave isn't supported.
                        </Text>
                    </Text>
                </Layout>
            </Layout>
        )
    }

    return (
        <>
            <Layout width={'100%'} height={'100vh'}>
                <Mover
                    handle={handle}
                    onFinish={() => {
                        resetMoverStore()
                        setHandle(undefined)
                    }}
                />
                <Layout stack>
                    <Text>drag and drop</Text>
                    <br />
                    <Text color={'var(--foreground-dim)'}>or</Text>
                    <br />
                    <Picker onChange={handlePicker} />
                </Layout>
                <Dropper onDropped={handlePicker} />
            </Layout>
            <div style={{ marginBottom: '15vh' }}>
                <Layout gap={96} stack>
                    <Layout
                        width={'min(280px, 100%)'}
                        gap={32}
                        horizontalAlignment={'left'}
                    >
                        <Text style={'heading'} color={'var(--foreground-dim)'}>
                            How does it work?
                        </Text>
                        <Text>
                            Many Chromium-based browsers now have support for
                            the{' '}
                            <a
                                href={
                                    'https://wicg.github.io/file-system-access/'
                                }
                            >
                                File System Access API
                            </a>
                            , which allows websites to access local files from
                            the browser.
                            <br />
                            <br />
                            This website just asks for access to your game
                            directory and will then proceed to move any files
                            and folders that are not part of the base game to
                            another folder called _dirty.
                        </Text>
                    </Layout>
                    <Layout
                        width={'min(280px, 100%)'}
                        gap={32}
                        horizontalAlignment={'left'}
                    >
                        <Text style={'heading'} color={'var(--foreground-dim)'}>
                            Why was this made?
                        </Text>
                        <Text>
                            Experimentation, basically.
                            <br />
                            <br />
                            And out of frustration that no similar tool existed
                            outside of sketchy executables you’d run on your
                            local machine with admin privileges.
                        </Text>
                    </Layout>
                    <Layout
                        width={'min(280px, 100%)'}
                        gap={32}
                        horizontalAlignment={'left'}
                    >
                        <Text style={'heading'} color={'var(--foreground-dim)'}>
                            It doesn't work :(
                        </Text>
                        <Text>
                            Yeah, it only really works for folders that aren’t
                            protected / require admin privileges to manipulate.
                            Sorry.
                        </Text>
                    </Layout>
                    <Layout
                        width={'min(280px, 100%)'}
                        gap={32}
                        horizontalAlignment={'left'}
                    >
                        <Text style={'heading'} color={'var(--foreground-dim)'}>
                            Is this safe?
                        </Text>
                        <Text>
                            Yes.
                            <br />
                            <br />
                            The entire source code for this website is available
                            on my{' '}
                            <a
                                href={
                                    'https://github.com/lucasritter/gta-cleaner'
                                }
                            >
                                GitHub page
                            </a>
                            , so you can check what the website does yourself,
                            or ask a bud who knows{' '}
                            <a href={'https://typescriptlang.org/'}>
                                TypeScript
                            </a>{' '}
                            and{' '}
                            <a href={'https://https://reactjs.org/'}>React</a>{' '}
                            to see what it does.
                            <br />
                            <br />
                            Source maps are shipped as well, so you can ensure
                            that it’s the same code base.
                        </Text>
                    </Layout>
                </Layout>
            </div>
        </>
    )
}
