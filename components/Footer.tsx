import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="border-border bg-card border-t py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <Image src="/images/logo.png" alt="FutsalKu Logo" width={32} height={32} />
          </div>
          <span className="text-foreground font-bold">FutsalKu</span>
        </div>
        <p className="text-muted-foreground text-sm">© 2026 FutsalKu. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
