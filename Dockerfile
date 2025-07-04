# 使用官方 Node 14 镜像作为基础
FROM node:14

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 拷贝进镜像，
# 单独复制可以利用 Docker 的缓存，避免每次都重新安装依赖
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 全局安装 serve，用于提供静态文件服务
RUN npm install -g serve

# 复制项目其余源代码
COPY . .

# 设置构建时的静态资源前缀，Docker 部署时需要位于根路径
ENV PUBLIC_PATH=/

RUN npm run build
RUN mv dist proto

# 开放应用端口
EXPOSE 3000

# 启动静态文件服务，监听 3000 端口
CMD ["node", "/usr/local/bin/serve", "-s", "proto", "-l", "3000"]
