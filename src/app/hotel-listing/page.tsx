"use client";
import { useEffect, useState } from "react";
import SearchLocationDatePicker from "@/components/home/searchlocationdatepicker/SearchLocationDatePicker";
import HotelListingDetails from "@/components/hotellisting/hotellistingdetails/HotelListingDetails";
import Loader from "@/components/ui/loader";
import useHotelList from "@/hooks/useHotelList";
import NoSearchResultFound from "@/components/hotellisting/nosearchresultfound/NoSearchResultFound";

const HotelListing = () => {
  const {
    loading,
    place,
    checkin,
    checkout,
    adults,
    childs,
    hotelList,
    fetchHotelList,
  } = useHotelList();

  // states defined to select the sorted value
  const [sortItem, setSortItem] = useState<string>("default");

  // call hotel list method on place, checkin, checkout, adults and childs change
  useEffect(() => {
    fetchHotelList(sortItem);
  }, [place, checkin, checkout, adults, childs, sortItem]);

  // standard loader
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container">
        <div className="relative mt-48">
          {/* search input date picker and guest details */}
          <SearchLocationDatePicker />
        </div>

        {hotelList?.length > 0 ? (
          // hotel listing
          <HotelListingDetails
            hotelList={hotelList}
            sortItem={sortItem}
            setSortItem={setSortItem}
          />
        ) : (
          place &&
          checkin &&
          checkout && (
            <NoSearchResultFound
              place={place}
              checkin={checkin}
              checkout={checkout}
            />
          )
        )}
      </div>
    </div>
  );
};
export default HotelListing;
