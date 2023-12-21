import React from 'react'
import TodoList from './components/todoList'
import { TodoDifficulty } from './constants'
import Todo from './components/todo'

export default function Home() {
  const sampleTodoData = [
    {
      title: 'Todo 1',
      difficulty: TodoDifficulty.EASY,
    },
    {
      title: 'Todo 2',
      difficulty: TodoDifficulty.MEDIUM,
    },
  ]
  return (
    <div>
      <h1 className='text-center text-3xl p-10'>{`Daily To-Do's`}</h1>
      <TodoList>
        {sampleTodoData.map(({ title, difficulty }, index) => (
          <Todo title={title} difficulty={difficulty} key={`${title}-${index}`} />
        ))}
      </TodoList>
    </div>
  )
}
