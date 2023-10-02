import { Icon } from '@wordpress/components';
import { Component, createRef, useEffect, useState } from '@wordpress/element';

export function DropDown(props) {
    const [isListOpen, setIsListOpen] = useState(false);

    let wrapperRef = null;

    useEffect(() => {
        wrapperRef = createRef();
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClickOutside = _handleClickOutside.bind(this);
    const toggle = (e) => {
        e.preventDefault();
        setIsListOpen(!prevState.isListOpen);
    };
    const close = () => {
        setIsListOpen(false);
    };

    function handleClick(style, e) {
        props.onToggle(style);
    }

    function _handleClickOutside(event) {
        if (wrapperRef?.current && !wrapperRef.current.contains(event.target)) {
            close();
        }
    }

    function renderListItems() {
        let listItems = [];

        props.items.forEach((item) => {
            if (item.children) {
                let childrenItems = [];
                item.children.forEach((child) => {
                    childrenItems.push(
                        <div
                            key={props.id + 'item-' + child.style}
                            className="wpe-dropdown-list-item"
                            onMouseDown={(e) => handleClick(child.style, e)}
                        >
                            <div
                                className="wpe-dropdown-list-item-inner"
                                style={child.buttonStyle}
                            >
                                {child.label}
                            </div>
                        </div>,
                    );
                });

                listItems.push(
                    <div
                        key={props.id + 'item-' + item.style}
                        className="wpe-dropdown-list-item-parent"
                    >
                        <div className="wpe-dropdown-list-item-cat">
                            {item.label}
                        </div>
                        <div className="wpe-dropdown-list-item-children-list">
                            {childrenItems}
                        </div>
                    </div>,
                );
            } else {
                listItems.push(
                    <div
                        key={props.id + 'item-' + item.style}
                        className="wpe-dropdown-list-item"
                        onMouseDown={(e) => handleClick(item.style, e)}
                    >
                        <div
                            className="wpe-dropdown-list-item-inner"
                            style={item.buttonStyle}
                        >
                            {item.label}
                        </div>
                    </div>,
                );
            }
        });

        return listItems;
    }

    return (
        <div id={'dropdown-' + props.id} className="wpe-dropdown-container">
            {/* <div className="wpe-dropdown-label label label-background">{props.label}</div> */}
            <div
                ref={wrapperRef}
                key={props.id}
                className="wpe-dropdown-wrapper"
            >
                <div className="wpe-dropdown-header" onMouseDown={toggle}>
                    <div className="wpe-dropdown-header-title">
                        {props.headerTitle}
                    </div>
                    {isListOpen ? (
                        <Icon icon="arrow-up" />
                    ) : (
                        <Icon icon="arrow-down" />
                    )}
                </div>
                {isListOpen && (
                    <div key={props.id + 'items'} className="wpe-dropdown-list">
                        {renderListItems()}
                    </div>
                )}
            </div>
        </div>
    );
}
