import Select from "components/Elements/Selectv2";
import { NodeType } from "pages/FlowBuilderv2/FlowEditor";
import { MessageNodeData } from "pages/FlowBuilderv2/Nodes/NodeData";
import React, { FC } from "react";
import { Node } from "reactflow";
import { useAppSelector } from "store/hooks";
import { MessageType } from "types/Workflow";

interface TrackerEditorProps {
  tracker?: {
    id: string;
    name: string;
  };
  event?: string;
  onTrackerChange: (tracker: { id: string; name: string }) => void;
  onEventChange: (event: string) => void;
}

const TrackerEditor: FC<TrackerEditorProps> = ({
  tracker,
  event,
  onTrackerChange,
  onEventChange,
}) => {
  const { nodes } = useAppSelector((state) => state.flowBuilder);

  const filledTrackerNodes = nodes.filter(
    (node) =>
      node.data.type === NodeType.MESSAGE &&
      node.data.template.type === MessageType.TRACKER &&
      node.data.template.selected !== undefined
  ) as Node<MessageNodeData<MessageType.TRACKER>>[];

  const possibleTrackers = filledTrackerNodes.map(
    (node) => node.data.template.selected
  );

  return (
    <>
      <Select
        options={possibleTrackers.map((possibleTracker) => ({
          key: tracker || { id: "", name: "" },
          title: `${possibleTracker?.name} / ${possibleTracker?.id}`,
        }))}
        value={tracker || { id: "", name: "" }}
        onChange={onTrackerChange}
        placeholder="Tracker name / ID"
        noDataPlaceholder="No trackers in this journey"
      />

      <Select
        options={[]}
        value={event || ""}
        onChange={onEventChange}
        placeholder="Event name"
        noDataPlaceholder="No events"
      />
    </>
  );
};

export default TrackerEditor;
