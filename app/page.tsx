import HeroSection from '@/components/HeroSection'
import Image from 'next/image'
import { getCourts } from '@/lib/bookingStore'
import FieldCard from '@/components/FieldCard'
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-card p-8 shadow-card md:p-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-foreground">
                  Hubungi Kami
                </h2>
                <p className="mb-8 text-muted-foreground">
                  Ada pertanyaan? Jangan ragu untuk menghubungi kami
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Telepon</div>
                      <div className="font-semibold text-foreground">+62 812 3456 7890</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-semibold text-foreground">info@futsalku.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Alamat</div>
                      <div className="font-semibold text-foreground">Jl. Olahraga No. 123, Jakarta</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Jam Operasional</div>
                      <div className="font-semibold text-foreground">Setiap Hari 08:00 - 23:00</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.81572451536045!3d-6.194741395515238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f422f8c13c5d%3A0x64b4e6e0bf0f6c2e!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1635000000000!5m2!1sid!2sid"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
