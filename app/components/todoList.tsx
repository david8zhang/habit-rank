export interface Props {
  title: string
  children?: React.ReactNode
}

const TodoList = ({ title, children }: Props) => {
  return <div className='overflow-y-auto p-2 max-h-[60vh]'>{children}</div>
}

export default TodoList
