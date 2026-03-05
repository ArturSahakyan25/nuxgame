import {AfterViewInit, Component, effect, OnDestroy, signal, WritableSignal} from "@angular/core";
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {RouterLink} from "@angular/router";
import {LinkTarget} from "../../../shared/utils/models/link-target.enum";

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: "app-solutions-main",
    imports: [
        RouterLink,
    ],
    templateUrl: "./solutions-main.html",
    styleUrl: "./solutions-main.scss",
})
export class SolutionsComponent implements AfterViewInit, OnDestroy {
    public readonly activeTagIndex: WritableSignal<number> = signal(0);
    protected readonly LinkTarget = LinkTarget;
    public readonly tags = [
        'All-in-One Platform',
        'In-built Payment Solutions',
        '24/7 Technical Support'
    ];

    setHover(index: number) {
        this.activeTagIndex.set(index);
    }

    resetHover() {
        this.activeTagIndex.set(0);
    }

  ngAfterViewInit() {
    const sections = gsap.utils.toArray('.solutionsItem');

    sections.forEach((section: any, index: number) => {
      const overlay = section.querySelector('.solutionsOverlay');
      const isLast = index === sections.length - 1;

      // Создаем таймлайн для фиксации (pin)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: isLast, // Spacing только для самой последней секции
          scrub: true,
          id: `section-${index}`
        }
      });

      // Если у секции есть оверлей и она не последняя — добавляем анимацию затемнения
      if (overlay && !isLast) {
        tl.to(overlay, {
          opacity: 0.9, // Затемняем почти до конца
          ease: "power2.in"
        });

        // Опционально: можно плавно скрывать контент текущей секции
        const content = section.querySelector('.solutionsTextContent');
        if (content) {
          tl.to(content, { opacity: 0, y: -20 }, 0); // 0 — запуск одновременно с оверлеем
        }
      }
    });
  }

    ngOnDestroy() {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }

    constructor() {
        effect(() => {
            const currentIndex = this.activeTagIndex();
            gsap.killTweensOf(".solutionsImageAnimated, .solutionsTextContent p");
            gsap.fromTo(".solutionsTextContent p",
                {opacity: 0, x: -20},
                {opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: "power3.out"}
            );

        });
    }

}