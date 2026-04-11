import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export default function App() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function getTodos() {
      setIsLoading(true)
      setErrorMessage('')

      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        setErrorMessage(error.message)
        setTodos([])
        setIsLoading(false)
        return
      }

      setTodos(data ?? [])
      setIsLoading(false)
    }

    getTodos()
  }, [])

  const getTodoLabel = (todo) =>
    todo.name ?? todo.title ?? todo.task ?? todo.description ?? 'Untitled to-do'

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>To-Do List</h1>

      {isLoading && <p>Loading tasks from Supabase...</p>}

      {errorMessage && (
        <p style={{ color: '#b00020' }}>Could not load tasks: {errorMessage}</p>
      )}

      {!isLoading && !errorMessage && todos.length === 0 && (
        <p>No to-dos found in your Supabase table.</p>
      )}

      {!isLoading && !errorMessage && todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id ?? getTodoLabel(todo)}>{getTodoLabel(todo)}</li>
          ))}
        </ul>
      )}
    </main>
  )
}