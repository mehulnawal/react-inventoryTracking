import { BrowserRouter, Routes, Route } from "react-router"
import { UserNavbar } from "./Components/Frontend/UserNavbar"
import { Registration } from "./Components/Global/Registration"
import { Login } from "./Components/Global/Login"
import { ThemeProvider } from "./Components/Global/Theme"
import { ErrorPage } from "./Components/Global/ErrorPage"
import { Footer } from "./Components/Global/Footer"
import { UserDashboard } from "./Components/Frontend/UserDashBoard"
import { AdminDashboard } from "./Components/Backend/AdminDashBoard"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Firebase } from "./Components/Global/Firebase"
import { useEffect, useState } from "react"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth(Firebase);
    const check = onAuthStateChanged(auth, (res) => {
      if (res) setUser(res);
      else setUser(null)
    })

    return () => check();
  }, [])

  const admin = user?.email == "mehulnawal2904@gmail.com" || user?.email == "admin123@gmail.com"

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/footer" element={<Footer />} />

            {/* Protected User Routes */}
            <Route element={<UserNavbar />}>
              {user ? (
                <>
                  {/* //  user Routes */}
                  <Route path="/userDashboard" element={<UserDashboard />} />

                  {/* // Admin Routes */}
                  {admin
                    ? <Route path="/admin" element={<AdminDashboard />} />
                    : <Route path="/admin" element={<ErrorPage type='access-denied' />} />
                  }
                </>)
                : <Route path="/" element={<Login />} />
              }
            </Route>

            {/* Error page - 404  */}
            {/* <Route path="*" element={<ErrorPage type="404" />} /> */}

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
