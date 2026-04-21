'use client'

import { useState, useMemo, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Info } from 'lucide-react'
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
  getDay,
} from 'date-fns'
import { cn } from '@/lib/utils'
import {
  BUSINESS_HOURS,
  TIME_SLOTS,
  SATURDAY_TIME_SLOTS,
} from '@/lib/data'
import type { BookedSlot } from '@/lib/types'

interface DateTimeStepProps {
  selectedDate: Date | null
  selectedTime: string | null
  onSelect: (date: Date | null, time: string | null) => void
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export function DateTimeStep({ selectedDate, selectedTime, onSelect }: DateTimeStepProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(true)

  useEffect(() => {
    const loadBookedSlots = async () => {
      try {
        setLoadingSlots(true)
        const response = await fetch('/api/booked-slots', { cache: 'no-store' })
        const data = await response.json()
        setBookedSlots(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Failed to load booked slots:', error)
        setBookedSlots([])
      } finally {
        setLoadingSlots(false)
      }
    }

    loadBookedSlots()
  }, [])

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  const firstDayOfMonth = getDay(startOfMonth(currentMonth))

  const isDateDisabled = (date: Date): boolean => {
    if (isBefore(startOfDay(date), startOfDay(new Date()))) return true
    const dayName = DAY_NAMES[getDay(date)]
    const hours = BUSINESS_HOURS[dayName]
    return hours?.closed ?? false
  }

  const getTimeSlotsForDate = (date: Date): string[] => {
    const dayOfWeek = getDay(date)
    const baseSlots = dayOfWeek === 6 ? SATURDAY_TIME_SLOTS : TIME_SLOTS
    const selectedDateString = format(date, 'yyyy-MM-dd')

    return baseSlots.filter(
      (time) =>
        !bookedSlots.some(
          (slot) => slot.date === selectedDateString && slot.time === time
        )
    )
  }

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return
    onSelect(date, null)
  }

  const handleTimeSelect = (time: string) => {
    onSelect(selectedDate, time)
  }

  const timeSlots = selectedDate ? getTimeSlotsForDate(selectedDate) : []

  return (
    <div>
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#b08b57]">
          Appointment Time
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">
          Pick a Date & Time
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6b5f55]">
          Choose your preferred appointment slot
        </p>
      </div>

      <div className="rounded-[24px] border border-[#d8c2a6]/40 bg-white/80 p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={() => setCurrentMonth((prev) => addMonths(prev, -1))}
            disabled={isSameMonth(currentMonth, new Date())}
            className="rounded-full border border-[#eadfce] bg-[#faf7f3] p-2 hover:bg-white disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4 text-[#111111]" />
          </button>

          <h3 className="text-base font-semibold tracking-tight text-[#111111]">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>

          <button
            onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
            className="rounded-full border border-[#eadfce] bg-[#faf7f3] p-2 hover:bg-white"
          >
            <ChevronRight className="h-4 w-4 text-[#111111]" />
          </button>
        </div>

        <div className="mb-3 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="py-1 text-center text-[11px] font-medium uppercase tracking-wide text-[#8a7f75]"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {days.map((day) => {
            const disabled = isDateDisabled(day)
            const selected = selectedDate && isSameDay(day, selectedDate)
            const today = isToday(day)

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDateSelect(day)}
                disabled={disabled}
                className={cn(
                  'aspect-square rounded-lg text-sm font-medium transition-all',
                  disabled && 'cursor-not-allowed text-[#c7bfb6]',
                  selected && 'bg-[#111111] text-white',
                  today && !selected && 'ring-1 ring-[#b08b57]',
                  !disabled && !selected && 'text-[#111111] hover:bg-[#faf7f3]'
                )}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-6">
          <h4 className="mb-3 text-sm font-medium text-[#111111]">
            Available times for {format(selectedDate, 'EEEE, MMMM d')}
          </h4>

          {loadingSlots ? (
            <p className="text-sm text-[#8a7f75]">Loading available slots...</p>
          ) : timeSlots.length === 0 ? (
            <p className="text-sm text-[#8a7f75]">
              No available slots for this day.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={cn(
                    'rounded-full border px-3 py-2 text-sm font-medium transition-all',
                    selectedTime === time
                      ? 'border-[#111111] bg-[#111111] text-white'
                      : 'border-[#eadfce] bg-white text-[#6b5f55] hover:border-[#d8c2a6] hover:bg-[#faf7f3]'
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-[20px] border border-[#d8c2a6]/40 bg-[#fcf8f3] p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#b08b57]" />
        <p className="text-xs leading-relaxed text-[#6b5f55] sm:text-sm">
          Appointments are secured once the deposit is received.
        </p>
      </div>
    </div>
  )
}
