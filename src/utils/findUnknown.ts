import { dirtyFolder, knownFiles } from '../files'
import { countFiles } from './count'

export async function findUnknownFiles(
    handle: FileSystemDirectoryHandle
): Promise<{
    toBeMoved: FileSystemHandle[]
    count: number
}> {
    const unknownFiles: FileSystemFileHandle[] = []
    const unknownDirectories: FileSystemDirectoryHandle[] = []

    for await (const [name, newHandle] of handle.entries()) {
        if (name.toLowerCase() === dirtyFolder) {
            continue
        }

        if (name.toLowerCase().match(/mods/i)) {
            continue
        }

        if (!knownFiles.includes(name.toLowerCase())) {
            if (newHandle.kind === 'directory') {
                unknownDirectories.push(newHandle)
            } else {
                unknownFiles.push(newHandle)
            }
        }
    }

    let totalCount = 0
    for (const directory of unknownDirectories) {
        const count = await countFiles(directory)
        totalCount += count
    }

    for (const file of unknownFiles) {
        totalCount += 1
    }

    return {
        toBeMoved: [...unknownFiles, ...unknownDirectories],
        count: totalCount,
    }
}
