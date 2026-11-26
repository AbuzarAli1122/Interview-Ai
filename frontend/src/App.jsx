import { RouterProvider } from "react-router"
import { router } from './app.routes.jsx'
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getProfile } from "./features/auth/services/auth.api.js"

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProfile())
  },[dispatch])
  return (
   <RouterProvider router={router}></RouterProvider>
  )
}

export default App
 