import React from 'react'
import classes from './dropper.module.scss'

interface Props {
    onDropped?: (handle?: FileSystemDirectoryHandle) => void
}

export function Dropper(props: Props) {
    const { onDropped } = props

    const [visible, setVisible] = React.useState(false)
    const [timeoutHandle, setTimeoutHandle] = React.useState<
        number | undefined
    >(undefined)
    const [message, setMessage] = React.useState<string | undefined>(undefined)

    const handleDropCapture = () => {
        setVisible(true)
    }

    const hideIn = (ms: number) => {
        if (ms === 0) {
            setVisible(false)
            return
        }

        setTimeoutHandle(
            // @ts-ignore
            setTimeout(() => {
                setVisible(false)
            }, ms)
        )
    }

    const cancelHide = () => {
        if (timeoutHandle) {
            clearTimeout(timeoutHandle)
            setTimeoutHandle(undefined)
        }
    }

    const handleDrop = async (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!e.dataTransfer) {
            return
        }

        const { items } = e.dataTransfer
        if (!items.length) {
            // Todo: show warning to user
            hideIn(5000)
            return
        }

        const handle = await items[0].getAsFileSystemHandle()
        if (!handle) {
            // Todo: show warning to user
            hideIn(5000)
            return
        }

        if (handle.kind !== 'directory') {
            // Todo: show warning to user
            hideIn(5000)
            return
        }

        onDropped?.(handle as FileSystemDirectoryHandle)
        hideIn(0)
    }

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
    }

    React.useEffect(() => {
        document.addEventListener('dragenter', handleDropCapture)
        document.addEventListener('drop', handleDrop)
        document.addEventListener('dragover', handleDragOver)

        return () => {
            document.removeEventListener('dragenter', handleDropCapture)
            document.removeEventListener('drop', handleDrop)
            document.removeEventListener('dragover', handleDragOver)
        }
    }, [])

    return (
        <div
            className={classes.overlay}
            style={{
                opacity: visible ? 1 : 0,
            }}
        >
            <div>Drop to clean 🧼</div>
        </div>
    )
}
