import { useCallback } from 'react'
import {
  Tooltip ,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import { FlightType } from '../../api/Flights'
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

const Flight = ({
  flight,
  isFastest,
  isCheapest,
} 
: {
  flight: FlightType,
  isFastest: Boolean,
  isCheapest: Boolean,
}) => {
  const formatPrice = useCallback((value: number) => {
    const formatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: flight.priceRange.currencyCode,
    });
    return formatter.format(value)
  }, [flight.priceRange])

  const handleClick = () => {
    alert('Book')
  }

  return (
    <ListItem alignItems="flex-start"
    secondaryAction={
      <>
        {isFastest && (<Tooltip title={'Fastest'}>
          <FlashOnIcon color="primary"/>
        </Tooltip>)}
        {isCheapest && (<Tooltip title={'Cheapest'}>
          <LoyaltyIcon color="secondary"/>
        </Tooltip>)}
      </>
    }>
      <Button
      role="button"
      onClick={handleClick}
      color="primary"
      variant="contained"
      size="small"
      style={{
        maxWidth: '16px',
        marginRight: '8px',
        marginTop: 'auto',
        marginBottom: 'auto',
      }}
      disabled={typeof flight.isBookable === 'string' ? flight.isBookable === 'false': !flight.isBookable}>
       Book now
      </Button>
      <ListItemText
        primary={flight.title || 'No Title'}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline-block' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Duration: {flight.durationInMinutes} minutes
            </Typography>
            <br />
            <Typography
              sx={{ display: 'inline-block' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              <>
                Price: {formatPrice(flight.priceRange.low)} to {formatPrice(flight.priceRange.high)}
              </>
            </Typography>
          </>
        }
      />
    </ListItem>
  )
}

export { Flight }