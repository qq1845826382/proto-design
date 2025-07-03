# 使用官方 Node 14 镜像作为基础
FROM node:14

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 拷贝进镜像，
# 单独复制可以利用 Docker 的缓存，避免每次都重新安装依赖
COPY package*.json ./

# 安装项目依赖
RUN npm install

RUN npm install -g serve

# 复制项目其余源代码
COPY . .

RUN npm run build
RUN mv dist proto
CMD ["node", "/usr/local/bin/serve", "-s", "proto"]


