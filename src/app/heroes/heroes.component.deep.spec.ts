import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {HeroService} from "../hero.service";
import {HeroComponent} from "../hero/hero.component";
import {of} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55},
    ]

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    fixture = TestBed.createComponent(HeroesComponent)
  });

  it('should render each hero as a HeroComponent', () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES))

    // act
    fixture.detectChanges()

    // assert
    const heroComponentsDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent))
    expect(heroComponentsDebugElements).toHaveSize(3)
    expect(heroComponentsDebugElements[0].componentInstance.hero.name).toEqual('SpiderDude')
    expect(heroComponentsDebugElements[1].componentInstance.hero.name).toEqual('Wonderful Woman')
    expect(heroComponentsDebugElements[2].componentInstance.hero.name).toEqual('SuperDude')

    for (let i=0; i < heroComponentsDebugElements.length; i++) {
      expect(heroComponentsDebugElements[i].componentInstance.hero).toEqual(HEROES[i])
    }
  })


})
