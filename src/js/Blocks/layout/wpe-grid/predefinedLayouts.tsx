import { SVG } from "@wordpress/components";

export const predefinedLayouts = [
    {
        count: 2,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="490" height="400" />
                <rect x="510" width="490" height="400" />
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 2, width: 1, rowStart: 1, height: 1 },
        ],
    },
    {
        count: 2,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="327" height="400" />
                <rect x="346" width="654" height="400" />
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 2, width: 2, rowStart: 1, height: 1 },
        ],
    },
    {
        count: 2,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="654" height="400" />
                <rect x="673" width="327" height="400" />
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 2, rowStart: 1, height: 1 },
            { columnStart: 3, width: 1, rowStart: 1, height: 1 },
        ],
    },
    {
        count: 2,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="1000" height="190"></rect>
                <rect width="1000" height="190" y="210"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 1, width: 1, rowStart: 2, height: 1 },
        ],
    },
    {
        count: 3,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="320" height="400"></rect>
                <rect x="340" width="320" height="400"></rect>1
                <rect x="680" width="320" height="400"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 2, width: 1, rowStart: 1, height: 1 },
            { columnStart: 3, width: 1, rowStart: 1, height: 1 },
        ],
    },
    {
        count: 3,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="490" height="190" />
                <rect x="510" width="490" height="190" />
                <rect width="1000" height="190" y="210"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 2, width: 1, rowStart: 1, height: 1 },
            { columnStart: 1, width: 2, rowStart: 2, height: 1 },
        ],
    },
    {
        count: 3,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="1000" height="190" />
                <rect width="490" height="190" y="210" />
                <rect width="490" x="510" height="190" y="210" />
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 2, rowStart: 1, height: 1 },
            { columnStart: 1, width: 1, rowStart: 2, height: 1 },
            { columnStart: 2, width: 1, rowStart: 2, height: 1 },
        ],
    },
    {
        count: 3,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="1000" height="120"></rect>
                <rect width="1000" height="120" y="140"></rect>
                <rect width="1000" height="120" y="280"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 1, width: 1, rowStart: 2, height: 1 },
            { columnStart: 1, width: 1, rowStart: 3, height: 1 },
        ],
    },
    {
        count: 4,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="235" height="400"></rect>
                <rect x="255" width="235" height="400"></rect>
                <rect x="510" width="235" height="400"></rect>
                <rect x="765" width="235" height="400"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 2, width: 1, rowStart: 1, height: 1 },
            { columnStart: 3, width: 1, rowStart: 1, height: 1 },
            { columnStart: 4, width: 1, rowStart: 1, height: 1 },
        ],
    },
    {
        count: 4,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="490" height="190"></rect>
                <rect x="510" width="490" height="190"></rect>
                <rect y="210" width="490" height="190"></rect>
                <rect x="510" y="210" width="490" height="190"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 2, width: 1, rowStart: 1, height: 1 },
            { columnStart: 1, width: 1, rowStart: 2, height: 1 },
            { columnStart: 2, width: 1, rowStart: 2, height: 1 },
        ],
    },
    {
        count: 4,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="1000" height="85"></rect>
                <rect width="1000" height="85" y="105"></rect>
                <rect width="1000" height="85" y="210"></rect>
                <rect width="1000" height="85" y="315"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 1, width: 1, rowStart: 2, height: 1 },
            { columnStart: 1, width: 1, rowStart: 3, height: 1 },
            { columnStart: 1, width: 1, rowStart: 4, height: 1 },
        ],
    },
    {
        count: 5,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="184" height="400"></rect>
                <rect width="184" height="400" x="204"></rect>
                <rect width="184" height="400" x="408"></rect>
                <rect width="184" height="400" x="612"></rect>
                <rect width="184" height="400" x="816"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 2, width: 1, rowStart: 1, height: 1 },
            { columnStart: 3, width: 1, rowStart: 1, height: 1 },
            { columnStart: 4, width: 1, rowStart: 1, height: 1 },
            { columnStart: 5, width: 1, rowStart: 1, height: 1 },
        ],
    },
    {
        count: 5,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="490" height="190"></rect>
                <rect width="490" height="190" x="510"></rect>
                <rect width="320" height="190" y="210"></rect>
                <rect width="320" height="190" x="340" y="210"></rect>
                <rect width="320" height="190" x="680" y="210"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 3, rowStart: 1, height: 1 },
            { columnStart: 4, width: 3, rowStart: 1, height: 1 },
            { columnStart: 1, width: 2, rowStart: 2, height: 1 },
            { columnStart: 3, width: 2, rowStart: 2, height: 1 },
            { columnStart: 5, width: 2, rowStart: 2, height: 1 },
        ],
    },
    {
        count: 5,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="320" height="190"></rect>
                <rect width="320" height="190" x="340"></rect>
                <rect width="320" height="190" x="680"></rect>
                <rect width="490" height="190" y="210"></rect>
                <rect width="490" height="190" x="510" y="210"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 2, rowStart: 1, height: 1 },
            { columnStart: 3, width: 2, rowStart: 1, height: 1 },
            { columnStart: 5, width: 2, rowStart: 1, height: 1 },
            { columnStart: 1, width: 3, rowStart: 2, height: 1 },
            { columnStart: 4, width: 3, rowStart: 2, height: 1 },
        ],
    },
    {
        count: 5,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="1000" height="64"></rect>
                <rect width="1000" height="64" y="84"></rect>
                <rect width="1000" height="64" y="168"></rect>
                <rect width="1000" height="64" y="252"></rect>
                <rect width="1000" height="64" y="336"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 1, width: 1, rowStart: 2, height: 1 },
            { columnStart: 1, width: 1, rowStart: 3, height: 1 },
            { columnStart: 1, width: 1, rowStart: 4, height: 1 },
            { columnStart: 1, width: 1, rowStart: 5, height: 1 },
        ],
    },
    {
        count: 6,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="150" height="400"></rect>
                <rect x="170" width="150" height="400"></rect>
                <rect x="340" width="150" height="400"></rect>
                <rect x="510" width="150" height="400"></rect>
                <rect x="680" width="150" height="400"></rect>
                <rect x="850" width="150" height="400"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 2, width: 1, rowStart: 1, height: 1 },
            { columnStart: 3, width: 1, rowStart: 1, height: 1 },
            { columnStart: 4, width: 1, rowStart: 1, height: 1 },
            { columnStart: 5, width: 1, rowStart: 1, height: 1 },
            { columnStart: 6, width: 1, rowStart: 1, height: 1 },
        ],
    },
    {
        count: 6,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="320" height="190"></rect>
                <rect x="340" width="320" height="190"></rect>
                <rect x="680" width="320" height="190"></rect>
                <rect y="210" width="320" height="190"></rect>
                <rect x="340" y="210" width="320" height="190"></rect>
                <rect x="680" y="210" width="320" height="190"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 2, width: 1, rowStart: 1, height: 1 },
            { columnStart: 3, width: 1, rowStart: 1, height: 1 },
            { columnStart: 1, width: 1, rowStart: 2, height: 1 },
            { columnStart: 2, width: 1, rowStart: 2, height: 1 },
            { columnStart: 3, width: 1, rowStart: 2, height: 1 },
        ],
    },
    {
        count: 6,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="490" height="120"></rect>
                <rect x="510" width="490" height="120"></rect>
                <rect y="140" width="490" height="120"></rect>
                <rect x="510" y="140" width="490" height="120"></rect>
                <rect y="280" width="490" height="120"></rect>
                <rect x="510" y="280" width="490" height="120"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 2, width: 1, rowStart: 1, height: 1 },
            { columnStart: 1, width: 1, rowStart: 2, height: 1 },
            { columnStart: 2, width: 1, rowStart: 2, height: 1 },
            { columnStart: 1, width: 1, rowStart: 3, height: 1 },
            { columnStart: 2, width: 1, rowStart: 3, height: 1 },
        ],
    },
    {
        count: 6,
        icon: (
            <SVG
                width="1000"
                height="400"
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/SVG"
            >
                <rect width="1000" height="50"></rect>
                <rect y="70" width="1000" height="50"></rect>
                <rect y="140" width="1000" height="50"></rect>
                <rect y="210" width="1000" height="50"></rect>
                <rect y="280" width="1000" height="50"></rect>
                <rect y="350" width="1000" height="50"></rect>
            </SVG>
        ),
        layout: [
            { columnStart: 1, width: 1, rowStart: 1, height: 1 },
            { columnStart: 1, width: 1, rowStart: 2, height: 1 },
            { columnStart: 1, width: 1, rowStart: 3, height: 1 },
            { columnStart: 1, width: 1, rowStart: 4, height: 1 },
            { columnStart: 1, width: 1, rowStart: 5, height: 1 },
            { columnStart: 1, width: 1, rowStart: 6, height: 1 },
        ],
    },
];
