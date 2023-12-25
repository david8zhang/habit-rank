'use client'
import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const todos = data.todos
          .map((t: any) => {
            return {
              id: t.Id,
              title: t.Title,
              difficulty: t.Difficulty,
              lastUpdated: t.LastUpdated,
            }
          })
          .sort((a: any, b: any) => {
            return a.id > b.id ? 1 : -1
          })
        setTodos(todos)
      })
  }, [])

  const createTodo = async (todoTitle: string, todoDifficulty: TodoDifficulty) => {
    const newTodo: TodoData = {
      id: window.crypto.randomUUID(),
      title: todoTitle,
      difficulty: todoDifficulty,
    }
    const formBody = Object.keys(newTodo)
      .map((key: string) => {
        const encodedKey = encodeURIComponent(key)
        const encodedValue = encodeURIComponent((newTodo as any)[key])
        return `${encodedKey}=${encodedValue}`
      })
      .join('&')

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
    setTodos([newTodo, ...todos])
  }

  const completeTodo = (isComplete: boolean, todo: TodoData) => {
    const expReward = Constants.DIFFICULTY_TO_EXP[todo.difficulty]
    let newRankProgress = isComplete ? rankProgress + expReward : rankProgress - expReward
    if (newRankProgress >= 100) {
      setRankUpOpen(true)
      setCurrRank(currRank + 1)
      newRankProgress = 100 % newRankProgress
    } else if (newRankProgress < 0) {
      if (currRank == Ranks.BRONZE_1) {
        newRankProgress = 0
      } else {
        setCurrRank(Math.max(0, currRank - 1))
        newRankProgress = 100 + newRankProgress
      }
    }
    setRankProgress(newRankProgress)
    const completePayload: any = {
      id: todo.id,
      lastUpdated: isComplete ? Date.now() : Date.now() - Constants.MILLIS_IN_DAY * 2,
    }
    const formBody = Object.keys(completePayload)
      .map((key: string) => {
        const encodedKey = encodeURIComponent(key)
        const encodedValue = encodeURIComponent(completePayload[key])
        return `${encodedKey}=${encodedValue}`
      })
      .join('&')

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
  }

  const editTodo = (newTodoTitle: string, newTodoDifficulty: string) => {
    const editedTodo = {
      id: todoToEdit!.id,
      title: newTodoTitle,
      difficulty: newTodoDifficulty as TodoDifficulty,
    }
    const newTodos = todos.map((todo) => {
      if (todoToEdit && todo.id === todoToEdit.id) {
        return {
          ...todo,
          ...editedTodo,
        }
      }
      return todo
    })
    const formBody = Object.keys(editedTodo)
      .map((key: string) => {
        const encodedKey = encodeURIComponent(key)
        const encodedValue = encodeURIComponent((editedTodo as any)[key])
        return `${encodedKey}=${encodedValue}`
      })
      .join('&')

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
    setTodoToEdit(null)
    setTodos(newTodos)
  }

  const deleteTodo = () => {
    setTodos(todos.filter((t) => t.id !== todoToEdit!.id))
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo?id=${todoToEdit!.id}`, {
      method: 'DELETE',
    })
  }

  return (
    <NextUIProvider>
      <RankIcon rank={currRank} />
      <div style={{ marginLeft: '25%', marginRight: '25%' }}>
        <h1 className='text-center text-4xl p-8 pt-0'>{`Daily To-Do's`}</h1>
        <TodoList title='Incomplete'>
          {todos.map((todo, index) => (
            <Todo
              onTodoCompleted={(isComplete: boolean) => completeTodo(isComplete, todo)}
              onTodoEdit={() => {
                setTodoToEdit(todo)
                setEditTodoOpen(true)
              }}
              lastUpdated={todo.lastUpdated ? todo.lastUpdated : -1}
              title={todo.title}
              difficulty={todo.difficulty}
              key={todo.id}
            />
          ))}
        </TodoList>
        <div className='flex align-middle justify-center'>
          <button
            aria-label='add-new'
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
