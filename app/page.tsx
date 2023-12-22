'use client'
import React, { useState } from 'react'
import TodoList from './components/todoList'
import { Constants, TodoData, TodoDifficulty } from './constants'
import Todo from './components/todo'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  NextUIProvider,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react'
import RankProgress from './components/rankProgress'

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [todoTitle, setTodoTitle] = useState('')
  const [todoDifficulty, setTodoDifficulty] = useState('')
  const [todos, setTodos] = useState<TodoData[]>(Constants.SAMPLE_TODO_DATA)
  const [rankProgress, setRankProgress] = useState(0)

  const createTodo = () => {
    setTodos(
      todos.concat({
        id: window.crypto.randomUUID(),
        title: todoTitle,
        difficulty: todoDifficulty as TodoDifficulty,
      })
    )
    setTodoTitle('')
    setTodoDifficulty('')
  }

  return (
    <NextUIProvider>
      <div style={{ marginLeft: '25%', marginRight: '25%' }}>
        <h1 className='text-center text-4xl p-10'>{`Daily To-Do's`}</h1>
        <TodoList title='Incomplete'>
          {todos.map(({ title, difficulty, id }, index) => (
            <Todo
              onTodoChanged={(isComplete: boolean) => {
                const completedTodo = todos.find((todo) => todo.id == id)
                setRankProgress(isComplete ? rankProgress + 20 : rankProgress - 20)
              }}
              title={title}
              difficulty={difficulty}
              key={id}
            />
          ))}
        </TodoList>
        <div className='flex align-middle justify-center'>
          <button onClick={() => onOpen()} className='p-5 text-2xl'>
            + Add New
          </button>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Create New To-Do</ModalHeader>
                <ModalBody>
                  <Input
                    className='mb-5'
                    labelPlacement='outside'
                    label='Title'
                    placeholder='Enter the name of your to-do'
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                  />
                  <Select
                    labelPlacement='outside'
                    placeholder='Choose difficulty'
                    label='Difficulty'
                    value={todoDifficulty}
                    onChange={(e) => {
                      setTodoDifficulty(e.target.value)
                    }}
                  >
                    {Object.values(TodoDifficulty).map((value) => {
                      return <SelectItem key={value}>{value}</SelectItem>
                    })}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onPress={() => {
                      createTodo()
                      onClose()
                    }}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <RankProgress progress={rankProgress} />
      </div>
    </NextUIProvider>
  )
}
