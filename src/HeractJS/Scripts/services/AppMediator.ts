﻿import { createStore } from 'redux'
import {ChartData} from './ChartData';

export class AppMediator {
    private static subscribers: Object;
    private static instance: any;
    private static store: any;

    private static timelineWeek: Object[];
    private static timelineMonth: Object[];
    private static timelineDay: Object[];
    private static timelineYear: Object[];

    private reduser(state: any, action: any) {
        let newState = state
        switch (action.type) {
            case 'reset':
                newState.items = action.data
                break

            case 'createTask': //todo check if already exist
                action.data = 'item'
                newState.items.push({
                    id: `bar${newState.items.length + 1}`,
                    barClass: '',
                    type: 'bar',
                    progress: 25,
                    duration: 80,
                    name: `Task ${newState.items.length + 1}`,
                    description: `Description for ${newState.items.length + 1}`,
                    startDate: 50 * newState.items.length,
                    position: 22 * newState.items.length
                })
                break

            case 'removeTask':
                let element: any
                let elementIndex: number
                if (newState.items.length > 0) {
                    element = newState.items.find((element: any, index: number) => {
                        if (element.id === newState.selectedTasks[0]) {
                            return index
                        }
                    })
                    elementIndex = newState.items.indexOf(element)
                    if (element) {
                        action.data = elementIndex
                        newState.items.splice(elementIndex, 1);
                    }
                }
                break

            case 'editTask':
                newState.items[action.data.index].name = action.data.value//todo check if exist
                break
            case 'indent':
                newState.ganttChartView.indentTask(action.data)
                break
            case 'link':
                newState.ganttChartView.linkTask(action.data)
                break

            case 'outindent':
                newState.ganttChartView.outindentTask(action.data)
                break

            case 'unlink':
                newState.ganttChartView.unlinkTask(action.data)
                break

            case 'autoSchedule':
                break

            case 'startDragging':
                newState.isDragging = true
                break

            case 'stopDragging':
                newState.isDragging = false
                break

            case 'updateTimelineStep':
                return newState.timelineStep = action.data
            case 'setGanttChartView':
                newState.ganttChartView = action.data
                break

            case 'setDropTarget':
                newState.dropTarget = action.data
                break

            case 'setTempline':
                newState.templine = action.data
                break

            case 'setDraggingElement':
                newState.draggingElement = action.data
                break

            case 'removeTempline':
                newState.templine = null
                break

            case 'setTimelineStep':
                switch (newState.timelineStep) {
                    case 0:
                        newState.cellCapacity = 40 / 72
                        newState.timeLine = AppMediator.timelineMonth
                        break;
                    case 1:
                        newState.cellCapacity = 50 / 720
                        newState.timeLine = AppMediator.timelineYear
                        break;
                    case 2:
                        newState.cellCapacity = 50 / 3
                        newState.timeLine = AppMediator.timelineDay
                        break;
                    case 3:
                        newState.cellCapacity = 60 / 24
                        newState.timeLine = AppMediator.timelineWeek
                        break;
                    default:
                        newState.cellCapacity = 40 / 72
                        newState.timeLine = AppMediator.timelineWeek
                }
                newState.timelineStep = action.data
                newState.ganttChartView.forceUpdate()
                break

            case 'selectTask':
                newState.selectedTasks.push(action.data)
                break

            case 'addTaskToSelected':
                if (newState.selectedTask) {
                    newState.selectedTasks.push(newState.selectedTask)
                    newState.selectedTask = null
                }
                newState.selectedTasks.push(action.data)//todo check if exist
                break

            case 'deselectAllTasks':
                if (newState.selectedTasks && newState.selectedTasks.length) {
                    action.data = newState.selectedTasks
                    newState.selectedTasks = []
                }
                break

            case 'deselectTask':
                let selectedTasks = newState.selectedTasks
                if (selectedTasks.length > 0) {
                    let elementIndex = selectedTasks.find((element: any, index: number) => {
                        if (element.state.id === action.data.state.id) {
                            return index
                        }
                    })
                    if (elementIndex) {
                        newState.selectedTasks.splice(elementIndex, 1);
                    }
                } else {
                    newState.selectedTask = null
                }
                break

            case 'scrollGrid':
                newState.scrollPosition = action.data
                break

            case 'removeDraggingElement':
                newState.draggingElement = null
                break

            case 'removeDropTarget':
                newState.dropTarget = null
                break
                
            default:
                return state
        }
        if (action.data !== undefined) {
            newState.history.push({
                type: action.type,
                data: action.data
            })
        }

        return newState
    }

    private initialState = {
        items: ChartData.ganttBars,
        timeLine: ChartData.timelineWeek,

        isDragging: false,
        isLinking: false,
        isCurrentlySizing: false,

        isLineDrawStarted: false,

        timelineStep: 0,
        scrollPosition: 0,

        svgGridWidth: 50,
        ganttChartView: null,
        cellCapacity: 50 / 24,

        dropTarget: null,
        draggingElement: null,
        selectedTaskIndex: null,
        selectedTasks: [],
        history: [],
        tempLine: null
    }

    constructor() {
        new ChartData()
        AppMediator.timelineWeek = ChartData.timelineWeek
        AppMediator.timelineMonth = ChartData.timelineMonth
        AppMediator.timelineDay = ChartData.timelineDay
        AppMediator.timelineYear = ChartData.timelineYear
        AppMediator.subscribers = {}
        AppMediator.store = createStore(this.reduser, this.initialState)
    }

    reset() {
        AppMediator.subscribers = {};
    }

    public static getInstance(): AppMediator {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new AppMediator();
        }
        return this.instance;
    }

    public unsubscribe(subscriber) {
        delete AppMediator.subscribers[subscriber];
    }

    public getState() {
        return AppMediator.store.getState()
    }

    public getLastChange() {
        let history = AppMediator.store.getState().history
        if (history) {
            let length = history.length
            return history[length - 1]
        }
        return null
    }

    public dispatch(config) {
        return AppMediator.store.dispatch(config)
    }

    public subscribe(callback: Function) {
        AppMediator.store.subscribe(callback)//.subscribers[subscriber] = callback;
    }

    private static notifySubscribers(eventType: any, currentState: any, state: any) {
        for (let subscriber in this.subscribers) {
            this.subscribers[subscriber].call(this, eventType, currentState, state);
        }
    }

    public undo() {
        return AppMediator.store.subscribe()
    }

    public redo() {
        return AppMediator.store.subscribe()
    }
}