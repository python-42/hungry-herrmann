import './App.css'
import CacheInfo from './components/CacheInfo'
import LocationDisplay from './components/LocationDisplay'
import StatusBar from './components/StatusBar'

function App() {
  return (
    <>
      <CacheInfo />
      <StatusBar />
      <div className="locationContainer">
        <LocationDisplay id={"64b9990ec625af0685fb939d"} key={1}/>
        <div className="vertRule" />
        <LocationDisplay id={"64a6b628351d5305dde2bc08"} key={2}/>
      </div>
    </>
  )
}

export default App
