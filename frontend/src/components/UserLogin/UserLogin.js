import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import React from "react"

export default function (props) {
  return (
    <>
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Email address or Username</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email or username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Don't have an account <a href="#"><CustomTab to="/signup">sign up!</CustomTab></a>
          </p>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#"><CustomTab to="/signup">password?</CustomTab></a>
          </p>
        </div>
      </form>
    </div>
    <style jsx>{`
        .Auth-form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 90vw;
          height: 80vh;
        }
        
        .Auth-form {
          width: 420px;
          box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
          padding-top: 30px;
          padding-bottom: 20px;
          border-radius: 8px;
          background-color: white;
        }
        
        .Auth-form-content {
          padding-left: 12%;
          padding-right: 12%;
        }
        
        .Auth-form-title {
          text-align: center;
          margin-bottom: 1em;
          font-size: 24px;
          color: rgb(34, 34, 34);
          font-weight: 800;
        }
        
        label {
          font-size: 14px;
          font-weight: 600;
          color: rgb(34, 34, 34);
        }
      `}</style>
    </>
  );
}

function CustomTab({to, children, ...props}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({path: resolvedPath.pathname, end: true})
  return (
      <li className={isActive ? "active" : ""}>
          <Link to={to} {...props}>{children}</Link>
      </li>
  )
}