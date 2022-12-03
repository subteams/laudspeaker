import { Input, Select } from "components/Elements";
import { getEventKeys } from "pages/Segment/SegmentHelpers";
import React, { FC, useEffect, useState } from "react";
import { EventCondition } from "./TriggerCreater";
import AC from "react-autocomplete";
import { useDebounce } from "react-use";
import ApiService from "services/api.service";
import DynamicField from "./DynamicField";
import MinusIcon from "../../assets/images/MinusIcon.svg";
import Tooltip from "components/Elements/Tooltip";

export interface ConditionCreaterProps {
  condition: EventCondition;
  onChange: (condition: EventCondition) => void;
  onDelete: () => void;
  possibleTypes: string[];
  isViewMode?: boolean;
}

const ConditionCreater: FC<ConditionCreaterProps> = ({
  condition,
  onChange,
  onDelete,
  possibleTypes,
  isViewMode,
}) => {
  const { key, value, type, comparisonType } = condition;

  const [possibleKeys, setPossibleKeys] = useState<
    {
      key: string;
      type: string;
      isArray: boolean;
      options: { label: string; id: string };
    }[]
  >([]);

  const [possibleComparisonTypes, setPossibleComparisonTypes] = useState<
    {
      label: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ApiService.get({
          url: `/events/possible-comparison/${type}`,
        });

        setPossibleComparisonTypes(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [type]);

  const [dynamicDataToRender, setDynamicDataToRender] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ApiService.get({
          url: `/events/attributes/${comparisonType}`,
        });

        setDynamicDataToRender(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [comparisonType]);

  const handleConditionChange = (name: string, newValue: string) => {
    (condition as any)[name] = newValue;
    onChange(condition);
    getEventKeys(newValue)
      .then(({ data }) => {
        setPossibleKeys(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [newKey, setNewKey] = useState(key);

  useEffect(() => {}, [newKey]);

  useDebounce(
    () => {
      handleConditionChange("key", newKey || "");
    },
    1000,
    [newKey]
  );

  const [possibleValues, setPossibleValues] = useState<string[]>([]);

  const loadPossibleValues = async () => {
    try {
      const { data } = await ApiService.get({
        url: `/events/possible-values/${key}?search=${value}`,
      });
      setPossibleValues(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {}, [possibleValues]);

  useDebounce(loadPossibleValues, 1000, [value, key]);

  useEffect(() => {
    getEventKeys("")
      .then(({ data }) => {
        setPossibleKeys(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-[10px] items-center m-[10px_0px]">
      <div className="relative">
        <AC
          getItemValue={(item) => JSON.stringify(item)}
          items={possibleKeys}
          autoHighlight={false}
          renderInput={(props) => (
            <Input
              name={props.name || ""}
              value={props.value}
              onChange={props.onChange}
              inputRef={props.ref}
              aria-expanded={props["aria-expanded"]}
              disabled={isViewMode}
              id="keyInput"
              {...props}
            />
          )}
          renderItem={(item, isHighlighted) => (
            <div
              className={`${
                isHighlighted ? "bg-cyan-100" : ""
              } p-[2px] rounded-[6px] relative`}
            >
              {item.key} ({item.type})
            </div>
          )}
          renderMenu={(items) => {
            if (!items.length) return <></>;

            return (
              <div className="shadow-md  border-[1px] bg-white border-cyan-500 absolute top-[calc(100%+4px)] w-full rounded-[6px] z-[9999999999]">
                {items}
              </div>
            );
          }}
          value={newKey}
          onChange={(e) => {
            setNewKey(e.target.value);
          }}
          onSelect={(e) => {
            const val = JSON.parse(e);
            setNewKey(val.key);
            handleConditionChange("type", val.type);
            handleConditionChange("comparisonType", "");
            handleConditionChange("value", "");
          }}
        />
      </div>
      <Select
        id="keyType"
        options={possibleTypes.map((item) => ({ value: item }))}
        value={type}
        onChange={(val) => {
          handleConditionChange("type", val);
          handleConditionChange("comparisonType", "");
          handleConditionChange("value", "");
        }}
        disabled={isViewMode}
      />
      <Select
        id="comparisonType"
        value={comparisonType}
        options={possibleComparisonTypes.map((item) => ({
          value: item.id,
          title: item.label,
        }))}
        onChange={(val) => {
          handleConditionChange("comparisonType", val);
          handleConditionChange("value", "");
        }}
        disabled={isViewMode}
      />
      <div className="flex gap-[10px]">
        <DynamicField
          value={value}
          data={dynamicDataToRender}
          possibleValues={possibleValues}
          onChange={(val) => handleConditionChange("value", val)}
          disabled={isViewMode}
        />
        {!isViewMode && <img onClick={onDelete} src={MinusIcon} />}
      </div>
    </div>
  );
};

export default ConditionCreater;
