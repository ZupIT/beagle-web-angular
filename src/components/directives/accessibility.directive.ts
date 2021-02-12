import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core'
import { Accessibility } from '../schemas/accessibility'

type A11YAttr = { qualifiedName: string, value: string }

/* WARNING: If one day Beagle's BFF return more Accessibility props, please add here */
const handlers: Record<keyof Accessibility, (a11y: Accessibility) => A11YAttr | null> = {
  accessibilityLabel: ({ accessibilityLabel }) => 
    accessibilityLabel ? { value: accessibilityLabel || '', qualifiedName: 'aria-label' } : null,
  accessible: () => null,
  isHeader: ({ isHeader }) => isHeader ? { qualifiedName: 'role', value: 'heading' } : null,
}

const notAccessible: Accessibility = { accessible: false }

@Directive({ selector: '[beagleAccessibility]' })
export class BeagleA11YDirective implements OnInit, OnChanges {
  @Input() public beagleAccessibility: Accessibility

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

  private buildAccessibility(a11y: Accessibility): A11YAttr[] {
    const keys = Object.keys(a11y) as (keyof Accessibility)[]
    return keys.reduce((result, key) => {
      const attr = handlers[key](a11y)
      return attr ? [...result, { qualifiedName: attr.qualifiedName, value: attr.value }] : result
    }, [])
  }

  private updateA11Y(a11y: Accessibility = notAccessible) {
    if (!a11y.accessible) return {}

    const attrs = this.buildAccessibility(a11y)
    attrs.forEach(a => {
      this.renderer.setAttribute(this.element.nativeElement, a.qualifiedName, a.value)
    })
  }
}
