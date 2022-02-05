import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {HeroService} from "../hero.service";
import {of} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 55},
    ]

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent)
  });

  it('should set heroes correctly from the service', () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES))

    // act
    fixture.detectChanges()

    // assert
    expect(fixture.componentInstance.heroes.length).toBe(3)

  })

})
