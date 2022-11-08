import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Table from './component/Table'

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Table />
                {/* <Routes>
                    <Route path="/" element={<TableCreated />} />
                </Routes> */}
            </div>
        </BrowserRouter>
    )
}

export default App;