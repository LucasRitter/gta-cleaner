import React from 'react'
import { FolderOpen } from 'phosphor-react'
import { Button } from '../button'

interface Props {
    onChange?: (handle?: FileSystemHandle) => void
}

export function Picker(props: Props) {
    const { onChange } = props

    const handleOpenClick = async () => {
        const handle = await window.showDirectoryPicker({
            multiple: false,
            writable: true,
        })
        onChange?.(handle)
    }

    return (
        <Button onClick={handleOpenClick}>
            <FolderOpen weight={'bold'} size={16} />
            open game folder
        </Button>
    )
}
