import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div className="container">
        <h1>Registro e inicio de sesion</h1>
        <nav>
          <ul>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <hr />
        {/**PARA AGREGAR EL COMPONENTE */}
        <Outlet/>
        <footer>
            <p>Copyright-2023</p>
        </footer>
      </div>
    </>
  );
};