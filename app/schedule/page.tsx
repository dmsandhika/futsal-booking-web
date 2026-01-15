'use client'

import { Zap, CalendarIcon } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { formatPrice, Court, TimeSlotHours } from '@/lib/bookingStore'
import { Calendar } from '@/components/ui/calendar'
import React from 'react'
import { id } from 'date-fns/locale'
import { useState, useEffect } from 'react'
import apiUrl from '@/lib/env'
import { format } from 'date-fns'

const SchedulePage = () => {
  const [fields, setFields] = useState<Court[]>([])
  useEffect(() => {
    fetch(`${apiUrl}/courts/`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setFields(data.data)
        } else {
          setFields([])
        }
      })
      .catch(err => {
        console.log('fetch error:', err)
        setFields([])
      })
  }, [])

  const [selectedField, setSelectedField] = React.useState<string | ''>('')
  const field = fields.find(f => f.id === selectedField) || null
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [bookedSlots, setBookedSlots] = useState<string[]>([])

  useEffect(() => {
    if (!selectedField || !selectedDate) {
      return
    }
    const dateStr = format(selectedDate, 'yyyy-MM-dd')

    fetch(`${apiUrl}/bookings/?court_id=${selectedField}&booking_date=${dateStr}`)
      .then(res => res.json())
      .then(data => {
        const bookings: import('@/lib/bookingStore').Booking[] = Array.isArray(data.data)
          ? data.data
          : []
        const slots = bookings.map(b => b.time_slot)
        setBookedSlots(slots)
      })
      .catch(err => {
        console.log('fetch bookings error:', err)
        setBookedSlots([])
      })
  }, [selectedField, selectedDate])
  const availableCount = TimeSlotHours.filter(slot => !bookedSlots.includes(slot)).length
  const bookedCount = bookedSlots.length
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-slide-up mb-8 text-center">
        <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Cek Jadwal Tersedia</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Lihat ketersediaan jadwal untuk setiap lapangan. Pilih lapangan dan tanggal untuk melihat
          slot waktu yang tersedia.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Field Selection */}
            <div className="bg-card shadow-card animate-slide-up rounded-2xl p-6">
              <h3 className="text-foreground mb-4 flex items-center gap-2 font-semibold">
                <Zap className="text-primary h-5 w-5" />
                Pilih Lapangan
              </h3>
              {fields.length === 0 && (
                <div className="text-destructive mb-2 text-sm">
                  Lapangan tidak tersedia atau gagal memuat data.
                </div>
              )}
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih lapangan" />
                </SelectTrigger>
                <SelectContent style={{ zIndex: 50 }}>
                  {fields.map(f => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.name} - {formatPrice(f.price_per_hour)}/jam
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {field && (
                <div className="text-muted-foreground mt-4 text-sm">
                  <p className="mb-2">{field.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {field.features.map((feature, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Calendar */}
            <div
              className="bg-card shadow-card animate-slide-up rounded-2xl p-6"
              style={{ animationDelay: '100ms' }}
            >
              <h3 className="text-foreground mb-4 flex items-center gap-2 font-semibold">
                <CalendarIcon className="text-primary h-5 w-5" />
                Pilih Tanggal
              </h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={date => date && setSelectedDate(date)}
                disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="border-border rounded-xl border"
                locale={id}
              />
            </div>

            {/* Stats */}
            {selectedField && selectedDate && (
              <div
                className="bg-card shadow-card animate-slide-up rounded-2xl p-6"
                style={{ animationDelay: '200ms' }}
              >
                <h3 className="text-foreground mb-4 font-semibold">Status Hari Ini</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-success/10 rounded-xl p-4 text-center">
                    <div className="text-success text-2xl font-bold">{availableCount}</div>
                    <div className="text-muted-foreground text-xs">Tersedia</div>
                  </div>
                  <div className="bg-destructive/10 rounded-xl p-4 text-center">
                    <div className="text-destructive text-2xl font-bold">{bookedCount}</div>
                    <div className="text-muted-foreground text-xs">Terisi</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SchedulePage
