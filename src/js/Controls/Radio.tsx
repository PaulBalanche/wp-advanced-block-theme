import { RadioControl } from "@wordpress/components";

export function Radio({id, label, options, value, onChange}) {

    if( typeof options == "undefined" || options == null) return null;

    return (
        <div
            key={id + "-RadioControlComponentsBaseControl"}
            className="components-base-control"
        >
            <div
                key={id + "-RadioControlComponentsBaseControlField"}
                className="components-base-control__field"
            >
                <div
                    key={id + "-RadioControlContainer"}
                    className="radio-control-container"
                >
                    <RadioControl
                        key={id}
                        label={label}
                        selected={value}
                        options={options.map(function (value) {
                            return { label: value.name, value: value.value.toString() };
                        })}
                        onChange={(newValue) => onChange(newValue) }
                    />
                </div>
            </div>
        </div>
    );
}
