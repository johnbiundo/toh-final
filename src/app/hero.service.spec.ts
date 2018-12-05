import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeroService } from './hero.service';
import { Hero } from './hero';

let httpClientSpy;
let messageServiceSpy;
let heroService: HeroService;

// Our  mocked data for httpClient.get() (used inside heroService)
let expectedHeroes: Hero[] = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

describe('heroService', () => {
  // run this before each spec (it())
  beforeEach(() => {

    // Spies:
    //
    // Start here.  You think inside out.  What is the service under test (this service: HeroService)
    // using as injected services?  Need to mock them here, and pass them in when we
    // instantiate that service (see heroService = new HeroService() below)
    //
    // our service under test (heroService) has injected dependencies that won't be
    // available at test run time.  We will mock them using spies.
    //
    // create our spies.
    //
    // createSpyObj takes a name and an array of strings, and returns an object
    // with a property for each string. In other words, we create our API interface here.
    //
    // so, following creates httpClientSpy with a get property
    // this is so we can have an httpClient.get() method inside heroService
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    messageServiceSpy = jasmine.createSpyObj('MessageService', ['write']);

    // instantiate our heroService with new(), passing in our spies to be injected
    // as mock services.  We've mocked the httpClient.get() method on our spy.
    heroService = new HeroService(<any>httpClientSpy, <any>messageServiceSpy);
  });

  it('should return expected heroes (HttpClient called once)', () => {
    // angular.io example used returnValue(asyncData(expectedHeroes))
    // this fails (asyncData symbol not recognized)
    // I followed this advice: https://stackoverflow.com/questions/52283055/angular-service-testing-cannot-find-name-asyncdata
    // note that the doc DOES describe a user-written asyncData helper
    //
    // .get is our api call
    // we chain .and.returnValueOf
    httpClientSpy.get.and.returnValue(of(expectedHeroes));

    heroService.getHeroes().subscribe(
      heroes => expect(heroes).toEqual(expectedHeroes),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected hero', () => {
    // .get is our api call
    // we chain .and.returnValueOf
    httpClientSpy.get.and.returnValue(of(expectedHeroes[0]));

    heroService.getHero(1).subscribe(
      hero => expect(hero).toEqual(expectedHeroes[0]),
      fail
    );
    expect(messageServiceSpy.write.calls.count()).toBe(1, 'call messageService.write once');
  });

  it('should return added hero', () => {
    let newHero: Hero = {id: 5, name: 'Bilbo'};

    // .get is our api call
    // we chain .and.returnValueOf
    httpClientSpy.post.and.returnValue(of(newHero));

    heroService.addHero(newHero).subscribe(
      hero => expect(hero).toEqual(newHero),
      fail
    );
  });
});
