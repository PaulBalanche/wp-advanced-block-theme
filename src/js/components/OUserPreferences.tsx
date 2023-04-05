import { Component } from "@wordpress/element";

import { CheckboxControl, ToggleControl } from "@wordpress/components";

export default class OUserPreferences extends Component {
    static _instance;
    static getInstance() {
        return this._instance;
    }

    constructor(props) {
        super(props);

        this.state = {
            alertUpdateAttributes: true,
            alertReusableBlock: true,
        };

        // @ts-ignore
        this.constructor._instance = this;
    }

    componentDidMount() {
        this._initUserPreference();
    }

    _initUserPreference() {
        const storage = localStorage.getItem(
            "ABT_PREFERENCES_USER_" + js_const.user_id
        );
        if (storage) {
            let jsonStorage = JSON.parse(storage);
            if (typeof jsonStorage == "object") {
                for (var i in this.state) {
                    if (typeof jsonStorage[i] != "undefined") {
                        this.setState({ [i]: jsonStorage[i] });
                    }
                }
            }
        }
    }

    getUserPreferences(preference) {
        return typeof this.state[preference] != "undefined"
            ? this.state[preference]
            : null;
    }

    updateUserPreferences(preference, value = null) {
        const currentState = this.state;
        const newValue = value != null ? value : !currentState[preference];
        this.setState({ [preference]: newValue });
        currentState[preference] = newValue;

        localStorage.setItem(
            "ABT_PREFERENCES_USER_" + js_const.user_id,
            JSON.stringify(currentState)
        );
    }

    render() {
        const render = [];

        if (
            typeof this.props.preference != "undefined" &&
            typeof this.props.context != "undefined"
        ) {
            switch (this.props.context) {
                case "toggle":
                    render.push(
                        <ToggleControl
                            label={
                                typeof this.props.label != "undefined"
                                    ? this.props.label
                                    : this.props.preference
                            }
                            checked={this.getUserPreferences(
                                this.props.preference
                            )}
                            onChange={() =>
                                this.updateUserPreferences(
                                    this.props.preference
                                )
                            }
                        />
                    );
                    break;

                case "checkbox":
                    render.push(
                        <CheckboxControl
                            label={
                                typeof this.props.label != "undefined"
                                    ? this.props.label
                                    : this.props.preference
                            }
                            checked={
                                !this.getUserPreferences(this.props.preference)
                            }
                            onChange={() =>
                                this.updateUserPreferences(
                                    this.props.preference
                                )
                            }
                        />
                    );
                    break;
            }
        }

        return render;
    }
}
