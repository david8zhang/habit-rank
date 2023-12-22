'use client'

import React from 'react'
import { TodoDifficulty } from '../constants'
import { Checkbox } from '@nextui-org/react'

export interface Props {
  title: string
  difficulty: TodoDifficulty
  onTodoChanged: Function
}

const Todo = ({ title, difficulty, onTodoChanged }: Props) => {
  const [isComplete, setIsComplete] = React.useState(false)
  return (
    <div
      className={`rounded-md outline mb-5 p-5 flex flex-row ${
        isComplete ? 'bg-slate-900 outline-neutral-400' : ''
      }`}
    >
      <Checkbox
        size='lg'
        className='mr-2'
        defaultSelected={isComplete}
        onValueChange={(e) => {
          setIsComplete(e)
          onTodoChanged(e)
        }}
      />
      <div>
        <p className={`text-2xl font-semibold ${isComplete ? 'line-through text-slate-500' : ''}`}>
          {title}
        </p>
        <div className='flex flex-col'>
          <p className={`text-slate-300 ${isComplete ? 'line-through text-slate-500' : ''}`}>
            {difficulty}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Todo
