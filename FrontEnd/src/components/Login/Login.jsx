import React from "react";
import { Link, Redirect } from "react-router-dom";

import Form from "components/Form";
import logoImg from "assets/logo-white.png";
function Login({ user, setUser }) {
  if (user.email) return <Redirect to="/dashboard" />;

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-200">
      <div
        className="m-4 w-full sm:w-2/3 rounded-md shadow-lg	flex justify-center items-center flex-col bg-white p-8 sm:p-12"
        style={{ maxWidth: 450 }}
      >
        <Link to="/">
          <img className="h-16 mb-4" src={logoImg} alt="SmartSummary" />
        </Link>
        <Form formType="login" formButton="Sign In" setUser={setUser} />
        <p className="text-sm block text-gray-600 mt-2 text-left">
          Don't have an Account?{" "}
          <Link className="text-blue-600" to="/register">
            Create Now!
          </Link>
        </p>
        <div className="w-full flex justify-start mt-2">
          <p className="text-sm text-gray-600 text-left">
            Forgot Password?{" "}
            <Link className="text-sm text-blue-600" to="/forgot-password">
              Forgot Password!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
