import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Zap } from 'lucide-react';
import { Court, formatPrice } from '@/lib/bookingStore';
import Link from 'next/link';

interface FieldCardProps {
    field: Court;
    index: number;
}

const FieldCard = ({ field, index }: FieldCardProps) => {

    return (
        <div
            className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-glow hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={field.image}
                    alt={field.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">
                    {formatPrice(field.pricePerHour)}/jam
                </Badge>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-foreground">{field.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {field.description}
                </p>

                {/* Features */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {field.features.slice(0, 3).map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                            {feature}
                        </Badge>
                    ))}
                </div>

                {/* Stats */}
                <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>08:00 - 23:00</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>10 orang</span>
                    </div>
                </div>

                {/* Action */}
                <Button variant="hero" className="w-full" asChild>
                    <Link href={`/booking/${field.id}`}>
                        <Zap className="h-4 w-4" />
                        Booking Sekarang
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default FieldCard;
