/*
  * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *  http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
*/

import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { buildBeagleTestModuleMetadata } from '../test-module-builder'
import { TestBeagleAccessibilityDirective } from '../mocks/accessibility.component'
import { Accessibility } from '../../../components/schemas/accessibility'

let component: TestBeagleAccessibilityDirective
let componentNative: HTMLElement
let fixture: ComponentFixture<TestBeagleAccessibilityDirective>

const beagleA11YttrsQuerySelector = 'p[data-test-id="p-element"]'
const ariaLabelText = 'Test Label'
const getAttrsAsArrayFromElement = (element: HTMLElement) =>  [...Array.from(element.attributes)]
const getOnlyAriaBeagleA11YttrsFn = a => a.name.includes('aria-')
const getOnlyRoleBeagleA11YttrsFn = a => (a.name === 'role')
const getBeagleA11YttrsFn = a => getOnlyAriaBeagleA11YttrsFn(a) || getOnlyRoleBeagleA11YttrsFn(a)
const getAttributeValue = (attrs: NamedNodeMap, name: string) => attrs.getNamedItem(name)?.value || ''
const buildAccessibility = 
  (accessible: boolean, accessibilityLabel: string, isHeader: boolean): Accessibility => 
    ({ accessible, accessibilityLabel, isHeader })

describe('BeagleA11YDirective', () => {
  beforeEach(async(() => {
    jest.autoMockOn()
    TestBed.configureTestingModule(
      buildBeagleTestModuleMetadata([TestBeagleAccessibilityDirective]))
      .compileComponents()

    fixture = TestBed.createComponent(TestBeagleAccessibilityDirective)
    component = fixture.componentInstance
    componentNative = fixture.debugElement.nativeElement
    fixture.detectChanges()
  }))

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot()
  })

  // eslint-disable-next-line max-len
  it('should have no "aria-" attributes or "role" attribute when no accessibility is provided or "accessibility.accessible" is false', () => {
    const p = componentNative.querySelector(beagleA11YttrsQuerySelector) as HTMLParagraphElement    
    let attrs = getAttrsAsArrayFromElement(p).filter(getBeagleA11YttrsFn)
    
    expect(attrs.length).toEqual(0)

    component.accessibility = buildAccessibility(false, ariaLabelText, true)
    fixture.detectChanges()

    attrs = getAttrsAsArrayFromElement(p).filter(getBeagleA11YttrsFn)

    expect(attrs.length).toEqual(0)
  })

  it('should set the attribute [role="heading"] when "accessible" and "isHeader" are true', () => {
    const p = componentNative.querySelector(beagleA11YttrsQuerySelector) as HTMLParagraphElement    
    component.accessibility = buildAccessibility(true, '', true)
    fixture.detectChanges()

    const attrs = getAttrsAsArrayFromElement(p).filter(getOnlyAriaBeagleA11YttrsFn)

    expect(attrs.length).toEqual(0)
    expect(getAttributeValue(p.attributes, 'role')).toEqual('heading')
  })

  // eslint-disable-next-line max-len
  it(`should set the attribute [aria-label="${ariaLabelText}"] when accessibilityLabel is setted`, () => {
    const p = componentNative.querySelector(beagleA11YttrsQuerySelector) as HTMLParagraphElement    
    component.accessibility = buildAccessibility(true, ariaLabelText, false)
    fixture.detectChanges()

    let attrs = getAttrsAsArrayFromElement(p).filter(getOnlyAriaBeagleA11YttrsFn)
    expect(attrs.length).toBeGreaterThan(0)

    attrs = getAttrsAsArrayFromElement(p).filter(getOnlyRoleBeagleA11YttrsFn)
    expect(attrs.length).toBe(0)

    expect(getAttributeValue(p.attributes, 'aria-label')).toEqual(ariaLabelText)
  })

  it(`should have role and [aria-label="${ariaLabelText}"] when everything is truthy`, () => {
    const p = componentNative.querySelector(beagleA11YttrsQuerySelector) as HTMLParagraphElement    
    component.accessibility = buildAccessibility(true, ariaLabelText, true)
    fixture.detectChanges()

    let attrs = getAttrsAsArrayFromElement(p).filter(getOnlyAriaBeagleA11YttrsFn)
    expect(attrs.length).toBeGreaterThan(0)

    attrs = getAttrsAsArrayFromElement(p).filter(getOnlyRoleBeagleA11YttrsFn)
    expect(attrs.length).toBeGreaterThan(0)

    expect(getAttributeValue(p.attributes, 'role')).toEqual('heading')
    expect(getAttributeValue(p.attributes, 'aria-label')).toEqual(ariaLabelText)
  })
})
