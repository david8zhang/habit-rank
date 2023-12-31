'use client'
import React, { useEffect, useState } from 'react'
import TodoList from './components/todoList'
import { Constants, Ranks, TodoData, TodoDifficulty, TodoStatus } from './utils/constants'
import Todo from './components/todo'
import { NextUIProvider, Spinner } from '@nextui-org/react'
import RankProgress from './components/rankProgress'
import RankIcon from './components/rankIcon'
import CreateTodoModal from './components/createTodoModal'
import RankUpModal from './components/rankUpModal'
import EditTodoModal from './components/editTodoModal'
import { APIHelper } from './utils/apiHelper'
import LostRankModal from './components/lostRankModal'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [createTodoOpen, setCreateTodoOpen] = useState(false)
  const [editTodoOpen, setEditTodoOpen] = useState(false)
  const [rankUpOpen, setRankUpOpen] = useState(false)
  const [rankDownOpen, setRankDownOpen] = useState(false)
  const [progDiff, setProgDiff] = useState({ expDiff: 0, rankDiff: 0 })
  const [todos, setTodos] = useState<TodoData[]>([])
  const [rankProgress, setRankProgress] = useState(0)
  const [currRank, setCurrRank] = useState(Ranks.BRONZE_1)
  const [todoToEdit, setTodoToEdit] = useState<TodoData | null>(null)

  useEffect(() => {
    APIHelper.expireTodos((data: any) => {
      const { progression } = data
      setCurrRank(progression.new.rank)
      setRankProgress(progression.new.expTotal)
      setTodos(data.todos)

      // Show alert modal if the user lost rank
      const progDiff = {
        expDiff: progression.old.expTotal - progression.new.expTotal,
        rankDiff: progression.old.rank - progression.new.rank,
      }
      if (progDiff.expDiff != 0 || progDiff.rankDiff != 0) {
        setRankDownOpen(true)
        setProgDiff(progDiff)
      }
      setLoading(false)
    })
  }, [])

  const createTodo = async (todoTitle: string, todoDifficulty: TodoDifficulty) => {
    const newTodo: TodoData = {
      id: window.crypto.randomUUID(),
      title: todoTitle,
      difficulty: todoDifficulty,
      status: TodoStatus.INCOMPLETE,
    }
    APIHelper.createOrUpdateTodo(newTodo)
    setTodos([newTodo, ...todos])
  }

  const completeTodo = (isComplete: boolean, todo: TodoData) => {
    const expReward = Constants.DIFFICULTY_TO_EXP[todo.difficulty]
    let newRankProgress = isComplete ? rankProgress + expReward : rankProgress - expReward
    let newRank = currRank
    if (newRankProgress >= 100) {
      setRankUpOpen(true)
      newRank++
      setCurrRank(newRank)
      newRankProgress = 100 % newRankProgress
    } else if (newRankProgress < 0) {
      if (currRank == Ranks.BRONZE_1) {
        newRankProgress = 0
      } else {
        newRank--
        setCurrRank(Math.max(0, newRank))
        newRankProgress = 100 + newRankProgress
      }
    }
    setRankProgress(newRankProgress)
    const completePayload: any = {
      id: todo.id,
      status: isComplete ? TodoStatus.COMPLETE : TodoStatus.INCOMPLETE,
      newRank,
      newRankProgress,
    }
    APIHelper.completeTodo(completePayload)
  }

  const editTodo = (newTodoTitle: string, newTodoDifficulty: string) => {
    const editedTodo = {
      id: todoToEdit!.id,
      title: newTodoTitle,
      difficulty: newTodoDifficulty as TodoDifficulty,
      status: todoToEdit!.status,
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
    APIHelper.createOrUpdateTodo(editedTodo)
    setTodoToEdit(null)
    setTodos(newTodos)
  }

  const deleteTodo = () => {
    setTodos(todos.filter((t) => t.id !== todoToEdit!.id))
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo?id=${todoToEdit!.id}`, {
      method: 'DELETE',
    })
  }

  if (loading) {
    return (
      <NextUIProvider>
        <div className='flex justify-center items-center flex-col p-10 h-[100vh]'>
          <Spinner size='lg' />
          <p className='text-4xl text-center mt-10'>Loading</p>
        </div>
      </NextUIProvider>
    )
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
              todo={todo}
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
        <LostRankModal
          isOpen={rankDownOpen}
          onOpenChange={(e: boolean) => {
            setRankDownOpen(e)
          }}
          progDiff={progDiff}
        />
        <RankProgress progress={rankProgress} />
      </div>
    </NextUIProvider>
  )
}
