import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OnlineCasino } from "./online-casino";

describe("OnlineCasino", () => {
  let component: OnlineCasino;
  let fixture: ComponentFixture<OnlineCasino>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineCasino],
    }).compileComponents();

    fixture = TestBed.createComponent(OnlineCasino);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
