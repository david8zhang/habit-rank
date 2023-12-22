'use client'
import React, { useState } from 'react'
import TodoList from './components/todoList'
import { Ranks, Constants, TodoData, TodoDifficulty } from './constants'
import Todo from './components/todo'
import { NextUIProvider } from '@nextui-org/react'
import RankProgress from './components/rankProgress'
import RankIcon from './components/rankIcon'
import CreateTodoModal from './components/createTodoModal'
import RankUpModal from './components/rankUpModal'

export default function Home() {
  const [createTodoOpen, setCreateTodoOpen] = useState(false)
  const [rankUpOpen, setRankUpOpen] = useState(false)

  const [todos, setTodos] = useState<TodoData[]>(Constants.SAMPLE_TODO_DATA)
  const [rankProgress, setRankProgress] = useState(0)
  const [currRank, setCurrRank] = useState(Ranks.BRONZE_1)

  const createTodo = (todoTitle: string, todoDifficulty: TodoDifficulty) => {
    setTodos([
      { id: window.crypto.randomUUID(), title: todoTitle, difficulty: todoDifficulty },
      ...todos,
    ])
  }

  return (
    <NextUIProvider>
      <RankIcon rank={currRank} />
      <div style={{ marginLeft: '25%', marginRight: '25%' }}>
        <h1 className='text-center text-4xl p-8 pt-0'>{`Daily To-Do's`}</h1>
        <TodoList title='Incomplete'>
          {todos.map(({ title, difficulty, id }, index) => (
            <Todo
              onTodoChanged={(isComplete: boolean) => {
                const completedTodo = todos.find((todo) => todo.id == id)
                let newRankProgress = isComplete ? rankProgress + 20 : rankProgress - 20
                if (newRankProgress >= 100) {
                  setRankUpOpen(true)
                  setCurrRank(currRank + 1)
                  newRankProgress = 100 % newRankProgress
                } else if (newRankProgress < 0) {
                  setCurrRank(Math.max(0, currRank - 1))
                  newRankProgress = 100 + newRankProgress
                }
                setRankProgress(newRankProgress)
              }}
              title={title}
              difficulty={difficulty}
              key={id}
            />
          ))}
        </TodoList>
        <div className='flex align-middle justify-center'>
          <button
            onClick={() => setCreateTodoOpen(true)}
            className='p-5 text-2xl hover:bg-slate-900 rounded-md w-[100%]'
          >
            + Add New
          </button>
        </div>
        <CreateTodoModal
          isOpen={createTodoOpen}
          onOpenChange={(e: boolean) => {
            setCreateTodoOpen(e)
          }}
          createTodo={createTodo}
        />

        <RankUpModal
          isOpen={rankUpOpen}
          onOpenChange={(e: boolean) => {
            setRankUpOpen(e)
          }}
        />

        <RankProgress progress={rankProgress} />
      </div>
    </NextUIProvider>
  )
}
