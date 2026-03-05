import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SolutionsMain } from "./solutions-main";

describe("SolutionsMain", () => {
  let component: SolutionsMain;
  let fixture: ComponentFixture<SolutionsMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionsMain],
    }).compileComponents();

    fixture = TestBed.createComponent(SolutionsMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
