// src/pages/Error404.tsx

import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout_Customer";

function Error404() {
  useEffect(() => {
    document.title = "Error 404";
  }, []);

  return (
    <Layout>
      <main>
        <div className="h-screen flex flex-col justify-center bg-yellow-100">
          <div className="m-14">
            <h1 className="text-5xl mb-4 font-bold">ERROR 404</h1>
            <p className="text-xl mb-4">Page not found!</p>
            <NavLink className="btn btn-error w-24 text-white" to="/">
              Go Back
            </NavLink>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Error404;
