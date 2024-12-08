# Sử dụng image MongoDB chính thức từ Docker Hub
FROM mongo:5.0

# Thiết lập biến môi trường cho MongoDB
# MONGODB_VERSION: Đặt phiên bản MongoDB nếu bạn cần
ENV MONGO_INITDB_ROOT_USERNAME=root \
    MONGO_INITDB_ROOT_PASSWORD=example

# Thêm các tập tin khởi tạo nếu cần (ví dụ: các script .js hoặc .sh)
# COPY ./init-db.d /docker-entrypoint-initdb.d/

# Expose port 27017 để kết nối MongoDB từ bên ngoài container
EXPOSE 27017

# Lệnh khởi chạy MongoDB
CMD ["mongod"]