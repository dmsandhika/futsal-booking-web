import { Button } from '@/components/ui/button'
import { Calendar, ChevronRight, MapPin, Clock } from 'lucide-react'
import heroImage from '../public/images/field.webp'
import Image from 'next/image'
import Link from 'next/link'
import apiUrl from '@/lib/env'

async function checkCloseDate() {
  try {
    const response = await fetch(`${apiUrl}/close-dates/check`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch close date')
    }

    const data = await response.json()
    return data.is_closed
  } catch (error) {
    console.error('Error fetching close date:', error)
    return null
  }
}

const HeroSection = async () => {
  const isClosed = await checkCloseDate()
  return (
    <section className="gradient-hero relative min-h-[90vh] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="animate-slide-up">
            <div
              className={`bg-primary/10 ${isClosed ? 'text-red-500' : 'text-primary'} mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium`}
            >
              <span
                className={`${isClosed ? 'bg-red-500' : 'bg-primary'} flex h-2 w-2 animate-pulse rounded-full`}
              />
              {isClosed ? 'Booking Online Ditutup' : 'Booking Online 24/7'}
            </div>

            <h1 className="text-foreground mb-6 text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl">
              Booking Lapangan
              <span className="text-primary block">Futsal Mudah</span>& Cepat
            </h1>

            <p className="text-muted-foreground mb-8 max-w-lg text-lg">
              Pilih lapangan, tentukan jadwal, dan booking dalam hitungan menit. Tanpa perlu daftar
              akun, langsung main!
            </p>

            {/* CTA Buttons */}
            <div className="mb-12 flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link href="/jadwal">
                  <Calendar className="h-5 w-5" />
                  Cek Jadwal Tersedia
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/#fields">Lihat Lapangan</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-primary text-3xl font-bold">3</div>
                <div className="text-muted-foreground text-sm">Lapangan</div>
              </div>
              <div>
                <div className="text-primary text-3xl font-bold">15+</div>
                <div className="text-muted-foreground text-sm">Jam/Hari</div>
              </div>
              <div>
                <div className="text-primary text-3xl font-bold">100+</div>
                <div className="text-muted-foreground text-sm">Booking/Bulan</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="animate-fade-in relative" style={{ animationDelay: '200ms' }}>
            <div className="shadow-glow relative overflow-hidden rounded-3xl">
              <Image
                src={heroImage}
                alt="Lapangan Futsal Premium"
                className="h-full w-full object-cover"
              />
              <div className="from-foreground/40 bg-gradient-to-transparent absolute inset-0" />

              {/* Floating Cards */}
              <div className="absolute right-6 bottom-6 left-6 flex flex-col gap-3">
                <div className="bg-card/95 shadow-card flex items-center gap-3 rounded-xl p-4 backdrop-blur-sm">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <MapPin className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-foreground font-semibold">Lokasi Strategis</div>
                    <div className="text-muted-foreground text-sm">Pusat Kota, Mudah Dijangkau</div>
                  </div>
                </div>
                <div className="bg-card/95 shadow-card flex items-center gap-3 rounded-xl p-4 backdrop-blur-sm">
                  <div className="bg-success/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Clock className="text-success h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-foreground font-semibold">Buka Setiap Hari</div>
                    <div className="text-muted-foreground text-sm">08:00 - 23:00 WIB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
