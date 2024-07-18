import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NoHotelDataFound = () => {
  const router = useRouter();
  return (
    <div className="my-12 h-[90vh]">
      <div className="pt-2">
        <div className="p-3 bg-white rounded-xl mt-6 mb-5 [box-shadow:0px_2px_23.2px_0px_rgba(0,_0,_0,_0.09)]">
          <div className="flex items-center justify-center flex-col w-full h-auto ">
            <div className="relative w-[225px] h-[220px] my-3">
              <Image
                src="/no_hotel_found.png"
                alt="NO image found"
                fill
                className="object-cover rounded-xl"
                sizes="auto"
                loading="lazy"
              />
            </div>
            <div className="text-4xl font-bold text-center text-[#FF6535]">
              Hotel details not found !
            </div>
            <div className="text-sm pt-2 mb-8">
              We couldn't find any hotel details for this Hotel.
            </div>
            <Button
              size={"lg"}
              className="bg-[#FF6535] my-2"
              onClick={() => {
                router.back();
              }}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoHotelDataFound;
