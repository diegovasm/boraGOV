import React, { useEffect, useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { Alert } from "react-bootstrap"

export default function Login({ apiUrl }) {
  const [authMode, setAuthMode] = useState("signin")
  const navigate = Navigate()
  const [usersData, setUsersData] = useState([])
  const [authForm, setAuthForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

    useEffect(() => {

      try {
        const fetchUsersLogin = async () => {
          const response = await axios.get(apiUrl)
          setUsersData(response.data)
          }

        fetchUsersLogin()
      } catch (error) {
        console.log(error)
      }
    }, [apiUrl])

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const handleOnChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value })
  }
  const handleOnSubmitSignIn = async (e) => {
    e.preventDefault()
    try{
      const userBase = usersData.filter((user) => {

        return (user.email === authForm.email && user.password === authForm.password)

      })

      if(userBase.length !== 0){

        navigate("/questoes")
      }else{
        Alert("Email e Password incorretos.")
      }

    } catch (error){
      console.log(error)
    }

  }

  const handleOnSubmitSignUp = async (e) => {
    e.preventDefault()
    try {
      if(authForm.fullName === ""){
        Alert("Favor preencher o nome do usuário")
      }else if(authForm.email === ""){
        Alert("Favor preencher o e-mail do usuário")

      }else if(authForm.password.length < 6){
        Alert("O password deve conter pelo menos 6 dígitos")
      }else{

        await axios.post(`${apiUrl}`, authForm)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                name="email"
                value={authForm.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name="password"
                value={authForm.password}
                onChange={handleOnChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onSubmit={handleOnSubmitSignIn}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                name="fullName"
                value={authForm.fullName}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                name="email"
                value={authForm.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                name="password"
                value={authForm.fullName}
                onChange={handleOnChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onSubmit={handleOnSubmitSignUp}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
