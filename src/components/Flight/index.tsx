import {
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { FlightType } from '../../api/Flights'

const Flight = ({
  flight
} 
: {
  flight: FlightType,
}) => {
  console.log(flight)
  return (
    <ListItem alignItems="flex-start">
        <ListItemText
          primary={flight.title || 'No Title'}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Duration: 
              </Typography>
              &nbsp;{flight.durationInMinutes} minutes
            </>
          }
        />
      </ListItem>
  )
}

export { Flight }