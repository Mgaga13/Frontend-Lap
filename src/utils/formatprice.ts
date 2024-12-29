const formatVND = (price: number) => {
  // Định dạng số theo kiểu tiền tệ Việt Nam
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return formattedPrice;
  // // Loại bỏ ký tự "₫" và trả về giá trị
  // return formattedPrice.replace("₫", "").trim();
};

export { formatVND };
