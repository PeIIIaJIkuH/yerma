FROM node:16

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# копируем 'package.json' и 'yarn.lock'
COPY package.json yarn.lock ./

# устанавливаем зависимости проекта
RUN yarn install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .