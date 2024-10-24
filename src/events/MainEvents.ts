export const WindowEvent = Object.freeze({
    Resize: 'WindowEventResize',
    FocusChange: 'WindowEventFocusChange',
});

export const MainGameEvents = Object.freeze({
    Resize: 'MainGameEventsResize',
    MainViewReady: 'MainGameEventsMainViewReady',
});

export const BoardEvents = Object.freeze({
    //
});

export const TakeMe = Object.freeze({
    ToStore: 'TakeMeToStore',
});

export const PhoneViewEvents = Object.freeze({
    ChoiceClick: 'PhoneViewEventsChoiceClick',
    ClickAnimationComplete: 'PhoneViewEventsClickAnimationComplete',
});

export const BoardViewEvents = Object.freeze({
    PreActionsComplete: 'BoardViewEventsPreActionsComplete',
    Wave1ActionsComplete: 'BoardViewEventsWave1ActionsComplete',
    Wave2ActionsComplete: 'BoardViewEventsWave2ActionsComplete',
    Wave3ActionsComplete: 'BoardViewEventsWave3ActionsComplete',
    Wave4ActionsComplete: 'BoardViewEventsWave4ActionsComplete',
    CarAnimationStart: 'BoardViewEventsCarAnimationStart',
    CarAnimationComplete: 'BoardViewEventsCarAnimationComplete',
    HouseAnimationStart: 'BoardViewEventsHouseAnimationStart',
    GirlAnimationComplete: 'BoardViewEventsGirlAnimationComplete',
});
