import { Controller, Get } from '@nestjs/common';// to import the @Controller decorator ;
import { AppService } from './app.service';

@Controller()// accepts a parametre to set a route, and nest witll handle the routing mechanism;
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();// this is a user defined  function that will respond to any request comming to route seeted in 
    // the controller decorator, and when we add the get decorator, this function now will be executed when
    // a request is comming to the route specified in the Controller decortor whit the get request method
  }
  
}
