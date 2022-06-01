import React from 'react'
import styles from './button.module.scss'

interface Props {
    onClick: () => void
    children: React.ReactNode
    type?: 'primary' | 'secondary'
}

export function Button(props: Props) {
    const { onClick, children } = props

    switch (props.type) {
        case 'secondary': {
            return (
                <button
                    className={[styles.button, styles.secondary].join(' ')}
                    onClick={onClick}
                >
                    {children}
                </button>
            )
        }
    }

    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    )
}
