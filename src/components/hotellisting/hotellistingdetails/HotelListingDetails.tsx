import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiMapPinLine } from "@remixicon/react";
import Image from "next/image";
import { RiShiningFill } from "@remixicon/react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface HotelListProps {
  "hotel_address.city_name": string;
  hotel_name: string;
  hotel_id: number;
  hotel_grade: string;
  ari: Ari;
  exterior_images: string[];
  interior_images: string[];
  status: number;
  location: string;
}

interface Ari {
  rooms: number;
  min: number;
}

interface HotelListingDetailsProps {
  hotelList: HotelListProps[];
  sortItem: string;
  setSortItem: (value: string) => void;
}

interface sortItemProps {
  id: number;
  name: string;
  value: string;
}

const HotelListingDetails: React.FC<HotelListingDetailsProps> = ({
  hotelList,
  sortItem,
  setSortItem,
}) => {
  // nextjs 14 routing
  const router = useRouter();
  const searchParams = useSearchParams();

  // method to navigate to hotel details page
  const handleSelectRoom = (hotelId: number, hotelName: string) => {
    // fetch url params
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const adults = searchParams.get("adults");
    const childs = searchParams.get("childs");

    // Format the hotel name to be URL-friendly
    const formattedHotelName = hotelName.toLowerCase().replace(/\s+/g, "-");

    // Construct the URL slug
    const urlSlug = `/hotel-details/${hotelId}/${formattedHotelName}?checkin=${checkin}&checkout=${checkout}&adults=${adults}&childs=${childs}`;

    // Navigate to the hotel details page
    router.push(urlSlug);
  };

  // sort items and states defined to fetch the hotel list based on the sort value
  const [sortItemList, setSortItemList] = useState<sortItemProps[]>([
    {
      id: 1,
      name: "Best Match",
      value: "default",
    },
    {
      id: 2,
      name: "Price: Low to High",
      value: "ari:asc",
    },
    {
      id: 3,
      name: "Price: High to Low",
      value: "ari:desc",
    },
    {
      id: 4,
      name: "Raing: Low to High",
      value: "hotel_grade:asc",
    },
    {
      id: 5,
      name: "Rating: High to Low",
      value: "hotel_grade:desc",
    },
  ]);

  const handleSortedValue = (sortValue: string) => {
    setSortItem(sortValue);
  };

  return (
    <div className="my-12 h-4/5">
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm font-semibold text-[#656565]">
          {hotelList?.length} for hotel found
        </div>
        <div>
          <Select onValueChange={handleSortedValue}>
            <SelectTrigger className="w-[180px] focus:ring-0">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Sort by:</SelectLabel> */}
                {sortItemList &&
                  sortItemList.map((sortItems, index) => (
                    <React.Fragment key={index}>
                      <SelectItem value={sortItems.value}>
                        {sortItems.name}
                      </SelectItem>
                    </React.Fragment>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {hotelList &&
        hotelList.map((hotelData, index: number) => {
          return (
            <div
              key={index}
              className="p-3 bg-white rounded-xl mt-6 mb-5 [box-shadow:0px_2px_23.2px_0px_rgba(0,_0,_0,_0.09)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex-grow-1 flex-shrink basis-96">
                  <div className="relative w-full h-64 rounded-xl">
                    <Image
                      priority
                      src={hotelData?.exterior_images[0]}
                      alt={hotelData?.hotel_name}
                      fill
                      className="object-cover rounded-xl"
                      sizes="auto"
                    />
                  </div>
                </div>
                <div className="flex-grow-2 flex-shrink basis-full p-4">
                  <div className="flex flex-col h-56 justify-between">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-semibold">
                          {hotelData?.hotel_name}
                        </div>
                        <div className="flex items-center text-base font-normal text-[#858585]">
                          <RiMapPinLine
                            size={18}
                            className="text-[#FF6535] me-1"
                          />
                          {hotelData?.["hotel_address.city_name"]}
                          {hotelData?.location}
                        </div>
                      </div>

                      <div className="flex items-end flex-col justify-end">
                        <div className="flex items-center justify-center text-base font-semibold">
                          {hotelData?.hotel_grade}{" "}
                          <RiShiningFill size={16} className="ms-1" />
                        </div>
                        <div className="text-sm font-medium text-[#858585]">
                          (85 reviews)
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-normal text-[#858585]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur ultricies risus ac tortor mollis cursus. In hac
                      habitasse platea dictumst. Nulla ornare, enim in accumsan
                      euismod, arcu ipsum pulvinar magna, nec elementum purus
                      massa id diam. Maecenas non nulla gravida tellus pretium
                      gravida ut sed enim. Aenean more
                    </div>

                    <div className="flex items-end flex-col">
                      <div className="text-sm font-semibold text-[#FF5353]">
                        Hurry !
                      </div>
                      <div className="text-xs font-normal text-[#FF5353]">
                        {hotelData?.ari.rooms} rooms left
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-[#858585]">
                          Price starting from
                        </div>
                        <div className="flex items-center text-2xl font-semibold text-[#18941D]">
                          ₹{hotelData?.ari.min}
                          <span className="text-sm font-medium text-[#858585]">
                            / per night
                          </span>
                        </div>
                      </div>
                      <div>
                        <Button
                          size="lg"
                          className="bg-[#FF6535]"
                          onClick={() =>
                            handleSelectRoom(
                              hotelData?.hotel_id,
                              hotelData?.hotel_name
                            )
                          }
                        >
                          Select Room
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default HotelListingDetails;
