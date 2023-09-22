import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import { useContext } from 'react'
import { AuthContext } from '../context'

function AppRouter() {
  let { user } = useContext(AuthContext)

  return user ? (
    <>
      <Routes>
        {privateRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={<r.component />} />
        ))}
        <Route path="*" element={<Navigate to={CHAT_ROUTE} replace />} />
      </Routes>
    </>
  ) : (
    <>
      <Routes>
        {publicRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={<r.component />} />
        ))}
        <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
      </Routes>
    </>
  )
}

export default AppRouter
