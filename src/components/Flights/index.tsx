import { useState, useEffect } from 'react'
import {
  List,
  Divider,
} from '@mui/material';
import { Flight } from '../Flight';
import { FlightType } from '../../api/Flights';

const Flights = () => {
  const [flights, setFlights] = useState<FlightType[] | null>(null)
  useEffect(() => {
    const requestFlights = async () => {
      const response = await fetch('https://rome2rio.github.io/fe-code-data/flights.json')
      const data = await response.json()
      console.log(data)
      setFlights(data)
    }
    requestFlights()
    return () => {
      console.log('finishing')
    }
  }, [])
  
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {flights && flights.map((flight, index) => (
        <>
          <Flight flight={flight} />
          {index < (flights.length - 1) && <Divider />}
        </>
      ))}
    </List>
  )
}

export { Flights }