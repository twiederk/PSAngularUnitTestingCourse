import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";

describe('HeroComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent]
    });
    fixture = TestBed.createComponent(HeroComponent)
  })

  it('should have the correct hero', () => {
    // act
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3};

    // assert
    fixture.detectChanges();
    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  })

})
