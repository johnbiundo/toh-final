import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeroService } from './hero.service';

let httpClientSpy: { get: jasmine.Spy };
let messageServiceSpy: { add: jasmine.Spy };
let heroService: HeroService;

describe('heroService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    heroService = new HeroService(<any> httpClientSpy, <any>messageServiceSpy);
  });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedHeroes: Hero[] =
      [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

    httpClientSpy.get.and.returnValue(of(expectedHeroes));

    heroService.getHeroes().subscribe(
      heroes => expect(heroes).toEqual(expectedHeroes, 'expected heroes'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
