// create User context
export const UserPreferencesContext = React.createContext({
    preferences: { hideAlertReusableBlockMessage: false },
    update: () => {},
});
