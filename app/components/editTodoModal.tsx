import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Select,
  SelectItem,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react'
import { TodoDifficulty } from '../constants'
import { useEffect, useState } from 'react'

export interface Props {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  prevTodoTitle: string
  prevTodoDifficulty: TodoDifficulty | string
  onEditTodo: (todoTitle: string, todoDifficulty: string) => void
  onDeleteTodo: () => void
}

const EditTodoModal = ({
  isOpen,
  onOpenChange,
  prevTodoTitle,
  prevTodoDifficulty,
  onEditTodo,
  onDeleteTodo,
}: Props) => {
  const [todoTitle, setTodoTitle] = useState(prevTodoTitle)
  const [todoDifficulty, setTodoDifficulty] = useState(prevTodoDifficulty as string)

  useEffect(() => {
    setTodoTitle(prevTodoTitle)
    setTodoDifficulty(prevTodoDifficulty)
  }, [prevTodoTitle, prevTodoDifficulty])

  if (!todoTitle || !todoDifficulty) {
    return <div></div>
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit To-Do</ModalHeader>
            <ModalBody>
              <Input
                className='mb-5'
                labelPlacement='outside'
                label='Title'
                placeholder='Enter the name of your to-do'
                value={todoTitle}
                defaultValue={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />
              <Select
                labelPlacement='outside'
                placeholder='Choose difficulty'
                label='Difficulty'
                value={todoDifficulty}
                defaultSelectedKeys={[todoDifficulty]}
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
                  onEditTodo(todoTitle, todoDifficulty)
                  onClose()
                }}
              >
                Confirm
              </Button>
              <Button
                color='danger'
                onPress={() => {
                  onClose()
                  onDeleteTodo()
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditTodoModal
