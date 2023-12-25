'use client'
import React, { useState } from 'react'
import TodoList from './components/todoList'
import { Constants, Ranks, TodoData, TodoDifficulty } from './constants'
import Todo from './components/todo'
import { NextUIProvider } from '@nextui-org/react'
import RankProgress from './components/rankProgress'
import RankIcon from './components/rankIcon'
import CreateTodoModal from './components/createTodoModal'
import RankUpModal from './components/rankUpModal'
import EditTodoModal from './components/editTodoModal'

export default function Home() {
  const [createTodoOpen, setCreateTodoOpen] = useState(false)
  const [editTodoOpen, setEditTodoOpen] = useState(false)
  const [rankUpOpen, setRankUpOpen] = useState(false)
  const [todos, setTodos] = useState<TodoData[]>([])
  const [rankProgress, setRankProgress] = useState(0)
  const [currRank, setCurrRank] = useState(Ranks.BRONZE_1)
  const [todoToEdit, setTodoToEdit] = useState<TodoData | null>(null)

  const createTodo = (todoTitle: string, todoDifficulty: TodoDifficulty) => {
    setTodos([
      { id: window.crypto.randomUUID(), title: todoTitle, difficulty: todoDifficulty },
      ...todos,
    ])
  }

  const completeTodo = (isComplete: boolean, todoDifficulty: TodoDifficulty) => {
    const expReward = Constants.DIFFICULTY_TO_EXP[todoDifficulty]
    let newRankProgress = isComplete ? rankProgress + expReward : rankProgress - expReward
    if (newRankProgress >= 100) {
      setRankUpOpen(true)
      setCurrRank(currRank + 1)
      newRankProgress = 100 % newRankProgress
    } else if (newRankProgress < 0) {
      setCurrRank(Math.max(0, currRank - 1))
      newRankProgress = 100 + newRankProgress
    }
    setRankProgress(newRankProgress)
  }

  const editTodo = (newTodoTitle: string, newTodoDifficulty: string) => {
    const newTodos = todos.map((todo) => {
      if (todoToEdit && todo.id === todoToEdit.id) {
        return { ...todo, title: newTodoTitle, difficulty: newTodoDifficulty as TodoDifficulty }
      }
      return todo
    })
    setTodoToEdit(null)
    setTodos(newTodos)
  }

  const deleteTodo = () => {
    setTodos(todos.filter((t) => t.id !== todoToEdit!.id))
  }

  return (
    <NextUIProvider>
      <RankIcon rank={currRank} />
      <div style={{ marginLeft: '25%', marginRight: '25%' }}>
        <h1 className='text-center text-4xl p-8 pt-0'>{`Daily To-Do's`}</h1>
        <TodoList title='Incomplete'>
          {todos.map((todo, index) => (
            <Todo
              onTodoCompleted={(isComplete: boolean) => completeTodo(isComplete, todo.difficulty)}
              onTodoEdit={() => {
                setTodoToEdit(todo)
                setEditTodoOpen(true)
              }}
              title={todo.title}
              difficulty={todo.difficulty}
              key={todo.id}
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
        <EditTodoModal
          isOpen={editTodoOpen}
          onOpenChange={(e: boolean) => {
            setEditTodoOpen(e)
          }}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
          prevTodoTitle={todoToEdit ? todoToEdit.title : ''}
          prevTodoDifficulty={todoToEdit ? todoToEdit.difficulty : ''}
        />

        <RankProgress progress={rankProgress} />
      </div>
    </NextUIProvider>
  )
}
