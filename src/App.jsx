import { BrowserRouter, Routes, Route } from "react-router"
import { UserNavbar } from "./Components/Frontend/UserNavbar"
import { Registration } from "./Components/Global/registration"
import { Login } from "./Components/Global/Login"
import { ThemeProvider } from "./Components/Global/Theme"
import { ErrorPage } from "./Components/Global/ErrorPage"
import { Footer } from "./Components/Global/Footer"
import { UserDashboard } from "./Components/Frontend/UserDashBoard"
import { AdminNavbar } from "./Components/Backend/AdminNavbar"
import { AdminDashboard } from "./Components/Backend/AdminDashBoard"
import { ProfileComponent } from "./Components/Frontend/UserProfile"
import { ProductComponent } from "./Components/Frontend/Products"
import { AdminUserManagement } from "./Components/Backend/AdminUser"
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
            <Route>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/footer" element={<Footer />} />
            </Route>

            {/* Protected User Routes */}
            {user && <Route element={<UserNavbar />}>
              <Route path="/userDashboard" element={<UserDashboard />} />
              <Route path="/userProfile" element={<ProfileComponent />} />
              <Route path="/inventory" element={<ProductComponent />} />
            </Route>
            }

            {/* Admin Routes */}
            {admin ?
              <Route element={<AdminNavbar />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/adminUserManage" element={<AdminUserManagement />} />
              </Route>
              : (
                <>
                  <Route path="/admin" element={<ErrorPage type='access-denied' />} />
                  <Route path="/adminUserManage" element={<AdminUserManagement type='access-denied' />} />
                </>
              )
            }

            {/* Error page - 404  */}
            <Route path="*" element={<ErrorPage type="404" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
