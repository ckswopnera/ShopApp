import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

export const DialogBox_success = (e, f) => Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: e,
    textBody: f,
    button: 'close',
});
export const DialogBox_danger = (e, f) => Dialog.show({
    type: ALERT_TYPE.DANGER,
    title: e,
    textBody: f,
    button: 'close',


});
export const DialogBox_warning = (e, f) => Dialog.show({
    type: ALERT_TYPE.WARNING,
    title: e,
    textBody: f,
    button: 'close',


});

export const ToastBox_warning = (e, f) => Toast.show({
    type: ALERT_TYPE.WARNING,
    title: e,
    textBody: f,
});
export const ToastBox_danger = (e, f) => Toast.show({
    type: ALERT_TYPE.DANGER,
    title: e,
    textBody: f,


});
export const ToastBox_success = (e, f) => Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: e,
    textBody: f,


});
export const DialogBox_warning_body = (e, f, g) => Dialog.show({
    type: ALERT_TYPE.WARNING,
    title: e,
    textBody: f,
    button: 'ok',

    // onPressButton: () => g(),
});


