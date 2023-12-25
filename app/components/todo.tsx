'use client'

import React from 'react'
import { TodoDifficulty } from '../constants'
import { Button, Checkbox } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

export interface Props {
  title: string
  difficulty: TodoDifficulty
  onTodoCompleted: (value: boolean) => void
  onTodoEdit: () => void
}

const Todo = ({ title, difficulty, onTodoCompleted, onTodoEdit }: Props) => {
  const [isComplete, setIsComplete] = React.useState(false)
  return (
    <div
      className={`rounded-md outline mb-5 p-5 flex flex-row items-center ${
        isComplete ? 'bg-slate-900 outline-neutral-400' : ''
      }`}
    >
      <Checkbox
        aria-hidden='true'
        size='lg'
        className='mr-2'
        defaultSelected={isComplete}
        onValueChange={(e) => {
          setIsComplete(e)
          onTodoCompleted(e)
        }}
      />
      <div className='flex-1'>
        <p className={`text-2xl font-semibold ${isComplete ? 'line-through text-slate-500' : ''}`}>
          {title}
        </p>
        <div className='flex flex-col'>
          <p className={`text-slate-300 ${isComplete ? 'line-through text-slate-500' : ''}`}>
            {difficulty}
          </p>
        </div>
      </div>
      <div
        aria-label='Edit'
        className='align-self-center cursor-pointer p-1 box-border'
        onClick={() => {
          onTodoEdit()
        }}
      >
        <FontAwesomeIcon icon={faEllipsisV} fontSize='20px' />
      </div>
    </div>
  )
}

export default Todo
