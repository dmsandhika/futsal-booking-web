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
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Cara Booking
            </h2>
            <p className="text-muted-foreground">
              Proses booking yang mudah dan cepat
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: '1', title: 'Pilih Lapangan', desc: 'Pilih lapangan sesuai kebutuhan dan budget Anda' },
              { step: '2', title: 'Pilih Jadwal', desc: 'Tentukan tanggal dan jam yang tersedia' },
              { step: '3', title: 'Isi Data', desc: 'Lengkapi data diri untuk konfirmasi' },
              { step: '4', title: 'Selesai!', desc: 'Booking berhasil, datang dan main!' },
            ].map((item, index) => (
              <div
                key={index}
                className="relative text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto font-bold text-3xl opacity-90">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
