import React from 'react'
import classes from './progress-bar.module.scss'
import { Text } from '../text'

interface Props {
    totalCount: number
    current: number
}

export function ProgressBar({ totalCount, current }: Props) {
    const percent = Math.min((current / totalCount) * 100, 100).toFixed(0)

    console.log('rendering progress bar', current, totalCount, percent)

    const percentage = (
        <div className={classes.percentageContainer}>
            <Text style={'tiny'}>{percent}%</Text>
        </div>
    )

    const total = (
        <div className={classes.totalContainer}>
            <Text style={'tiny'}>{totalCount}</Text>
        </div>
    )

    return (
        <div className={classes.container}>
            <div
                className={classes.progress}
                style={{
                    width: `${percent}%`,
                }}
            >
                {percentage}
            </div>

            {percentage}
            {total}
        </div>
    )
}
