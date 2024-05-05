import { Link } from 'react-router-dom';

export default function DashboardManager () {
  return(
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h1>Manager Dashboard</h1>
      <Link to='/create-building'>Criar um prédio</Link>
      <Link to='/'>Sair</Link>
    </div>
  )
}