import { NodeDataType } from "@openremote/model";

// TODO this should be defined in the back end

export class SocketTypeMatcher {

    public static match(a: NodeDataType, b: NodeDataType) {
        return a === NodeDataType.ANY ||
            b === NodeDataType.ANY ||
            SocketTypeMatcher.matches.find((t) => t.type === a).matches.includes(b);
    }
    private static readonly matches: { type: NodeDataType, matches: NodeDataType[] }[] = [
        {
            type: NodeDataType.NUMBER,
            matches: [
                NodeDataType.NUMBER,
            ]
        },
        {
            type: NodeDataType.STRING,
            matches: [
                NodeDataType.STRING,
            ]
        },
        {
            type: NodeDataType.TRIGGER,
            matches: [
                NodeDataType.TRIGGER,
            ]
        },
        {
            type: NodeDataType.BOOLEAN,
            matches: [
                NodeDataType.BOOLEAN,
            ]
        },
        {
            type: NodeDataType.COLOR,
            matches: [
                NodeDataType.COLOR,
            ]
        },
    ];
}
