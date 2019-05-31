import { IUtils } from '@date-io/core/IUtils';
import * as React from 'react';
import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { WithUtilsProps } from './WithUtils';
export interface BasePickerRenderArgs {
    utils: IUtils<MaterialUiPickersDate>;
    date: MaterialUiPickersDate;
    isAccepted: boolean;
    handleClear: () => void;
    handleAccept: () => void;
    handleSetTodayDate: () => void;
    handleDismiss: () => void;
    changeDate: (date: MaterialUiPickersDate, callback?: any) => void;
    handleChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    handleTextFieldChange: (date: MaterialUiPickersDate | null) => void;
    handleAcceptedChange: (isAccepted: boolean, callback?: any) => void;
    pick12hOr24hFormat: (default12hFormat: string, default24hFormat: string) => string;
}
export interface BasePickerProps {
    /** Picker value */
    value: DateType;
    /** onChange callback */
    onChange: (date: MaterialUiPickersDate) => void;
    /** Auto accept date on selection */
    autoOk?: boolean;
    /** Control 12h or 24h view mode for clock */
    ampm?: boolean;
    /** Format string */
    format?: string;
    /** Dynamic formatter of text field label */
    labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
    /** Do not open picker on enter keypress */
    disableOpenOnEnter?: boolean;
    /** Date that will be initially highlighted */
    initialFocusedDate?: DateType;
    forwardedRef?: any;
}
export interface OuterBasePickerProps extends BasePickerProps, WithUtilsProps {
    children: (options: BasePickerRenderArgs) => React.ReactNode;
}
export declare class BasePicker extends React.Component<OuterBasePickerProps & WithUtilsProps> {
    state: {
        date: any;
        isAccepted: boolean;
    };
    componentDidUpdate(prevProps: OuterBasePickerProps): void;
    changeDate: (date: any, callback?: any) => void;
    handleAcceptedChange: (isAccepted: boolean, callback?: any) => void;
    handleClear: () => void;
    handleAccept: () => void;
    handleSetTodayDate: () => void;
    handleTextFieldChange: (date: any) => void;
    pick12hOr24hFormat: (default12hFormat: string, default24hFormat: string) => string;
    handleChange: (newDate: any, isFinish?: boolean) => void;
    handleDismiss: () => void;
    render(): React.ReactNode;
}
declare const _default: React.StatelessComponent<Pick<OuterBasePickerProps & WithUtilsProps, "children" | "value" | "onChange" | "format" | "autoOk" | "ampm" | "labelFunc" | "disableOpenOnEnter" | "initialFocusedDate" | "forwardedRef">>;
export default _default;
