import request from "@/utils/request.ts";

export function addTodo(title: string) {
  return request({
    url: "todos",
    method: "post",
    data: {
      title,
    },
  });
}
