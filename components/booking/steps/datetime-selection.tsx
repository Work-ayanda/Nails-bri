"use client"

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfDay, getDay, addDays } from 'date-fns'
import { Button } from '@/components/ui/button'
import { BUSINESS_HOURS } from '@/lib/data'

interface DateTimeSelectionProps {
  selectedDate: Date | null
  selectedTime: string | null
  onDateSelect: (date: Date | null) => void
  onTimeSelect: (time: string) => void
  serviceDuration: number
}

const generateTimeSlots = (duration: number) => {
  const slots: string[] = []
  const startHour = 9
  const endHour = 17
  const slotDuration = 30
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push(time)
    }
  }
  
  return slots
}

const getDayBusinessHours = (date: Date) => {
  const dayOfWeek = getDay(date)
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
  return BUSINESS_HOURS[days[dayOfWeek]]
}

export function DateTimeSelection({ 
  selectedDate, 
  selectedTime, 
  onDateSelect, 
  onTimeSelect,
  serviceDuration 
}: DateTimeSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const timeSlots = useMemo(() => generateTimeSlots(serviceDuration), [serviceDuration])
  
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Pad the start of the month with empty cells
  const startDay = getDay(monthStart)
  const paddedDays = [...Array(startDay).fill(null), ...monthDays]
  
  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date())
    const tomorrow = addDays(today, 1)
    if (isBefore(date, tomorrow)) return true
    
    const hours = getDayBusinessHours(date)
    if (hours.closed) return true
    
    return false
  }
  
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  
  return (
    <div className="p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Select Date & Time
        </h3>
        <p className="text-sm text-muted-foreground font-sans mb-6">
          Choose your preferred appointment slot
        </p>
        
        {/* Calendar */}
        <div className="bg-card rounded-2xl border border-border p-4 mb-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevMonth}
              disabled={isSameMonth(currentMonth, new Date())}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h4 className="font-semibold text-foreground font-sans">
              {format(currentMonth, 'MMMM yyyy')}
            </h4>
            <Button variant="ghost" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-xs text-muted-foreground font-sans py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {paddedDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }
              
              const disabled = isDateDisabled(day)
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isTodayDate = isToday(day)
              
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => !disabled && onDateSelect(day)}
                  disabled={disabled}
                  className={`
                    aspect-square rounded-lg text-sm font-sans transition-all
                    ${disabled 
                      ? 'text-muted-foreground/50 cursor-not-allowed' 
                      : 'hover:bg-primary/10 cursor-pointer'
                    }
                    ${isSelected 
                      ? 'bg-primary text-primary-foreground font-semibold' 
                      : ''
                    }
                    ${isTodayDate && !isSelected 
                      ? 'ring-1 ring-primary' 
                      : ''
                    }
                  `}
                >
                  {format(day, 'd')}
                </button>
              )
            })}
          </div>
        </div>
        
        {/* Time Slots */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-foreground font-sans">
                Available Times for {format(selectedDate, 'EEE, MMM d')}
              </h4>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time, index) => {
                const isSelected = selectedTime === time
                
                return (
                  <motion.button
                    key={time}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => onTimeSelect(time)}
                    className={`
                      py-2.5 px-3 rounded-lg text-sm font-sans transition-all
                      ${isSelected 
                        ? 'bg-primary text-primary-foreground font-semibold' 
                        : 'bg-card border border-border hover:border-primary/50'
                      }
                    `}
                  >
                    {time}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
