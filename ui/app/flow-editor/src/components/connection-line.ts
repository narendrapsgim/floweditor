import { html, customElement, css, property } from "lit-element";
import { NodeSocket } from "@openremote/model";
import { EditorWorkspace } from "./editor-workspace";
import { IdentityDomLink } from "node-structure";
import { Utilities, SelectableElement } from "..";

@customElement("connection-line")
export class ConnectionLine extends SelectableElement {
    @property({ attribute: false }) public from: NodeSocket;
    @property({ attribute: false }) public to: NodeSocket;

    @property({ attribute: false }) public workspace: EditorWorkspace;

    public static get styles() {
        return css`
            svg{
                fill: none;  
                overflow: visible;
                position: absolute;
                pointer-events: all;
                stroke-linejoin: round;
                transition: stroke-width 120ms;
            }
            polyline{
                pointer-events: all;
                transition: stroke 120ms;
            }
            
            polyline:hover, polyline[selected = true]{
                stroke: var(--highlight);
            }
        `;
    }

    public firstUpdated() {
        const update = () => { this.requestUpdate(); };
        this.workspace.addEventListener("pan", update);
        this.workspace.addEventListener("zoom", update);
        this.workspace.addEventListener("nodemove", update);
    }

    public render() {
        const fromElement = IdentityDomLink.map[this.from.id] as HTMLElement;
        const toElement = IdentityDomLink.map[this.to.id] as HTMLElement;

        const parentSize = this.workspace.clientRect;
        const from = Utilities.getCenter(fromElement.getBoundingClientRect());
        const to = Utilities.getCenter(toElement.getBoundingClientRect());
        const totalWidth = Math.min(Math.abs(from.x - to.x), 256 * this.workspace.camera.zoom);

        return html`<svg style="stroke-width: ${this.workspace.camera.zoom * (this.selected ? 6 : 4)}px;"><polyline 
        selected="${this.selected}"
        points="
        ${from.x - parentSize.left}, ${from.y - parentSize.top} 
        
        ${from.x - parentSize.left + totalWidth / 4}, ${from.y - parentSize.top} 
        ${to.x - parentSize.left - totalWidth / 4}, ${to.y - parentSize.top}

        ${to.x - parentSize.left}, ${to.y - parentSize.top}"
        ></polyline></svg>`;
    }
}
