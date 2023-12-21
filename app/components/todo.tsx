'use client'

import React from 'react'
import { TodoDifficulty } from '../constants'

export interface Props {
  title: string
  difficulty: TodoDifficulty
}

const Todo = ({ title, difficulty }: Props) => {
  return (
    <div className='rounded-md outline mb-5 p-5'>
      <p>{title}</p>
      <div className='flex flex-col'>
        <p>{difficulty}</p>
      </div>
    </div>
  )
}

export default Todo
