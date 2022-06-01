import React from 'react'

type HorizontalAlignment = 'left' | 'center' | 'right'
type VerticalAlignment = 'top' | 'center' | 'bottom'

interface Props {
    children?: React.ReactNode
    gap?: number
    stack?: boolean
    horizontalAlignment?: HorizontalAlignment
    verticalAlignment?: VerticalAlignment

    width?: number | string
    height?: number | string
}

const horizontalAlignment: Record<HorizontalAlignment, string> = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
}

const verticalAlignment: Record<VerticalAlignment, string> = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
}

function toFlex(
    stack: boolean,
    horizontalAlignment: HorizontalAlignment,
    verticalAlignment: VerticalAlignment
): Partial<React.CSSProperties> {
    if (stack) {
        return {
            display: 'flex',
            flexDirection: 'column',
            alignItems: horizontalAlignment,
            justifyContent: verticalAlignment,
        }
    }

    return {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: horizontalAlignment,
        alignItems: verticalAlignment,
    }
}

export function Layout(props: Props) {
    return (
        <div
            style={{
                ...toFlex(
                    props.stack || false,
                    props.horizontalAlignment || 'center',
                    props.verticalAlignment || 'center'
                ),
                flexWrap: 'wrap',
                gap: props.gap || 0,
                width: props.width,
                height: props.height,
            }}
        >
            {props.children}
        </div>
    )
}
