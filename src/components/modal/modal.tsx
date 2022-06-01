import React from 'react'
import classes from './modal.module.scss'

interface Props {
    isOpen: boolean
    children: React.ReactNode
    style?: React.CSSProperties
}

export function Modal(props: Props) {
    return (
        <div
            className={classes.overlay}
            style={{
                ...(props.style ? props.style : {}),
                display: props.isOpen ? 'flex' : 'none',
                opacity: props.isOpen ? 1 : 0,
            }}
        >
            <div className={classes.card}>{props.children}</div>
        </div>
    )
}
