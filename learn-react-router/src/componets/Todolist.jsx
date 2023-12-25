/**
 * @Date        2023/12/18 14:44:07
 * @Author      zono
 * @Description todo list
 * 完成删除按钮
 * */
import { useState, useReducer, useRef } from "react";
import Button from "./Button";
import { SetList, SetListState, MyReducer } from "./todoContext";
import { List } from "./list";
import { flushSync } from "react-dom";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
/**
 * todo list
 * @param {type}
 * @returns
 * 记得加key，key不会被传入List中
 * */
export default function TodoList({ title }) {
  const list = [{ id: uuidv4(), text: "空列表", level: "3" }];
  const [lists, dispatch] = useReducer(MyReducer, list);
  const [name, setName] = useState("zono");
  const [level, setLevel] = useState("3");

  const itemsRef = useRef(null);

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }
  function scrollToId(id) {
    const map = getMap();
    const node = map.get(id);
    if (node) {
      node.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    } else {
      console.log(`No node found with id: ${id}`);
    }
  }
  return (
    <SetListState.Provider value={lists}>
      <SetList.Provider value={dispatch}>
        <div className={` m-4 rounded-md  bg-green-500 p-2 text-center`}>
          <h1 className="m-2 p-8 text-lg text-orange-500 first-letter:end-96">
            {title}
          </h1>

          <div className="mx-10 flex">
            <input
              onChange={(e) => {
                setLevel(e.target.value);
              }}
              className="flex-3 m-2 rounded-md text-center"
            />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="m-2 flex-1 rounded-md text-center"
            />
            <Button
              name="提交"
              onClick={() => {
                flushSync(() => {
                  dispatch({
                    type: "add",
                    payload: { id: uuidv4(), name: name, level: level },
                  });
                });
                scrollToId(lists[lists.length - 1].id);
              }}
            ></Button>
          </div>

          <ul>
            {lists.map(({ id, text, level }) => {
              return (
                <List
                  key={id}
                  listID={id}
                  text={text}
                  level={level}
                  ref={(node) => {
                    const map = getMap();
                    if (node) {
                      map.set(id, node);
                    } else {
                      map.delete(id);
                    }
                  }}
                ></List>
              );
            })}
          </ul>
          <Button
            name="删除最新一个"
            onClick={() => {
              dispatch({
                type: "delete",
              });
            }}
          ></Button>
        </div>
      </SetList.Provider>
    </SetListState.Provider>
  );
}

/**
 *
 * @param {type}
 * @returns
 * */
TodoList.propTypes = {
  title: PropTypes.string.isRequired,
};
