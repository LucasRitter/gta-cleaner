import React from 'react'
import classes from './text.module.scss'

type TextStyle = 'tiny' | 'body' | 'body-cramped' | 'title' | 'heading'

interface Props {
    children: React.ReactNode
    style?: TextStyle
    accent?: boolean
    noWrap?: boolean
    color?: string
    align?: 'left' | 'center' | 'right'
}

export function Text({ children, style, accent, noWrap, color, align }: Props) {
    const cssProperties: React.CSSProperties = {
        color: color ? color : accent ? 'var(--accent)' : 'inherit',
        overflowWrap: noWrap ? 'normal' : 'break-word',
        textAlign: align,
    }

    switch (style) {
        case 'tiny':
            return (
                <span className={classes} style={cssProperties}>
                    {children}
                </span>
            )

        case 'body-cramped':
            return (
                <p className={classes.bodyCramped} style={cssProperties}>
                    {children}
                </p>
            )

        case 'title':
            return (
                <h1 className={classes.title} style={cssProperties}>
                    {children}
                </h1>
            )

        case 'heading':
            return (
                <h2 className={classes.heading} style={cssProperties}>
                    {children}
                </h2>
            )

        default:
            return (
                <p className={classes.body} style={cssProperties}>
                    {children}
                </p>
            )
    }
}
