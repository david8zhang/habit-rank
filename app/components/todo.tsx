'use client'

import React from 'react'
import { Constants, TodoData } from '../utils/constants'
import { Checkbox } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

export interface Props {
  todo: TodoData
  onTodoCompleted: (value: boolean) => void
  onTodoEdit: () => void
}

const Todo = ({ todo, onTodoCompleted, onTodoEdit }: Props) => {
  const isTodoComplete = Constants.hasCompleteTodoToday(todo)
  const [isComplete, setIsComplete] = React.useState(isTodoComplete)
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
          {todo.title}
        </p>
        <div className='flex flex-col'>
          <p className={`text-slate-300 ${isComplete ? 'line-through text-slate-500' : ''}`}>
            {todo.difficulty}
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
