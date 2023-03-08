import { Icon } from "@wordpress/components";
import { Component, createRef } from "@wordpress/element";

export class DropDown extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            isListOpen: false,
            headerTitle: this.props.headerTitle,
        };

        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    toggle = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            isListOpen: !prevState.isListOpen,
        }));
    };

    close = () => {
        this.setState({
            isListOpen: false,
        });
    };

    handleClick(style, e) {
        this.props.onToggle(style);
    }

    componentDidMount() {
        this.wrapperRef = createRef();
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (
            this?.wrapperRef?.current &&
            !this.wrapperRef.current.contains(event.target)
        ) {
            this.close();
        }
    }

    renderListItems() {
        let listItems = [];

        this.props.items.forEach((item) => {
            if (item.children) {
                let childrenItems = [];
                item.children.forEach((child) => {
                    childrenItems.push(
                        <div
                            key={this.props.id + "item-" + child.style}
                            className="wpe-dropdown-list-item"
                            onMouseDown={(e) =>
                                this.handleClick(child.style, e)
                            }
                        >
                            <div
                                className="wpe-dropdown-list-item-inner"
                                style={child.buttonStyle}
                            >
                                {child.label}
                            </div>
                        </div>
                    );
                });

                listItems.push(
                    <div
                        key={this.props.id + "item-" + item.style}
                        className="wpe-dropdown-list-item-parent"
                    >
                        <div className="wpe-dropdown-list-item-cat">
                            {item.label}
                        </div>
                        <div className="wpe-dropdown-list-item-children-list">
                            {childrenItems}
                        </div>
                    </div>
                );
            } else {
                listItems.push(
                    <div
                        key={this.props.id + "item-" + item.style}
                        className="wpe-dropdown-list-item"
                        onMouseDown={(e) => this.handleClick(item.style, e)}
                    >
                        <div
                            className="wpe-dropdown-list-item-inner"
                            style={item.buttonStyle}
                        >
                            {item.label}
                        </div>
                    </div>
                );
            }
        });

        return listItems;
    }

    render() {
        return (
            <div
                id={"dropdown-" + this.props.id}
                className="wpe-dropdown-container"
            >
                {/* <div className="wpe-dropdown-label label label-background">{this.props.label}</div> */}
                <div
                    ref={this.wrapperRef}
                    key={this.props.id}
                    className="wpe-dropdown-wrapper"
                >
                    <div
                        className="wpe-dropdown-header"
                        onMouseDown={this.toggle}
                    >
                        <div className="wpe-dropdown-header-title">
                            {this.state.headerTitle}
                        </div>
                        {this.state.isListOpen ? (
                            <Icon icon="arrow-up" />
                        ) : (
                            <Icon icon="arrow-down" />
                        )}
                    </div>
                    {this.state.isListOpen && (
                        <div
                            key={this.props.id + "items"}
                            className="wpe-dropdown-list"
                        >
                            {this.renderListItems()}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
