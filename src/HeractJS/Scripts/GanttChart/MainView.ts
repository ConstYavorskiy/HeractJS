﻿/// <reference path='../../typings/main.d.ts' />

import React = require('react')
import DOM = require('react-dom')

import {TaskBar} from './TaskBar';
import {TaskLink} from './TaskLink';
import {InfoPopup} from './InfoPopup';
import {ModalWindow} from './ModalWindow';
import {Timeline}  from './Timeline';
import {GanttChartMediator} from './GlobalStore';
import {ScrollBarMediator} from '../../scripts/services/ScrollBarMediator';

let GCMediator: GanttChartMediator = GanttChartMediator.getInstance();
let SBMediator: ScrollBarMediator = ScrollBarMediator.getInstance();

export class ChartView extends React.Component<any, any> {
    constructor() {
        super()
        SBMediator.onChanged('ganttChart', function (position: number) {
            this.updateScrollPosition(position)
        }.bind(this))
    }

    private componentWillMount() {
        this.setState({
            ganttBars: GCMediator.getState().items,
            timeLine: GCMediator.getState().timeLine,
            isCtrlPressed: false
        })
        this.updateGanttChart()
        document.onkeydown = function (event: MouseEvent) {
            if (event.ctrlKey) {
                this.setState({
                    isCtrlPressed: true
                })
            }
        }.bind(this)

        document.onwheel = function (event: any) {
            event.preventDefault()
            event.stopPropagation()
            if (this.state.isCtrlPressed) {
                this.updateTimeline()
            } else {
                const scrollPosition = Math.round(event.deltaY / 32) + GCMediator.getState().scrollPosition
                SBMediator.change(scrollPosition)
                GCMediator.dispatch({
                    type: 'updateScrollPosition',
                    scrollPosition: scrollPosition
                })
            }
        }.bind(this)
    }

    private shouldComponentUpdate(nextProps: any, nextState: any) {
        if (this.state.ganttBars !== nextState.ganttBars || this.state.timeLine !== nextState.timeLine) {
            return true
        } else {
            return false
        }
    }

    private updateScrollPosition(position: number) {
        GCMediator.dispatch({
            type: 'updateScrollPosition',
            scrollPosition: position
        })
        this.scrollChart(position)
    }

    private scrollChart(position: number) {
        const view: any = document.getElementById('ganttChart')
        view.scrollTop = 32 * position
    }

    public updateTimeline() {
        const currentState = GCMediator.getState()
        switch (GCMediator.getState().timelineStep) {
            case 0:
                GCMediator.dispatch({
                    type: 'setTimelineStep',
                    step: 1
                })
                break;
            case 1:
                GCMediator.dispatch({
                    type: 'setTimelineStep',
                    step: 2
                })
                break;
            case 2:
                GCMediator.dispatch({
                    type: 'setTimelineStep',
                    step: 3
                })
                break;
            case 3:
                GCMediator.dispatch({
                    type: 'setTimelineStep',
                    step: 0
                })
                break;
            default:
                this.state.timelineData = currentState.timelineDay
        }
    }

    public render() {
        const items = this.state.ganttBars.map(function (ganttBar: any) {
            if (ganttBar.type === 'bar') {
                return React.createElement(TaskBar, {
                    key: ganttBar.id,
                    data: ganttBar,
                    gridWidth: this.state.gridWidth
                })
            } else if (ganttBar.type === 'connection') {
                return React.createElement(TaskLink, {
                    ref: ganttBar.id,
                    key: ganttBar.id,
                    data: ganttBar
                })
            }
        }.bind(this))

        return React.createElement('div', {
            id: 'ganttChartContainer',
            className: 'ganttChartContainer'
        },
            React.createElement('svg', {
                className: 'ganttTimeline',
                id: 'ganttTimeline'
            },
                this.state.timeLine.map((timeLineItem: any) => {
                    return React.createElement(Timeline, {
                        key: timeLineItem.id,
                        data: timeLineItem
                    })
                })
            ),
            React.createElement('div', {
                id: 'ganttChart',
                className: 'ganttChart'
            },
                React.createElement(InfoPopup, {
                    ref: 'infoPopup'
                }),
                React.createElement(ModalWindow, {
                    ref: 'modalWindow'
                }),
                React.createElement('svg', {
                    className: 'ganttChartView',
                    id: 'ganttChartView',
                    transform: 'translate(0, 0)'
                }, React.createElement('marker', {
                    id: 'triangle',
                    viewBox: '0 0 20 20',
                    refX: 0,
                    refY: 5,
                    markerUnits: 'strokeWidth',
                    markerWidth: 4,
                    markerHeight: 3,
                    orient: 'auto'
                }, React.createElement('path', {
                    d: 'M 0 0 L 20 0 L 10 20 z'
                })),
                    React.createElement('pattern', {
                        id: 'grid',
                        width: GCMediator.getState().svgGridWidth,
                        height: 32,
                        patternUnits: 'userSpaceOnUse'
                    }, React.createElement('rect', {
                        width: GCMediator.getState().svgGridWidth,
                        height: 32,
                        fill: 'url(#smallGrid)',
                        stroke: '#dfe4e8',
                        strokeWidth: '1'
                    })
                    ),
                    React.createElement('rect', {
                        id: 'gridPattern',
                        width: '100%',
                        height: '100%',
                        fill: 'url(#grid)'
                    }),
                    //React.createElement('ReactCSSTransitionGroup', {
                    //    width: '1000px',
                    //    height: '1000px',
                    //    transitionName: "example",
                    //    transitionEnterTimeout: 500,
                    //    transitionLeaveTimeout: 500
                    //}, 
                    items
                    // )
                )
            )
        )
    }
};

export class Initializer {
    constructor() {
        const mainView = DOM.render(React.createElement(ChartView), document.getElementsByClassName('js-module-region-right')[0]) as any

        GCMediator.dispatch({
            type: 'setGanttChartView',
            view: mainView
        })

        GCMediator.subscribe(() => {
            mainView.updateGanttChart();
        })
    }
};

