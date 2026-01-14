import HeroSection from '@/components/HeroSection'
import Image from 'next/image'
import { getCourts } from '@/lib/bookingStore'
import FieldCard from '@/components/FieldCard'

export const Home = async () => {
  const fields = await getCourts()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <section id="fields" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Pilih Lapangan Favorit Anda
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Kami menyediakan berbagai pilihan lapangan dengan fasilitas berbeda
              untuk memenuhi kebutuhan permainan Anda
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(fields) && fields.length > 0 ? (
              fields.map((field, index) => (
                <FieldCard key={field.id} field={field} index={index} />
              ))
            ) : (
              <div>Tidak ada data lapangan.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
