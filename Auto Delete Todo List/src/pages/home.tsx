import React, { useRef, useState } from "react";
import { ItemState, initialItems } from "../constants/item";

type ListState = {
  mainList: ItemState[];
  fruitList: ItemState[];
  vegetableList: ItemState[];
};

const TIMEOUT_DURATION = 5000;

const useListManagement = () => {
  const [state, setState] = useState<ListState>({
    mainList: initialItems,
    fruitList: [],
    vegetableList: [],
  });
  const activeTimers = useRef(new Set<string>());

  const moveItemToType = (item: ItemState, index: number) => {
    setState((prev) => ({
      ...prev,
      mainList: prev.mainList.filter((_, i) => i !== index),
      fruitList:
        item.type === "Fruit" ? [...prev.fruitList, item] : prev.fruitList,
      vegetableList:
        item.type === "Vegetable"
          ? [...prev.vegetableList, item]
          : prev.vegetableList,
    }));

    activeTimers.current.add(item.name);

    setTimeout(() => {
      if (activeTimers.current.has(item.name)) {
        setState((prev) => ({
          ...prev,
          mainList: [...prev.mainList, item],
          fruitList: prev.fruitList.filter((i) => i.name !== item.name),
          vegetableList: prev.vegetableList.filter((i) => i.name !== item.name),
        }));
        activeTimers.current.delete(item.name);
      }
    }, TIMEOUT_DURATION);
  };

  const moveBackToMain = (item: ItemState) => {
    setState((prev) => ({
      ...prev,
      mainList: [...prev.mainList, item],
      fruitList: prev.fruitList.filter((i) => i.name !== item.name),
      vegetableList: prev.vegetableList.filter((i) => i.name !== item.name),
    }));
    activeTimers.current.delete(item.name);
  };

  return { state, moveItemToType, moveBackToMain };
};

const ItemButton: React.FC<{
  item: ItemState;
  onClick: () => void;
  variant: "main" | "fruit" | "vegetable";
}> = ({ item, onClick, variant }) => {
  return (
    <button
      onClick={onClick}
     className={'btn-base'}
    >
      {item.name}
    </button>
  );
};

const ListColumn: React.FC<{
  title: string;
  items: ItemState[];
  onItemClick: (item: ItemState, index: number) => void;
  variant: "main" | "fruit" | "vegetable";
}> = ({ title, items, onItemClick, variant }) => {
  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "16px",
        padding: "16px",
      }}
    >
      <div
        style={{
          border: variant !== "main" ? "1px solid" : "",
          height: "100%",
          borderRadius: "3px",
        }}
      >
        {variant !== "main" && (
          <div style={{ padding: "8px", borderBottom: "1px solid",backgroundColor:'#e2e2e2' }}>
            <h2 style={{ textAlign: "center" }}>{title}</h2>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "8px",
            padding:'8px'
          }}
        >
          {items.map((item, index) => {
            return (
              <ItemButton
                key={`${item.name}-${index}`}
                item={item}
                onClick={() => onItemClick(item, index)}
                variant={variant}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { state, moveItemToType, moveBackToMain } = useListManagement();
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <ListColumn
        title="Items List"
        items={state.mainList}
        onItemClick={moveItemToType}
        variant="main"
      />
      <ListColumn
        title="Fruits"
        items={state.fruitList}
        onItemClick={(item) => moveBackToMain(item)}
        variant="fruit"
      />
      <ListColumn
        title="Vegetables"
        items={state.vegetableList}
        onItemClick={(item) => moveBackToMain(item)}
        variant="vegetable"
      />
    </div>
  );
};

export default Home;
