FROM python:2.7.18

RUN apt-get update -qq && apt-get install -y apt-transport-https
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y build-essential yarn nodejs less vim

WORKDIR /app
ADD . .

ADD gitconfig-fake /root/.gitconfig

RUN npm install
RUN cd node_modules/openmct; npm install && node ./node_modules/bower/bin/bower install --allow-root && node ./node_modules/gulp/bin/gulp.js install

CMD ["/usr/bin/npm", "start"]


