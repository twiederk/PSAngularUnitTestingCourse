import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {HeroService} from "../hero.service";
import {HeroComponent} from "../hero/hero.component";
import {of} from "rxjs";
import {Directive, Input, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams
  }
}


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
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      // schemas: [ NO_ERRORS_SCHEMA ]
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

  it(`should call heroService.deleteHero when the Hero Component's
    delete button is clicked`, () => {
    // arrange
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES))
    fixture.detectChanges()
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent))

    // act
    heroComponents[0].query(By.css('button'))
      .triggerEventHandler('click', { stopPropagation: () => {} })

    // assert
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0])
  });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES))
    fixture.detectChanges()
    const name = 'Mr Ice'
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}))
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0]

    inputElement.value = name
    addButton.triggerEventHandler('click', null)

    // act
    fixture.detectChanges()

    // assert
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent
    expect(heroText).toContain(name)
  });

})
