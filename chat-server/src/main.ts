import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {// if the app failed to create app below it will exit with 1
  const app = await NestFactory.create(AppModule);// the app obj provides a set of methods exculisively for a specific platform
  //( express is used by default ), but we don't need to spicify the type unless we want to access the underlying platform API
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3001);//we simply start up our HTTP listener, which lets the application await inbound(comming) HTTP requests.

}
bootstrap();

// the above code be done like this using Express.js

// var express = require('express')
// var https = require('https')
// var http = require('http')
// var app = express()
 
// http.createServer(app).listen(80)
// https.createServer(options, app).listen(443)
