import DeparturesTable from '../containers/DeparturesTable'
import Header from '../containers/Header'

function App() {

  return (
    <>
      <Header/>
      <DeparturesTable connectionId={1}/>
    </>
  )
}

export default App
