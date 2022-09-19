import { useState, useEffect, Fragment } from 'react'
import {
  List,
  Divider,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Flight } from '../Flight';
import { FlightType } from '../../api/Flights';
import ErrorIcon from '@mui/icons-material/Error';

const Flights = () => {
  const [loading, setLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Boolean>(false)
  const [flights, setFlights] = useState<FlightType[] | null>(null)
  const [cheapest, setCheapest] = useState<number | null>(null)

  useEffect(() => {
    const requestFlights = async () => {
      setLoading(true)
      try {
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
      } catch(e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    requestFlights()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ErrorIcon color="error" fontSize='large'/>
        <Typography
            fontSize='large'
            component="span"
            variant="body2"
            color="error"
          >
          Sorry, something went worng
        </Typography>
      </Box>
    );
  }
  
  return (
    <List sx={{ width: '80%', maxWidth: '500px', bgcolor: 'background.paper' }}>
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