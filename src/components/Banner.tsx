import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
const Banner = () => {
  const images = [
    "https://via.placeholder.com/1920x1080?text=Image+1",
    "https://via.placeholder.com/1920x1080?text=Image+2",
    "https://via.placeholder.com/1920x1080?text=Image+3",
    "https://via.placeholder.com/1920x1080?text=Image+4",
  ];
  return (
    <div className='content banner-init'>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1} // Hiển thị 1 slide trên màn hình
        pagination={{ clickable: true }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100vw", // Chiều rộng 100% màn hình
                height: "600px", // Chiều cao 100% màn hình (tùy chọn)
                objectFit: "cover", // Đảm bảo ảnh bao phủ toàn bộ slide
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
