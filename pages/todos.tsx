import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Todos.module.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface ApiResponse {
  success: boolean
  data: Todo[] | Todo
  count?: number
  message?: string
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // URL da API - em produção, será a URL do backend no EasyPanel
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  // Fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/todos`)
      const result: ApiResponse = await response.json()
      
      if (result.success && Array.isArray(result.data)) {
        setTodos(result.data)
        setError('')
      } else {
        setError('Erro ao carregar todos')
      }
    } catch (err) {
      setError('Erro de conexão com a API')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Add todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const response = await fetch(`${API_BASE_URL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo.trim() }),
      })

      const result: ApiResponse = await response.json()
      
      if (result.success && !Array.isArray(result.data)) {
        setTodos(prev => [...prev, result.data as Todo])
        setNewTodo('')
        setError('')
      } else {
        setError(result.message || 'Erro ao adicionar todo')
      }
    } catch (err) {
      setError('Erro de conexão com a API')
      console.error('Add error:', err)
    }
  }

  // Toggle todo
  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      })

      const result: ApiResponse = await response.json()
      
      if (result.success) {
        setTodos(prev => 
          prev.map(todo => 
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        )
        setError('')
      } else {
        setError(result.message || 'Erro ao atualizar todo')
      }
    } catch (err) {
      setError('Erro de conexão com a API')
      console.error('Toggle error:', err)
    }
  }

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'DELETE',
      })

      const result: ApiResponse = await response.json()
      
      if (result.success) {
        setTodos(prev => prev.filter(todo => todo.id !== id))
        setError('')
      } else {
        setError(result.message || 'Erro ao deletar todo')
      }
    } catch (err) {
      setError('Erro de conexão com a API')
      console.error('Delete error:', err)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App - Frontend + Backend</title>
        <meta name="description" content="Todo app demonstrando comunicação Frontend + Backend no EasyPanel" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Todo App</h1>
        <p className={styles.subtitle}>
          Frontend (Next.js) + Backend (Node.js) no EasyPanel
        </p>

        <div className={styles.apiInfo}>
          <p><strong>API URL:</strong> {API_BASE_URL}</p>
          <a href={`${API_BASE_URL}/api/health`} target="_blank" rel="noopener noreferrer">
            🔍 Testar Health Check da API
          </a>
        </div>

        {error && (
          <div className={styles.error}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={addTodo} className={styles.form}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Adicionar novo todo..."
            className={styles.input}
            disabled={loading}
          />
          <button type="submit" className={styles.button} disabled={loading || !newTodo.trim()}>
            Adicionar
          </button>
        </form>

        {loading ? (
          <div className={styles.loading}>Carregando todos...</div>
        ) : (
          <div className={styles.todoList}>
            {todos.length === 0 ? (
              <p className={styles.empty}>Nenhum todo encontrado</p>
            ) : (
              todos.map(todo => (
                <div key={todo.id} className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id, todo.completed)}
                    className={styles.checkbox}
                  />
                  <span className={styles.todoText}>{todo.text}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className={styles.deleteButton}
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        <div className={styles.stats}>
          <p>Total: {todos.length} | Completos: {todos.filter(t => t.completed).length}</p>
        </div>
      </main>
    </div>
  )
}
