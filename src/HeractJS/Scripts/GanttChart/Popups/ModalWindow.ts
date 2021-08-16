import * as React from 'react';
import * as DOM from 'react-dom';
import {AppMediator} from '../../../scripts/services/ApplicationMediator';

const GCMediator: any = AppMediator.getInstance();

export class ModalWindow extends React.Component<any, any> {
    public componentWillMount() {
        this.state = {
            title: 'title',
            startDate: 'Placeholder',
            endDate: 'Placeholder',
            duration: 'Placeholder',
            description: 'description',
            hidden: true
        };
        GCMediator.subscribe(function () {
            const change = GCMediator.getLastChange();
            if (change) {
                switch (change.type) {
                    case 'showModalWindow':
                        this.show(change.data);
                        break;
                    case 'hideModalWindow':
                    case 'hideAllPopups':
                        this.hide();
                        break;
                    default:
                        break;
                }
            }
        }.bind(this));
    }

    public hide() {
        this.setState({
            hidden: false
        });
    }

    public show(data) {
        this.setState({
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            duration: data.duration,
            description: data.description,
            hidden: true
        });
    }

    public render() {
        return React.createElement('div', {
            id: 'modalWindowWrapper',
            className: 'modalWindowWrapper' + this.state.hidden ? '' : 'hidden',
        } as React.DOMAttributes<Element>,
            React.createElement('div', {
                id: 'modalWindow',
                className: 'modalWindow'
            } as React.DOMAttributes<Element>,
                React.createElement('div', {
                    id: 'modalWindowTitle',
                    className: 'modalWindowTitle'
                } as React.DOMAttributes<Element>,
                    React.createElement('input', {
                        type: 'text',
                        className: 'infoPopupTitle',
                        onChange: null,
                        defaultValue: this.state.title
                    } as React.DOMAttributes<Element>)
                ),
                React.createElement('div', {
                    id: 'modalWindowBody',
                    className: 'modalWindowBody'
                } as React.DOMAttributes<Element>,
                    React.createElement('input', {
                        type: 'text',
                        className: 'infoPopupDescription',
                        onChange: null,
                        defaultValue: this.state.description
                    } as React.DOMAttributes<Element>),
                    React.createElement('span', {
                        className: 'GCInputLabel'
                    } as React.DOMAttributes<Element>, 'Task start: '),
                    React.createElement('input', {
                        id: 'modalWindowInputStart',
                        type: 'datetime-local',
                        className: 'modalWindowInput',
                        onChange: null,
                        defaultValue: this.state.startDate
                    } as React.DOMAttributes<Element>),
                    React.createElement('span', {
                        className: 'GCInputLabel'
                    } as React.DOMAttributes<Element>, 'Task finish: '),
                    React.createElement('input', {
                        id: 'modalWindowInputFinish',
                        type: 'datetime-local',
                        className: 'modalWindowInput',
                        onChange: null,
                        defaultValue: this.state.completeDate
                    } as React.DOMAttributes<Element>),
                    React.createElement('span', {
                        className: 'GCInputLabel'
                    } as React.DOMAttributes<Element>, 'Task duration: '),
                    React.createElement('input', {
                        id: 'modalWindowInputDuration',
                        type: 'datetime-local',
                        className: 'modalWindowInput',
                        onChange: null,
                        defaultValue: this.state.completeDate
                    } as React.DOMAttributes<Element>)
                ),
                React.createElement('div', {
                    id: 'modalWindowButtons',
                    className: 'modalWindowButtons'
                } as React.DOMAttributes<Element>,
                    React.createElement('button', {
                        onMouseDown: this.hide.bind(this),
                        id: 'modalWindowButtonOk',
                        type: 'datetime-local',
                        className: 'modalWindowButtonOk'
                    } as React.DOMAttributes<Element>, 'Ok'),
                    React.createElement('button', {
                        onMouseDown: this.hide.bind(this),
                        id: 'modalWindowButtonCancel',
                        type: 'datetime-local',
                        className: 'modalWindowButtonCancel'
                    } as React.DOMAttributes<Element>, 'Cancel')
                )
            )
        );
    }
};
