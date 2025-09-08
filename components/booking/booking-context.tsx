"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

interface BookingState {
  destination: string
  checkIn: string
  checkOut: string
  guests: number
  selectedRoom: any | null
  bookingDetails: any | null
}

interface BookingAction {
  type: "SET_SEARCH" | "SET_ROOM" | "SET_BOOKING" | "CLEAR_BOOKING"
  payload?: any
}

const initialState: BookingState = {
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  selectedRoom: null,
  bookingDetails: null,
}

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, ...action.payload }
    case "SET_ROOM":
      return { ...state, selectedRoom: action.payload }
    case "SET_BOOKING":
      return { ...state, bookingDetails: action.payload }
    case "CLEAR_BOOKING":
      return initialState
    default:
      return state
  }
}

const BookingContext = createContext<{
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
} | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  return <BookingContext.Provider value={{ state, dispatch }}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
