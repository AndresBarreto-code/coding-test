import { useState, useEffect, Fragment } from 'react'
import {
  List,
  Divider,
} from '@mui/material';
import { Flight } from '../Flight';
import { FlightType } from '../../api/Flights';

const Flights = () => {
  const [flights, setFlights] = useState<FlightType[] | null>(null)
  const [cheapest, setCheapest] = useState<number | null>(null)

  useEffect(() => {
    const requestFlights = async () => {
      const response = await fetch('https://rome2rio.github.io/fe-code-data/flights.json')
      const data: FlightType[] = await response.json()
      let minPrice: number | null = null;
      const dataSorted = data
        .sort((a: FlightType, b: FlightType) => {
          minPrice = minPrice && minPrice < a.priceRange.low ? minPrice : a.priceRange.low
          minPrice = minPrice && minPrice < b.priceRange.low ? minPrice : b.priceRange.low
          return (a.priceRange.low - b.priceRange.low)
        })
        .sort((a: FlightType, b: FlightType) => (
          a.durationInMinutes - b.durationInMinutes
        ))
      setCheapest(minPrice)
      setFlights(dataSorted)
    }
    requestFlights()
    return () => {
      console.log('finishing')
    }
  }, [])
  
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {flights && flights.map((flight, index) => (
        <Fragment key={index}>
          {index !== 0 && <Divider />}
          <Flight flight={flight} isFastest={index === 0} isCheapest={cheapest === flight.priceRange.low} />
        </Fragment>
      ))}
    </List>
  )
}

export { Flights }