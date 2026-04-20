'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Info } from 'lucide-react'
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfDay, getDay } from 'date-fns'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BUSINESS_HOURS, TIME_SLOTS, SATURDAY_TIME_SLOTS } from '@/lib/data'

interface DateTimeStepProps {
  selectedDate: Date | null
  selectedTime: string | null
  onSelect: (date: Date | null, time: string | null) => void
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export function DateTimeStep({ selectedDate, selectedTime, onSelect }: DateTimeStepProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

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
    if (dayOfWeek === 6) return SATURDAY_TIME_SLOTS // Saturday
    return TIME_SLOTS
  }

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return
    onSelect(date, null) // Reset time when date changes
  }

  const handleTimeSelect = (time: string) => {
    onSelect(selectedDate, time)
  }

  const timeSlots = selectedDate ? getTimeSlotsForDate(selectedDate) : []

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Pick a Date & Time
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose your preferred appointment slot
        </p>
      </div>

      {/* Calendar */}
      <div className="rounded-xl border border-border/50 bg-background p-4">
        {/* Month navigation */}
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentMonth(prev => addMonths(prev, -1))}
            disabled={isSameMonth(currentMonth, new Date())}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-serif text-base font-medium">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Weekday headers */}
        <div className="mb-2 grid grid-cols-7 gap-1">
          {WEEKDAYS.map(day => (
            <div key={day} className="py-1 text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the first of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days of the month */}
          {days.map(day => {
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
                  disabled && 'cursor-not-allowed text-muted-foreground/50',
                  !disabled && !selected && 'hover:bg-muted',
                  selected && 'bg-primary text-primary-foreground',
                  today && !selected && 'ring-1 ring-primary',
                  !disabled && !selected && 'text-foreground'
                )}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="mt-4">
          <h4 className="mb-3 text-sm font-medium text-foreground">
            Available times for {format(selectedDate, 'EEEE, MMMM d')}
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={cn(
                  'rounded-lg border-2 px-2 py-2.5 text-sm font-medium transition-all',
                  selectedTime === time
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Note */}
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Appointments are secured once the deposit is received.
        </p>
      </div>
    </div>
  )
}
