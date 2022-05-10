FROM node:16

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# копируем 'package.json' и 'yarn.lock'
COPY package.json yarn.lock ./

# устанавливаем зависимости проекта
RUN yarn install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .

# 2
#FROM node:lts-alpine
#
## install simple http server for serving static content
#RUN npm install -g http-server
#
## make the 'app' folder the current working directory
#WORKDIR /app
#
## copy both 'package.json' and 'package-lock.json' (if available)
#COPY package*.json ./
#
## install project dependencies
#RUN yarn install
#
## copy project files and folders to the current working directory (i.e. 'app' folder)
#COPY . .
#
## build app for production with minification
#RUN yarn run build

# 3
#FROM node:lts-alpine
#RUN npm install -g http-server
#WORKDIR /app
#COPY dist .
