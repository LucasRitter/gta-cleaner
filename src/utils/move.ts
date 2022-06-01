export async function move(
    destination: FileSystemDirectoryHandle,
    source: FileSystemHandle,
    parent: FileSystemDirectoryHandle,
    onFileTransferStart: (name?: string) => void
) {
    switch (source.kind) {
        case 'file':
            return moveFile(
                destination,
                source as FileSystemFileHandle,
                parent,
                onFileTransferStart
            )
        case 'directory':
            return moveDirectory(
                destination,
                source as FileSystemDirectoryHandle,
                parent,
                onFileTransferStart
            )
        default:
            throw new Error(`Unknown source type: ${source.kind}`)
    }
}

export async function moveAll(
    destination: FileSystemDirectoryHandle,
    sources: FileSystemHandle[],
    parent: FileSystemDirectoryHandle,

    onFileTransferStart: (name?: string) => void
) {
    const promises = sources.map((source) =>
        move(destination, source, parent, onFileTransferStart)
    )
    for (const promise of promises) {
        await promise
    }
    onFileTransferStart(undefined)
}

async function moveFile(
    destination: FileSystemDirectoryHandle,
    source: FileSystemFileHandle,
    parent: FileSystemDirectoryHandle,

    onFileTransferStart: (name?: string) => void
) {
    const next = await destination.getFileHandle(source.name, { create: true })
    const writeable = await next.createWritable({
        keepExistingData: false,
    })

    const chunkSize = 512 * 1024 * 1024
    const file = await source.getFile()

    onFileTransferStart(source.name)

    if (file.size > chunkSize) {
        for (let chunk = 0; chunk < Math.ceil(file.size / chunkSize); chunk++) {
            const slice = await file.slice(
                chunk * chunkSize,
                (chunk + 1) * chunkSize
            )
            const buffer = await slice.arrayBuffer()
            await writeable.seek(chunk * chunkSize)
            await writeable.write(buffer)
        }
    } else {
        const buffer = await file.arrayBuffer()
        await writeable.write(buffer)
    }

    await writeable.close()
    await parent.removeEntry(source.name)
}

async function moveDirectory(
    destination: FileSystemDirectoryHandle,
    source: FileSystemDirectoryHandle,
    parent: FileSystemDirectoryHandle,

    onFileTransferStart: (name?: string) => void
) {
    const next = await destination.getDirectoryHandle(source.name, {
        create: true,
    })

    for await (const [_, entry] of source.entries()) {
        if (entry.kind === 'file') {
            await moveFile(next, entry, source, onFileTransferStart)
        } else {
            await moveDirectory(next, entry, source, onFileTransferStart)
        }
    }

    await parent.removeEntry(source.name)
}
