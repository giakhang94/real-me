Dự án RealME (clone realtor.com) - là một trang web đăng tin bán/cho thuê bất động sản.
Chức năng:

- Đăng ký, đăng nhập (có thể đăng ký bằng google)
- Đăng tỉn phân ra Cho thuê bất động sản và bán bất động sản
- Thêm xoá sửa user, thêm xoá sửa bất động sản (có phân quyền Authorization)
- Thông tin được hiển thị ra theo dạng card. Mỗi Bất động sản có 1 trang riêng chứa thông tin
  form liên hệ, bản đổ và location mark theo toạ độ.
  --
  Front-end: ReactJS - tailwindcss - leaflet (bản đồ)
  Sử dụng useReducer và useContext cùng với các hooks khác.
  Sử dụng Firebase để lưu trữ dữ liệu bất động sản, thông tin user.
