export type FlightType = {
  durationInMinutes: number
  isBookable: Boolean | string
  isSchedulable: Boolean | string
  priceRange: {
    currencyCode: string
    high: number
    low: number
  }
  segments: Segment[]
  title: string
}

type Segment = {
  duration: number
  transitMode: string
}