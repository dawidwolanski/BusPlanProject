// import database from busapp_final.sql

backend config:

https://slproweb.com/products/Win32OpenSSL.html

then add openssl to path, if its not


cd /BusPlanApp/server/
mkdir certificates
cd certificates

openssl genpkey -algorithm RSA -out server.key
openssl req -new -key server.key -out server.csr

// fill questions with any data

openssl x509 -req -in server.csr -signkey server.key -out server.crt -days 365

// finally, install server.crt certificate by double-clicking

npm run dev


clienc config:
cd client
npm run dev

// sample users:
admin: 
l: admin
p: admin123

entrepreneur:
l: test
p: test123

user:
l: user
p: user1234