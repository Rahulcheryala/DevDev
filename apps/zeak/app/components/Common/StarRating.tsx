import { IoMdStar } from "react-icons/io";
interface StarRatingProps {
  rating: number; // Decimal value from 0 to 10
}

export default function StarRating({ rating }: StarRatingProps) {
    
  return (
    <div className="flex items-center gap-1">

    
          <div  className="relative w-5 h-5">
            {/* Gray background star */}
            <IoMdStar
              className="w-5 h-5 text-muted-foreground/30"
              fill="currentColor"
              stroke="currentColor"
            />
            
            {/* Colored foreground star with width based on fill percentage */}
            <div
              className="absolute top-0 left-0 h-5 overflow-hidden"
              style={{ width: `${rating * 100}%` }}
            >
              <IoMdStar
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                stroke="currentColor"
              />
            </div>
          </div>

    </div>
  );
};