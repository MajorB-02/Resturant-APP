import Image from "next/image";

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
  image: string;
}

export default function MenuItem({ name, description, price, image }: MenuItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <span className="text-lg font-medium text-gray-800">{price}</span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
} 