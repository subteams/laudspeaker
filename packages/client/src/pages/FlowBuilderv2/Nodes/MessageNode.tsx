import React, { FC, ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { MessageType } from "types/Workflow";
import {
  CustomModalIcon,
  EmailIcon,
  PushIcon,
  SlackIcon,
  SMSIcon,
  WebhookIcon,
} from "../Icons";
import { MessageNodeData } from "./NodeData";

export const messageFixtures: Record<
  MessageType,
  { icon: ReactNode; text: string }
> = {
  [MessageType.EMAIL]: {
    icon: <EmailIcon />,
    text: "Email",
  },
  [MessageType.FIREBASE]: {
    icon: <></>,
    text: "Filebase",
  },
  [MessageType.MODAL]: {
    icon: <CustomModalIcon />,
    text: "Modal",
  },
  [MessageType.PUSH]: {
    icon: <PushIcon />,
    text: "Push",
  },
  [MessageType.SLACK]: {
    icon: <SlackIcon />,
    text: "Slack",
  },
  [MessageType.SMS]: {
    icon: <SMSIcon />,
    text: "SMS",
  },
  [MessageType.WEBHOOK]: {
    icon: <WebhookIcon />,
    text: "Webhook",
  },
};

const unknownMessageFixtures: { icon: ReactNode; text: string } = {
  icon: <></>,
  text: "Unknown message type",
};

export const MessageNode: FC<NodeProps<MessageNodeData>> = ({
  isConnectable,
  data,
  selected,
}) => {
  const { template } = data;

  const nodeFixtures = template
    ? messageFixtures[template.type] || unknownMessageFixtures
    : unknownMessageFixtures;

  return (
    <div
      className={`w-[260px] h-[80px] rounded-[4px] bg-white ${
        selected
          ? "border-[2px] border-[#6366F1]"
          : "border-[1px] border-[#E5E7EB]"
      }`}
    >
      <Handle
        position={Position.Top}
        type="target"
        isConnectable={isConnectable}
        className="!min-h-[1px] !h-[1px] !top-[1px] !opacity-0 !border-0 !pointer-events-none !cursor-default"
      />
      <div className="p-[16px] flex flex-col gap-[2px]">
        <div className="flex gap-[6px]">
          <div>{nodeFixtures.icon}</div>
          <div
            className={`font-inter font-semibold text-[16px] leading-[24px] ${
              nodeFixtures === unknownMessageFixtures ? "text-red-500" : ""
            }`}
          >
            {nodeFixtures.text}
          </div>
        </div>
        <div className="font-inter font-normal text-[14px] leading-[22px] whitespace-nowrap text-ellipsis max-w-full overflow-hidden">
          {template?.selected ? (
            <>
              <span className="#4B5563">Send </span>
              <span className="font-medium">{template.selected.name}</span>
            </>
          ) : (
            <span className="text-[#4B5563]">Select a template</span>
          )}
        </div>
      </div>
      <Handle
        position={Position.Bottom}
        type="source"
        isConnectable={isConnectable}
        className="!min-h-[1px] !h-[1px] !bottom-[1px] !opacity-0 !border-0 !pointer-events-none !cursor-default"
      />
    </div>
  );
};