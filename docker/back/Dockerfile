FROM node:12.2

ENV HOME=/back

RUN apt-get update && apt-get install htop
RUN apt-get install git
RUN npm install --global nodemon
RUN git init
RUN git remote add -f origin https://github.com/ZSabakh/solidarity-ua
RUN git config core.sparseCheckout true
RUN echo "back/" >> .git/info/sparse-checkout
RUN git pull origin main 


WORKDIR $HOME/

RUN npm install --silent --progress=false

EXPOSE 5100

CMD ["nodemon", "start"]