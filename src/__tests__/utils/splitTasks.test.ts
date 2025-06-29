import { splitTasks } from "../../utils/splitTasks";
import { Task } from "../../types";

describe("splitTasks", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      category_id: "cat1",
      completed: false,
      icon: "manzana",
      color: "#E57373",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      category_id: "cat2",
      completed: true,
      icon: "agua",
      color: "#81C784",
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      category_id: "cat3",
      completed: false,
      icon: null,
      color: null,
    },
  ];

  test("splits tasks into pending and completed", () => {
    const result = splitTasks(mockTasks);

    expect(result.pendientes).toHaveLength(2);
    expect(result.terminadas).toHaveLength(1);
  });

  test("returns empty arrays for empty input", () => {
    const result = splitTasks([]);

    expect(result.pendientes).toHaveLength(0);
    expect(result.terminadas).toHaveLength(0);
  });

  test("correctly identifies pending tasks", () => {
    const result = splitTasks(mockTasks);

    expect(result.pendientes).toEqual([mockTasks[0], mockTasks[2]]);
  });

  test("correctly identifies completed tasks", () => {
    const result = splitTasks(mockTasks);

    expect(result.terminadas).toEqual([mockTasks[1]]);
  });

  test("handles tasks with null icon and color", () => {
    const result = splitTasks(mockTasks);

    expect(result.pendientes).toContain(mockTasks[2]);
  });
});
