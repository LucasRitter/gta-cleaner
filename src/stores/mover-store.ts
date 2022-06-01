import create from 'zustand'

interface MoverStore {
    handle?: FileSystemDirectoryHandle
    currentFile?: string
    totalFiles?: number
    currentFileNumber?: number

    setHandle: (
        handle: FileSystemDirectoryHandle,
        totalFiles: number
    ) => Promise<boolean>
    incrementFile: (name?: string) => void
    reset: () => void
}

export const useMoverStore = create<MoverStore>((set, get) => ({
    handle: undefined,
    currentFile: undefined,
    totalFiles: 0,
    currentFileNumber: 0,

    setHandle: async (
        handle: FileSystemDirectoryHandle,
        totalFiles: number
    ) => {
        // Todo: Check if it's a GTA directory
        set((state) => ({
            handle,
            totalFiles,
            currentFile: undefined,
            currentFileNumber: 0,
        }))
        return true
    },

    incrementFile: (name?: string) => {
        console.log('incrementing counter')
        const current = get().currentFileNumber
        set((state) => ({
            currentFileIndex: (current || 0) + 1,
            currentFile: name,
        }))
    },

    reset: () =>
        set((state) => ({
            handle: undefined,
            currentFile: undefined,
            totalFiles: 0,
            currentFileNumber: 0,
        })),
}))
