export async function countFiles(handle: FileSystemDirectoryHandle) {
    let count = 0

    for await (const [name, newHandle] of handle.entries()) {
        if (newHandle.kind === 'directory') {
            count += await countFiles(newHandle)
        } else {
            count++
        }
    }

    return count
}
