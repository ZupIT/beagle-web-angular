import { Directive, ElementRef, Input } from '@angular/core'
import { Accessibility } from '../schemas/accessibility'

type A11YAttr = { qualifiedName: string, value: string }

@Directive({ selector: '[beagleAccessibility]' })
export class BeagleA11YDirective {
  private readonly ariaMap: Record<string, string | A11YAttr> = {
    accessibilityLabel: 'aria-label',
    isHeader: {
      qualifiedName: 'role',
      value: 'heading',
    },    
  }

  private _beagleA11Y: Accessibility
  @Input() public set beagleAccessibility(a11y: Accessibility) {
    this._beagleA11Y = a11y
    this.updateA11Y(a11y)
  }

  public get beagleAccessibility(): Accessibility {
    return this._beagleA11Y
  }

  constructor(public element: ElementRef<HTMLElement>) {
  }

  private updateA11Y(a11y: Accessibility) {
    if (a11y && a11y.accessible) {
      for (const key in Object.keys(a11y).filter(k => k !== 'accessible')) {
        if (a11y[key]) {
          let qualifiedName: string, value: string
          const mapped = this.ariaMap[key]

          if (mapped) {
            if (typeof mapped === 'object') {
              qualifiedName = (mapped as A11YAttr).qualifiedName
              value = (mapped as A11YAttr).value
            } else {
              qualifiedName = mapped as string
              value = a11y[key]
            }
  
            this.element.nativeElement.setAttribute(qualifiedName, value)
          }
        }
      }
    }
  }
}
