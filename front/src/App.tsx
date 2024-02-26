
import { useState } from 'react'
import './app.css'
import Form from './form'

function App() {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('general')
  return (
    <>
      {showForm && <Form onClose={()=>setShowForm(false)}/>}
      {!showForm && (
        <button className='add-button' onClick={()=>setShowForm(true)}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M4 12H20M12 4V20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
        </button>
      )}
      

      <div className='main'>
        <div className="filters">
          <div className="form">
            <input type="date" />
            <input type="date" />
            <button>Apply</button>
          </div>
        </div>
        <div className="navigation">
          <div className={activeTab==='general' ? 'tab active': 'tab'} onClick={()=>setActiveTab('general')}>General</div>
          <div className={activeTab==='perimeters' ? 'tab active': 'tab'} onClick={()=>setActiveTab('perimeters')}>Perimeters</div>
          <div className={activeTab==='folds' ? 'tab active': 'tab'} onClick={()=>setActiveTab('folds')}>Folds</div>
        </div>
        {activeTab==='general' && (
          <div className="chart-grid" id="general">
            <h2>General</h2>
            <div className="chart">

            </div>
          </div>
        )}

        {activeTab==='perimeters' && (
          <div className="chart-grid" id="perimeters">
            <h2>Perimeters</h2>
            <div className="chart">
              
            </div>
          </div>
        )}

        {activeTab==='folds' && (
          <div className="chart-grid" id="folds">
            <h2>Folds</h2>
            <div className="chart">
              
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
