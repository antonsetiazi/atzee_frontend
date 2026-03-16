import { InformationCircleIcon } from "@heroicons/react/20/solid";
import Tooltip from "./Tooltip";

export default function TooltipSample() {
    return (
        <div>
            <p>Tooltip pada Icon Button</p>
            <Tooltip content="More information">
                <InformationCircleIcon className="w-5 h-5 text-slate-400" />
            </Tooltip>

            <p>Tooltip pada Button</p>
            <Tooltip content="Create new item" position="bottom">
                <button className="px-3 py-2 bg-blue-600 rounded-lg text-white">
                    Add
                </button>
            </Tooltip>

            <p>Tooltip pada Sidebar Menu</p>
            <Tooltip content="Dashboard" position="right">
                <button className="p-2 rounded hover:bg-slate-800">📊</button>
            </Tooltip>
        </div>
    );
}
