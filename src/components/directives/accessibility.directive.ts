import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core'
import { Accessibility } from '../schemas/accessibility'

type A11YAttr = { qualifiedName: string, value: string }

@Directive({ selector: '[beagleAccessibility]' })
export class BeagleA11YDirective implements OnInit, OnChanges {
  @Input() public beagleAccessibility: Accessibility

  private readonly ariaMap: Record<string, string | A11YAttr> = {
    accessibilityLabel: 'aria-label',
    isHeader: {
      qualifiedName: 'role',
      value: 'heading',
    },    
  }

  constructor(
    public element: ElementRef<HTMLElement>, 
    private renderer: Renderer2) {
  }

  public ngOnInit(): void {
    this.updateA11Y(this.beagleAccessibility)
  }
  
  public ngOnChanges(changes: SimpleChanges): void {
    this.updateA11Y(changes.beagleAccessibility.currentValue)
  }

  private updateA11Y(a11y: Accessibility) {
    if (a11y && a11y.accessible) {
      const keys = Object.keys(a11y).filter(k => k !== 'accessible')
      for (const key of keys) {
        if (a11y[key]) {
          let qualifiedName: string, value: string
          const mapped = this.ariaMap[key]

          if (mapped) {
            if ((mapped as A11YAttr).qualifiedName) {
              qualifiedName = (mapped as A11YAttr).qualifiedName
              value = (mapped as A11YAttr).value
            } else {
              qualifiedName = mapped as string
              value = a11y[key]
            }            

            this.renderer.setAttribute(this.element.nativeElement, qualifiedName, value)
          }
        }
      }
    }
  }
}
