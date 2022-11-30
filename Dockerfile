FROM node

# Create app directory
WORKDIR /flashinglearn

# RUN git clone https://rodrigocoeio@bitbucket.org/rodrigocoeio/flashinglearn.git .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 90
CMD npm run dev