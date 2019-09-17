import { GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType, ExecutionRequestInfo } from "node-structure";
export const booleanInput: GraphNodeDefinition = {
    definition: {
        name: "Boolean",
        type: GraphNodeType.Input,
        inputs: [],
        outputs: [
            {
                name: "value",
                type: GraphDataTypes.Boolean
            }
        ],
        internals: [
            {
                name: "value",
                picker: {
                    type: PickerType.Dropdown,
                    options: [
                        {
                            name: "true",
                            value: true
                        },
                        {
                            name: "false",
                            value: false
                        },
                    ]
                }
            }
        ]
    },
    implementation: {
        execute(info) {
            return info.internals[0].value;
        }
    }
};