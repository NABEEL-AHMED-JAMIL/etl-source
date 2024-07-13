const typeCache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
    if (typeCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unique`);
    }
    typeCache[<string>label] = true;
    return <T>label;
}

// actions
export * from './actions/appuser.action';
export * from './actions/authentication.action';
export * from './actions/common.action';
export * from './actions/credential.action';
export * from './actions/dashboard.action';
export * from './actions/enable-visibility.action';
export * from './actions/evariable.action';
export * from './actions/eventbridge.action';
export * from './actions/form.setting.action';
export * from './actions/lookup.action';
export * from './actions/notification.action';
export * from './actions/play.ground.action';
export * from './actions/refresh.token.action';
export * from './actions/report.setting.action';
export * from './actions/rpp.service.action';
export * from './actions/setting.action';
export * from './actions/source.job.action';
export * from './actions/source.task.action';
export * from './actions/templatereg.action';

// effects
export * from './effects/appuser.effect';
export * from './effects/authentication.effect';
export * from './effects/common.effect';
export * from './effects/credential.effect';
export * from './effects/dashboard.effect';
export * from './effects/enable-visibility.effect';
export * from './effects/evariable.service.effect';
export * from './effects/event bridge.effect';
export * from './effects/form.setting.effect';
export * from './effects/lookup.service.effect';
export * from './effects/notification.effect';
export * from './effects/play-ground.effect';
export * from './effects/refresh.token.effect';
export * from './effects/report.setting.effect';
export * from './effects/rpp.service.effect';
export * from './effects/setting.effect';
export * from './effects/source.job.effect';
export * from './effects/source.task.effect';
export * from './effects/templatereg.effect';

// reducers
// export * from './reducers/appuser.reducer';
// export * from './reducers/authentication.reducer';
// export * from './reducers/common.reducer';
// export * from './reducers/credential.reducer';
// export * from './reducers/dashboard.reducer';
// export * from './reducers/enable-visibility.reducer';
// export * from './reducers/evariable.reducer';
// export * from './reducers/event bridge.reducer';
// export * from './reducers/form.setting.reducer';
// export * from './reducers/lookup.reducer';
// export * from './reducers/notification.reducer';
// export * from './reducers/play-ground.reducer';
// export * from './reducers/refresh.token.reducer';
// export * from './reducers/report.setting.reducer';
// export * from './reducers/rpp.reducer';
// export * from './reducers/setting.reducer';
// export * from './reducers/source.job.reducer';
// export * from './reducers/source.task.reducer';
// export * from './reducers/templatereg.reducer';

// selectors
// export * from './selectors/appuser.selector';
// export * from './selectors/authentication.selector';
// export * from './selectors/common.selector';
// export * from './selectors/credential.selector';
// export * from './selectors/dashboard.selector';
// export * from './selectors/enable-visibility.selector';
// export * from './selectors/evariable.selector';
// export * from './selectors/event bridge.selector';
// export * from './selectors/form.setting.selector';
// export * from './selectors/lookup.selector';
// export * from './selectors/notification.selector';
// export * from './selectors/play-ground.selector';
// export * from './selectors/refresh.token.selector';
// export * from './selectors/report.setting.selector';
// export * from './selectors/rpp.selector';
// export * from './selectors/setting.selector';
// export * from './selectors/source.job.selector';
// export * from './selectors/source.task.selector';
// export * from './selectors/templatereg.selector';