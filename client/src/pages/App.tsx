import DeparturesTable from '../containers/DeparturesTable'
import Button from '../components/Button'
import '../styles/main.scss'
import MenuLink from '../components/MenuLink'

function App() {

  return (
    <>
    
      <Button label='clickme'/>
      <MenuLink label='clickme' href='/'></MenuLink>
      <DeparturesTable connectionId={1}/>
    </>
  )
}

export default App
