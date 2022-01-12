import httpSevice from "./http.service"

const todosEndpoint = "todos/"

const todosService = {
  fetch: async () => {
    const { data } = await httpSevice.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 10
      }
    })
    return data
  },
  createTask: async (taskData) => {
    const { data } = await httpSevice.post(todosEndpoint, taskData)
    return data;
  }
}

export default todosService;