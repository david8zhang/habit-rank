import { TodoData, TodoDifficulty, TodoStatus } from './constants'

export class APIHelper {
  public static getTodos(onSuccess: Function) {
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
        const todos = data.todos.sort((a: any, b: any) => {
          return a.id > b.id ? 1 : -1
        })
        onSuccess(todos)
      })
  }

  public static getProgression(onSuccess: Function) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/prog`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        onSuccess(data)
      })
  }

  public static createOrUpdateTodo(newTodo: TodoData) {
    const formBody = APIHelper.encodeObjectToURI(newTodo)
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
  }

  public static completeTodo(completePayload: {
    id: string
    status: TodoStatus
    newRank: number
    newRankProgress: number
  }) {
    const completedTodoBody = APIHelper.encodeObjectToURI(completePayload)
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: completedTodoBody,
    })

    const completeTodoProgressionPayload = APIHelper.encodeObjectToURI({
      newRank: completePayload.newRank,
      expTotal: completePayload.newRankProgress,
    })
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/prog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: completeTodoProgressionPayload,
    })
  }

  public static encodeObjectToURI(object: any) {
    return Object.keys(object)
      .map((key: string) => {
        const encodedKey = encodeURIComponent(key)
        const encodedValue = encodeURIComponent(object[key])
        return `${encodedKey}=${encodedValue}`
      })
      .join('&')
  }
}
