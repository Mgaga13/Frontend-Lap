import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useGetListBanner } from "../services/react-query/query/banner";
const Banner = () => {
  const { data: listBanner } = useGetListBanner({
    limit: 10,
    page: 1,
    searchText: "",
  });
  return (
    <div className='content banner-init flex'>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1} // Hiển thị 1 slide trên màn hình
        pagination={{ clickable: true }}
      >
        {listBanner?.datas.map((value: any) => (
          <SwiperSlide key={value.id}>
            <img
              src={value.image}
              alt={`Slide ${value.id + 1}`}
              style={{
                width: "100%", // Chiều rộng 100% màn hình
                height: "400px", // Chiều cao 100% màn hình (tùy chọn)
                // objectFit: "cover", // Đảm bảo ảnh bao phủ toàn bộ slide
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
