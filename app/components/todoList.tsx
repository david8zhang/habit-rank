export interface Props {
  children?: React.ReactNode
}

const TodoList = ({ children }: Props) => {
  return <div className='mx-20'>{children}</div>
}

export default TodoList
