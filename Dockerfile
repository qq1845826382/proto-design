# 使用官方 Node 14 镜像作为基础
FROM node:14

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 拷贝进镜像，
# 单独复制可以利用 Docker 的缓存，避免每次都重新安装依赖
COPY package*.json ./

# 安装项目依赖
RUN npm install --loglevel=silly

# 复制项目其余源代码
COPY . .

# 构建生产环境文件，执行 vue-cli-service build
RUN npm run build --loglevel=silly

# 安装 serve 用来提供静态文件服务
RUN npm install -g serve

# 对外暴露端口，默认为 8080
EXPOSE 8080

# 运行静态文件服务，根目录为 dist
CMD ["serve", "-s", "dist"]
