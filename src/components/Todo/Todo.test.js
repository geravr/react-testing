import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import Todo from "./Todo";

configure({ adapter: new Adapter() });

describe("Todo", () => {
  test("ejecuta completeTodo cuando presiono el botón complete", () => {
    const todo = {
      text: "Test todo",
      isCompleted: true,
    };
    const index = 5;
    const completeTodo = jest.fn();
    const removeTodo = jest.fn();

    const wrapper = shallow(
      <Todo
        todo={todo}
        index={index}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    );
    wrapper.find("#complete-button").simulate("click");

    expect(completeTodo.mock.calls).toEqual([[5]]);
    expect(removeTodo.mock.calls).toEqual([]);
  });

  test("ejecuta removeTodo cuando presiono el botón delete", () => {
    const todo = {
      text: "Test todo",
      isCompleted: true,
    };
    const index = 3;
    const completeTodo = jest.fn();
    const removeTodo = jest.fn();

    const wrapper = shallow(
      <Todo
        todo={todo}
        index={index}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    );
    wrapper.find("#delete-button").simulate("click");

    expect(removeTodo.mock.calls).toEqual([[3]]);
    expect(completeTodo.mock.calls).toEqual([]);
  });
});