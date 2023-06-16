import { BrowserRouter as Router, Route, Routes, useLocation  } from "react-router-dom";


import { AnimatePresence } from 'framer-motion'
import Error404 from "containter/errors/Error404";
import Home from "containter/pages/Home";
import Blog from "containter/pages/blog/Blog";
import Dashboard from "containter/pages/Dashboard";
import ResetPassword from "containter/auth/ResetPassword";
import ResetPasswordConfirm from "containter/auth/ResetPasswordConfirm";
import EditPost from "containter/pages/blog/EditPost";


function AnimatedRoutes() {

    const location = useLocation()
    if (!location) {
        return null;
      }

    return (
        //<AnimatePresence>
            <Routes location={location} key={location.pathname}>
                {/* Error Display*/}
                <Route path="*" element={<Error404 />} />

                {/* Home Display*/}
                <Route path="/" element={<Home />} />
                <Route path="/forgot_password" element={<ResetPassword />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<EditPost />} />
            </Routes>
        //</AnimatePresence>
    )
}
export default AnimatedRoutes;