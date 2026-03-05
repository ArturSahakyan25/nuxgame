import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameProvaider } from "./game-provaider";

describe("GameProvaider", () => {
  let component: GameProvaider;
  let fixture: ComponentFixture<GameProvaider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameProvaider],
    }).compileComponents();

    fixture = TestBed.createComponent(GameProvaider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
