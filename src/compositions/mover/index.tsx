import React from 'react'
import { motion } from 'framer-motion'
import { useMoverStore } from '../../stores/mover-store'
import { findUnknownFiles } from '../../utils/findUnknown'
import { moveAll } from '../../utils/move'
import { dirtyFolder } from '../../files'
import { Modal } from '../../components/modal'
import { AnimatePresence } from 'framer-motion'
import { ConfirmationState } from './states/confirmation'
import { ProgressState } from './states/progress'
import { FinishedState } from './states/finished'
import { FailedState, FailureReason } from './states/failed'

interface Props {
    handle?: FileSystemDirectoryHandle
    onFinish?: (success?: boolean) => void
}

enum MoverState {
    Confirmation,
    Permissions,
    Moving,
    Finished,
    Failed,
}

export function Mover(props: Props) {
    const { handle, onFinish } = props

    const store = useMoverStore()

    const [count, setCount] = React.useState(0)

    const [step, setStep] = React.useState(MoverState.Confirmation)
    const [error, setError] = React.useState<FailureReason | undefined>(
        undefined
    )
    const [visible, setVisible] = React.useState(false)
    const [entries, setEntries] = React.useState<FileSystemHandle[]>([])

    React.useEffect(() => {
        if (handle) {
            const checkAndSetHandle = async () => {
                const entries = await findUnknownFiles(handle)
                await store.setHandle(handle, entries.count)
                await setEntries(entries.toBeMoved)
            }
            checkAndSetHandle()
        }
        if (!handle) {
            setVisible(false)
            store.reset()
        }
    }, [handle])

    const startMove = async () => {
        if (!handle) {
            setStep(MoverState.Failed)
            return
        }

        setStep(MoverState.Permissions)

        const target = await handle.getDirectoryHandle(dirtyFolder, {
            create: true,
        })

        if (!target) {
            setStep(MoverState.Failed)
            setError('permissions-not-granted')
            return
        }

        setStep(MoverState.Moving)

        try {
            await moveAll(target, entries, handle, (name) => {
                setCount((count) => count + 1)
                store.incrementFile(name)
            })
        } catch (e) {
            setStep(MoverState.Failed)
            setError('requires-admin')
            return
        }

        setStep(MoverState.Finished)
    }

    return (
        <Modal
            isOpen={Boolean(handle)}
            style={{ color: 'var(--foreground-dim)' }}
        >
            <AnimatePresence>
                {step === MoverState.Confirmation && (
                    <motion.div
                        key={'confirmation'}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                    >
                        <ConfirmationState
                            onConfirm={startMove}
                            onCancel={() => setStep(MoverState.Failed)}
                        />
                    </motion.div>
                )}
                {(step === MoverState.Permissions ||
                    step === MoverState.Moving) && (
                    <motion.div
                        key={'progress'}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                    >
                        <ProgressState
                            hasPermission={step === MoverState.Moving}
                            count={count}
                        />
                    </motion.div>
                )}
                {step === MoverState.Finished && (
                    <motion.div
                        key={'finished'}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                    >
                        <FinishedState
                            onDone={() => {
                                onFinish?.(true)
                                setStep(MoverState.Confirmation)
                                setEntries([])
                                setError(undefined)
                            }}
                        />
                    </motion.div>
                )}
                {step === MoverState.Failed && (
                    <motion.div
                        key={'failed'}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                    >
                        <FailedState
                            error={error || 'permissions-not-granted'}
                            onOk={() => {
                                onFinish?.(false)
                                setStep(MoverState.Confirmation)
                                setEntries([])
                                setError(undefined)
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    )
}
