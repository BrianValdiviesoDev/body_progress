
import { useEffect, useState } from 'react'
import './styles/app.css'
import AddMeasure from './components/addMeasure'
import Charts from './components/charts'
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from '@auth0/auth0-react';
import History from './components/history';
import { MeasureEntity } from './api/entities';
import { listMeasures } from './api/api';
import { ApiHandlerError } from './api/handlerApiError';
import { AxiosError } from 'axios';
import Resume from './components/resume';

function App() {
  const {isLoading, error, isAuthenticated, loginWithRedirect, getAccessTokenSilently} = useAuth0()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [measures, setMeasures] = useState<MeasureEntity[]>([])
  const [editMeasure, setEditMeasure] = useState<MeasureEntity>()
  const [tab, setTab] = useState<string>('resume')
  const [initDate, setInitDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const getMeasures = async () => {
    try{
      const response = await listMeasures(initDate, endDate)
      response.sort((a: MeasureEntity, b: MeasureEntity) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setMeasures(response)
    }catch(err){
      ApiHandlerError(err as AxiosError)
    }
  }

  const onMeasureCreated = (measure: MeasureEntity) => {
    const newMeasures = [...measures, measure]
    newMeasures.sort((a: MeasureEntity, b: MeasureEntity) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setMeasures(newMeasures)
  }

  const onMeasureEdited = (measure: MeasureEntity) => {
    const newMeasures = measures.map((m: MeasureEntity) => {
      if(m._id === measure._id){
        return measure
      }
      return m
    })
    newMeasures.sort((a: MeasureEntity, b: MeasureEntity) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setMeasures(newMeasures)
  }

  const onEditMeasure = (measure: MeasureEntity) => {
    setEditMeasure(measure)
    setShowForm(true)
  }

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      localStorage.setItem('token', accessToken)
    }
    getToken()

    if(isAuthenticated){
      getMeasures()
    }
  },[isAuthenticated])

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setEndDate(today)
    const last7days = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setInitDate(last7days)
  },[])

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Oops... {error.message}</div>}
      {isAuthenticated ? (
        <>
        {showForm && <AddMeasure onMeasureCreated={onMeasureCreated} onMeasureEdited={onMeasureEdited} editMeasure={editMeasure} onClose={()=>setShowForm(false)}/>}
        {!showForm && (tab==='history' || tab==='resume') &&(
          <button className='add-button' onClick={()=>setShowForm(true)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M4 12H20M12 4V20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
          </button>
        )}
        

        <div className='main'>
          <div className="filters">
            <div className="form">
              <input type="date" value={initDate} onChange={(e)=>setInitDate(e.target.value)}/>
              <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
              <button onClick={()=>getMeasures()}>Apply</button>
            </div>
          </div>
          <div className="navigation">
            <div className={tab==='resume' ? 'tab button active': 'tab button'} onClick={()=>setTab('resume')}>Resume</div>
            <div className={tab==='charts' ? 'tab button active': 'tab button'} onClick={()=>setTab('charts')}>Charts</div>
            <div className={tab==='history' ? 'tab button active': 'tab button'} onClick={()=>setTab('history')}>History</div>
          </div>

          {tab==='resume' && (
            <>
              <Resume measures={measures}/>
            </>
          )}
          {tab==='charts' && <Charts measures={measures}/>}
          {tab==='history' && (
            <History measures={measures} onEditMeasure={onEditMeasure}/>
          )}
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
        </>
      ):(
        <>
        <button onClick={()=>loginWithRedirect()}>Log in</button>
        </>
      )}
    </>
  )
}

export default App
