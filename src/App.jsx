import { Link } from 'react-router-dom';

export default function App () {
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h1>Dashboard Predios</h1>
      <Link to='login_manager'>Logar como Manager</Link>
    </div>
  )
}