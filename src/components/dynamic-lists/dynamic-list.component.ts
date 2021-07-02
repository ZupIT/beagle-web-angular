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

import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ViewEncapsulation,
  NgZone,
  HostBinding,
} from '@angular/core'
import { 
  BeagleUIElement, 
  DataContext, 
  IdentifiableBeagleUIElement, 
  logger, 
  TemplateManager, 
  TemplateManagerItem,
} from '@zup-it/beagle-web'
import { BeagleComponent } from '../../runtime/BeagleComponent'
import { ListDirection, DynamicListInterface, ListType } from '../schemas/dynamic-list'
import { DynamicListScroll } from './dynamic-list.scroll'

@Component({
  selector: 'beagle-dynamic-list',
  templateUrl: './dynamic-list.component.html',
  styleUrls: ['./dynamic-list.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicListComponent
  extends DynamicListScroll
  implements DynamicListInterface, OnChanges {
  @Input() direction: ListDirection
  @Input() dataSource: any[]
  @Input() iteratorName?: string
  /**
   * @deprecated since v1.9.0 Will be removed in 2.0. Use `templates` attribute instead.
  */
  @Input() template: BeagleUIElement
  @Input() onInit?: () => void
  @Input() onScrollEnd?: () => void
  @Input() scrollEndThreshold?: number
  @Input() useParentScroll?: boolean
  @Input() key?: string
  @Input() __suffix__?: string
  @Input() isScrollIndicatorVisible?: boolean
  @Input() numColumns?: number
  @Input() spanCount?: number
  @Input() type: ListType
  @Input() parentReference: BeagleComponent
  @HostBinding('class.has-scroll') hasScrollClass = true
  @HostBinding('class.VERTICAL') isVertical = false
  @HostBinding('class.HORIZONTAL') isHorizontal = false
  @HostBinding('class.hide-scrollbar') hideScrollBar = false

  private currentlyRendered = '[]'
  private hasRunAfterInit = false
  
  public isList = false
  public isGrid = false

  constructor(element: ElementRef, ngZone: NgZone) {
    super(element, ngZone)
  }

  ngOnInit() {
    super.ngOnInit()
    this.dataSource = this.dataSource || []
    this.scrollEndThreshold = this.scrollEndThreshold || 100
    this.direction = this.direction || 'VERTICAL'
    this.isHorizontal = this.direction === 'HORIZONTAL'
    this.isList = this.type === 'LIST'
    this.isGrid = this.type === 'GRID'
    this.spanCount = this.spanCount || this.numColumns
  }

  ngAfterViewInit() {
    super.ngAfterViewInit()
    if (Array.isArray(this.dataSource) && this.dataSource.length) this.renderDataSource()
    this.runOnScrollEndIfNotScrollable()
    this.hasRunAfterInit = true
  }

  getColumnsQuantityStyle() {
    return this.spanCount && `repeat(${this.spanCount}, 1fr)`
  }

  getClassForType() {
    return `beagle-${this.isGrid ? 'grid' : 'list'}-view ${this.direction}`
  }

  getSpanCountQuantityStyle() {
    return this.spanCount && `repeat(${this.spanCount}, 1fr)`
  }

  getStyleForType() {
    return {
      [`grid-template-${this.isGrid && this.isHorizontal ? 'rows' : 'columns'}`]: 
        this.getSpanCountQuantityStyle(),
    }
  }

  getRowCount() {
    if (this.isList) {
      return this.isVertical ? this.dataSource.length : 1
    }
    if (this.isHorizontal) {
      return this.spanCount || 1
    }
    return this.spanCount && Math.ceil(this.dataSource.length / this.spanCount)
  }

  getColCount() {
    if (this.isList) {
      return this.isVertical ? 1 : this.dataSource.length
    }
    if (this.isHorizontal) {
      return this.spanCount && Math.ceil(this.dataSource.length / this.spanCount)
    }

    return this.spanCount || 1
  }

  getIteratorName() {
    return this.iteratorName || 'item'
  }

  renderDataSource() {
    if (!this.getViewContentManager) {
      this.getViewContentManager = this.parentReference.getViewContentManager
    }
    if (!Array.isArray(this.dataSource)) return

    const viewContentManager = this.getViewContentManager()
    const element = viewContentManager.getElement()
    if (!element) return logger.error('The beagle:listView element was not found.')

    const templatesRaw: DynamicListInterface['templates'] = element.templates
    const hasTemplate = this.template || 
      (templatesRaw && Array.isArray(templatesRaw) && templatesRaw.length)
    if (!hasTemplate) {
      return logger.error('The beagle:listView requires a template or multiple templates to be rendered!')
    }

    const componentTag = element._beagleComponent_.toLowerCase()
    const templateItems = [
      ...templatesRaw || [], 
      ...(this.template ? [{ view: this.template }] : []),
    ] as TemplateManagerItem[]
    const defaultTemplate = templateItems.find(t => t.case === undefined)
    const manageableTemplates = templateItems.filter(t => t.case) || []
    const suffix = this.__suffix__ || ''
    const renderer = viewContentManager.getView().getRenderer()
    const manager: TemplateManager = {
      default: defaultTemplate && defaultTemplate.view,
      templates: manageableTemplates,
    }
    const componentManager = (component: IdentifiableBeagleUIElement, index: number) => {
      const iterationKey = this.key && this.dataSource[index][this.key] 
        ? this.dataSource[index][this.key] 
        : index
      const baseId = component.id ? `${component.id}${suffix}` : `${element.id}:${index}`
      const hasSuffix = ['beagle:listview', 'beagle:gridview'].includes(componentTag)
      return {
        ...component,
        id: `${baseId}:${iterationKey}`,
        key: this.getIteratorName(),
        ...(hasSuffix ? { __suffix__: `${suffix}:${iterationKey}` } : {}),
      }
    }
    const contexts: DataContext[][] = this.dataSource
      .map(item => [{ id: this.getIteratorName(), value: item }])
    
    this.currentlyRendered = JSON.stringify(this.dataSource)
    
    renderer.doTemplateRender(manager, element.id, contexts, componentManager)

    /* If the dataSource comes from a context, it might be initially empty, so the closes
    scroll is one, when the data actually comes, the closes scroll may change, so to guarantee
    the scroll will work as expected, we call `verifyChangedParent` every time the dataSource
    is changed */
    this.verifyChangedParent()
    this.allowOnScrollEnd()
  }

  ngOnChanges() {
    const changedElement = this.element.nativeElement.nodeName
    if (!this.hasRunAfterInit || !Array.isArray(this.dataSource)) return
    const dataSourceStr = JSON.stringify(this.dataSource)
    if (dataSourceStr === this.currentlyRendered) return
    if (changedElement !== 'BEAGLE-DYNAMIC-LIST') return
    this.renderDataSource()
    this.runOnScrollEndIfNotScrollable()
  }
}
