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
import { useState } from 'react'
import { TodoDifficulty } from '../constants'

export interface Props {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  createTodo: Function
}

const CreateTodoModal = ({ isOpen, onOpenChange, createTodo }: Props) => {
  const [todoTitle, setTodoTitle] = useState('')
  const [todoDifficulty, setTodoDifficulty] = useState('')

  return (
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
                  createTodo(todoTitle, todoDifficulty)
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
  )
}
export default CreateTodoModal
