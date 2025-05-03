import ReservationForm from '@/components/ReservationForm';

export default function ReservationsPage() {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Make a Reservation</h1>
          <p className="text-gray-600 text-center mb-12">
            Reserve your table for a memorable dining experience. For parties larger than 10,
            please call us directly at (123) 456-7890.
          </p>
          
          <ReservationForm />
        </div>
      </div>
    </div>
  );
} 