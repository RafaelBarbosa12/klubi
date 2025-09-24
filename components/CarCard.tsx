import { Car } from '@/types';
import { MapPin, DollarSign } from 'lucide-react';
import Image from 'next/image';

interface CarCardProps {
  car: Car;
  onInterested: (car: Car) => void;
}

export default function CarCard({ car, onInterested }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getCarImageUrl = (carName: string, model: string) => {
    // URLs de imagens reais dos carros (você pode atualizar estas)
    const carImages: { [key: string]: string } = {
      'BYD Dolphin': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
      'Toyota Corolla': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      'Volkswagen T-Cross': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
      'Honda Civic': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
      'Chevrolet Onix': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
      'Hyundai HB20': 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop',
      'Renault Kwid': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=300&fit=crop',
      'Fiat Pulse': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop',
      'Jeep Renegade': 'https://images.unsplash.com/photo-1533473359331-0b58bcad6525?w=400&h=300&fit=crop',
      'Peugeot 208': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop',
    };

    const key = `${carName} ${model}`;
    return carImages[key] || 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=300&fit=crop';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-slide-up">
      <div className="relative h-48 w-full">
        <Image
          src={getCarImageUrl(car.Name, car.Model)}
          alt={`${car.Name} ${car.Model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {car.Name} {car.Model}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-primary-600">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="font-semibold text-lg">
              {formatPrice(car.Price)}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{car.Location}</span>
          </div>
        </div>
        
        <button
          onClick={() => onInterested(car)}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium"
        >
          Tenho Interesse
        </button>
      </div>
    </div>
  );
}